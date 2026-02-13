/**
 * Exception Filter - Global error handling
 * Catches and formats all exceptions
 */

import { Request, Response, NextFunction } from 'express';
import { BaseException } from '../exceptions/BaseException';
import { HttpStatus } from '../enums/HttpStatus';

export class ExceptionFilter {
  /**
   * Handle all exceptions
   */
  static handle(error: Error, req: Request, res: Response, next: NextFunction): void {
    console.error('[ExceptionFilter] Error caught:', error);

    if (error instanceof BaseException) {
      // Handle custom exceptions
      res.status(error.statusCode).json({
        success: false,
        error: {
          name: error.name,
          message: error.message,
          statusCode: error.statusCode,
          timestamp: error.timestamp,
          path: req.path,
          method: req.method,
          details: error.details,
        },
      });
    } else {
      // Handle unknown errors
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: {
          name: 'InternalServerError',
          message: process.env.NODE_ENV === 'production' 
            ? 'An unexpected error occurred' 
            : error.message,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          timestamp: new Date(),
          path: req.path,
          method: req.method,
          ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
        },
      });
    }
  }

  /**
   * Handle 404 errors
   */
  static notFound(req: Request, res: Response, next: NextFunction): void {
    res.status(HttpStatus.NOT_FOUND).json({
      success: false,
      error: {
        name: 'NotFoundError',
        message: `Route ${req.method} ${req.path} not found`,
        statusCode: HttpStatus.NOT_FOUND,
        timestamp: new Date(),
        path: req.path,
        method: req.method,
      },
    });
  }
}
