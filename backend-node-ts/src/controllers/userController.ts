import { Response, NextFunction } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { ErrorResponse } from '../middleware/errorMiddleware'
import User from '../models/User'
import { AuthRequest } from '../types'

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const page = parseInt((req.query.page as string) || '1', 10)
  const limit = parseInt((req.query.limit as string) || '10', 10)
  const skip = (page - 1) * limit

  const total = await User.countDocuments()
  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .select('-password')
    .sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    count: users.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: users,
  })
})

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
export const getUser = asyncHandler(async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    return next(new ErrorResponse('User not found', 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  const user = await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).select('-password')

  if (!user) {
    return next(new ErrorResponse('User not found', 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorResponse('User not found', 404))
  }

  await user.deleteOne()

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  })
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = asyncHandler(async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  }

  const user = await User.findByIdAndUpdate(req.user!._id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).select('-password')

  if (!user) {
    return next(new ErrorResponse('User not found', 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})
