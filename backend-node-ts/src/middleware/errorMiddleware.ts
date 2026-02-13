import { Request, Response, NextFunction } from 'express'
import { ErrorResponseData } from '../types'
import config from '../config/config'

// Custom Error Class
export class ErrorResponse extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

// Not Found Middleware
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// Error Handler Middleware
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let error = { ...err }
  error.message = err.message

  // Log error for dev
  if (config.env === 'development') {
    console.error('Error Stack:', err.stack)
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found'
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = new ErrorResponse(message, 400)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(', ')
    error = new ErrorResponse(message, 400)
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token'
    error = new ErrorResponse(message, 401)
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired'
    error = new ErrorResponse(message, 401)
  }

  const response: ErrorResponseData = {
    success: false,
    message: error.message || 'Server Error',
    ...(config.env === 'development' && { stack: err.stack }),
  }

  res.status(error.statusCode || 500).json(response)
}
