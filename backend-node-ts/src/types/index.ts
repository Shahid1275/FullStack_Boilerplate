import { Request, Response, NextFunction } from 'express'

export interface IUser {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  avatar?: string
  isEmailVerified: boolean
  createdAt: Date
  updatedAt: Date
  matchPassword(password: string): Promise<boolean>
  getSignedJwtToken(): string
  getResetPasswordToken(): string
}

export interface AuthRequest extends Request {
  user?: IUser
}

export interface PaginationQuery {
  page?: string
  limit?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  count?: number
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface ErrorResponseData {
  success: false
  message: string
  stack?: string
}

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>
