/**
 * Transform Interceptor - Data transformation
 * Transforms data before sending response
 */

import { Request, Response, NextFunction } from 'express';

export class TransformInterceptor {
  /**
   * Remove null values from response
   */
  static removeNulls(req: Request, res: Response, next: NextFunction): void {
    const originalJson = res.json;

    res.json = function (data: any): Response {
      const cleaned = TransformInterceptor.cleanNulls(data);
      return originalJson.call(this, cleaned);
    };

    next();
  }

  /**
   * Remove undefined values from response
   */
  static removeUndefined(req: Request, res: Response, next: NextFunction): void {
    const originalJson = res.json;

    res.json = function (data: any): Response {
      const cleaned = JSON.parse(JSON.stringify(data));
      return originalJson.call(this, cleaned);
    };

    next();
  }

  /**
   * Transform timestamps to ISO strings
   */
  static transformDates(req: Request, res: Response, next: NextFunction): void {
    const originalJson = res.json;

    res.json = function (data: any): Response {
      const transformed = TransformInterceptor.convertDates(data);
      return originalJson.call(this, transformed);
    };

    next();
  }

  /**
   * Helper: Clean null values
   */
  private static cleanNulls(obj: any): any {
    if (obj === null || obj === undefined) {
      return undefined;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => TransformInterceptor.cleanNulls(item));
    }

    if (typeof obj === 'object') {
      return Object.keys(obj).reduce((acc: any, key) => {
        const value = TransformInterceptor.cleanNulls(obj[key]);
        if (value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {});
    }

    return obj;
  }

  /**
   * Helper: Convert dates to ISO strings
   */
  private static convertDates(obj: any): any {
    if (obj instanceof Date) {
      return obj.toISOString();
    }

    if (Array.isArray(obj)) {
      return obj.map(item => TransformInterceptor.convertDates(item));
    }

    if (typeof obj === 'object' && obj !== null) {
      return Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = TransformInterceptor.convertDates(obj[key]);
        return acc;
      }, {});
    }

    return obj;
  }
}
