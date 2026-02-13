/**
 * Response Filter - Standardizes API responses
 * Transforms all responses to a consistent format
 */

import { Request, Response, NextFunction } from 'express';

export interface StandardResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    timestamp: Date;
    path: string;
    method: string;
  };
}

export class ResponseFilter {
  /**
   * Transform response to standard format
   */
  static transform<T>(data: T, message?: string): StandardResponse<T> {
    return {
      success: true,
      data,
      message,
      meta: {
        timestamp: new Date(),
        path: '',
        method: '',
      },
    };
  }

  /**
   * Middleware to automatically transform responses
   */
  static middleware(req: Request, res: Response, next: NextFunction): void {
    const originalJson = res.json;

    res.json = function (data: any): Response {
      // If already in standard format, don't transform
      if (data && typeof data === 'object' && 'success' in data) {
        return originalJson.call(this, data);
      }

      // Transform to standard format
      const standardResponse: StandardResponse = {
        success: true,
        data,
        meta: {
          timestamp: new Date(),
          path: req.path,
          method: req.method,
        },
      };

      return originalJson.call(this, standardResponse);
    };

    next();
  }
}
