import { Request, Response, NextFunction } from 'express'

// Async Handler to avoid try-catch blocks
export const asyncHandler = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

export default asyncHandler
