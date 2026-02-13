/**
 * Logging Interceptor
 * Log all HTTP requests and responses
 */

const logger = require('../helpers/logger');

class LoggingInterceptor {
  /**
   * Intercept and log request/response
   */
  static intercept(req, res, next) {
    const startTime = Date.now();

    // Log request
    logger.info(`[REQUEST] ${req.method} ${req.path}`, {
      body: req.body,
      params: req.params,
      query: req.query,
      ip: req.ip
    });

    // Capture original json method
    const originalJson = res.json.bind(res);

    // Override json method to log response
    res.json = function(data) {
      const duration = Date.now() - startTime;
      
      logger.info(`[RESPONSE] ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`, {
        statusCode: res.statusCode,
        duration
      });

      return originalJson(data);
    };

    next();
  }
}

module.exports = LoggingInterceptor;
