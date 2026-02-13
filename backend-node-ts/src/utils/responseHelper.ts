import { Response } from 'express'

export class AppError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export const successResponse = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message: string = 'Success'
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  })
}

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string = 'Error'
): void => {
  res.status(statusCode).json({
    success: false,
    message,
  })
}

export const paginatedResponse = <T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number
): void => {
  res.status(200).json({
    success: true,
    count: data.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data,
  })
}

export default {
  successResponse,
  errorResponse,
  paginatedResponse,
}
