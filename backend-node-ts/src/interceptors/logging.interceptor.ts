/**
 * Logging Interceptor - Request/Response logging
 * Logs all incoming requests and outgoing responses
 */

import { Request, Response, NextFunction } from 'express';

export class LoggingInterceptor {
  /**
   * Log incoming requests
   */
  static logRequest(req: Request, res: Response, next: NextFunction): void {
    const startTime = Date.now();

    console.log('[Request] ============================================');
    console.log(`[Request] ${req.method} ${req.path}`);
    console.log(`[Request] Time: ${new Date().toISOString()}`);
    console.log(`[Request] IP: ${req.ip}`);
    console.log(`[Request] User-Agent: ${req.get('user-agent') || 'N/A'}`);
    
    if (Object.keys(req.query).length > 0) {
      console.log(`[Request] Query:`, req.query);
    }
    
    if (Object.keys(req.body || {}).length > 0) {
      // Don't log sensitive data
      const sanitizedBody = { ...req.body };
      if (sanitizedBody.password) sanitizedBody.password = '***';
      if (sanitizedBody.token) sanitizedBody.token = '***';
      console.log(`[Request] Body:`, sanitizedBody);
    }

    // Log response when it's sent
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      console.log('[Response] ==========================================');
      console.log(`[Response] ${req.method} ${req.path}`);
      console.log(`[Response] Status: ${res.statusCode}`);
      console.log(`[Response] Duration: ${duration}ms`);
      console.log('======================================================\n');
    });

    next();
  }

  /**
   * Log only in development mode
   */
  static developmentOnly(req: Request, res: Response, next: NextFunction): void {
    if (process.env.NODE_ENV === 'development') {
      return LoggingInterceptor.logRequest(req, res, next);
    }
    next();
  }
}
