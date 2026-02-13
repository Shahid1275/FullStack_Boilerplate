import { Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ErrorResponse } from './errorMiddleware'
import User from '../models/User'
import { asyncHandler } from '../utils/asyncHandler'
import { AuthRequest } from '../types'
import config from '../config/config'

export const protect = asyncHandler(async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined

  // Check for token in header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  // Check for token in cookies
  else if (req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload

    // Get user from token
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }

    req.user = user as any

    next()
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }
})

// Grant access to specific roles
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role '${req.user?.role}' is not authorized to access this route`,
          403
        )
      )
    }
    next()
  }
}

export default protect
