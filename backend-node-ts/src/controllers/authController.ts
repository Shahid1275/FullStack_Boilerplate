import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import { asyncHandler } from '../utils/asyncHandler'
import { ErrorResponse } from '../middleware/errorMiddleware'
import User, { IUserDocument } from '../models/User'
import { AuthRequest } from '../types'
import config from '../config/config'

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password } = req.body

  // Check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    return next(new ErrorResponse('User already exists', 400))
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  })

  sendTokenResponse(user, 201, res)
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body

  // Find user by email
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  // Update last login
  user.lastLogin = new Date()
  await user.save({ validateBeforeSave: false })

  sendTokenResponse(user, 200, res)
})

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  })
})

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  res.status(200).json({
    success: true,
    data: req.user,
  })
})

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404))
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  // In production, send email with reset token
  // For now, just return the token in development
  res.status(200).json({
    success: true,
    message: 'Password reset token sent',
    ...(config.env === 'development' && { resetToken }),
  })
})

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
export const resetPassword = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new ErrorResponse('Invalid or expired token', 400))
  }

  // Set new password
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  sendTokenResponse(user, 200, res)
})

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user: IUserDocument, statusCode: number, res: Response): void => {
  // Create token
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(
      Date.now() + config.jwt.cookieExpire * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'strict' as const,
  }

  // Remove password from output
  user.password = undefined as any

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user,
    })
}
