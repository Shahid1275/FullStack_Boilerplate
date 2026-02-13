/**
 * Async Decorator - Error handling for async functions
 * Automatically catches errors in async functions
 */

import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * Wraps async route handlers to catch errors
 */
export function AsyncHandler(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(originalMethod.call(this, req, res, next)).catch(next);
  };

  return descriptor;
}

/**
 * Higher-order function for async error handling
 */
export const catchAsync = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Retry decorator for async functions
 */
export function Retry(attempts: number = 3, delay: number = 1000) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let lastError: any;

      for (let i = 0; i < attempts; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error;
          if (i < attempts - 1) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }

      throw lastError;
    };

    return descriptor;
  };
}

/**
 * Timeout decorator for async functions
 */
export function Timeout(ms: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      return Promise.race([
        originalMethod.apply(this, args),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
        ),
      ]);
    };

    return descriptor;
  };
}
