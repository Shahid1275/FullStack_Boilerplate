/**
 * Exception Filter
 * Global exception handler filter
 */

const logger = require('../helpers/logger');

class ExceptionFilter {
  /**
   * Catch and handle exceptions
   */
  static catch(error, req, res, next) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    const isOperational = error.isOperational || false;

    // Log error
    logger.error(`[${req.method}] ${req.path} - ${message}`, {
      error: error.stack,
      body: req.body,
      params: req.params,
      query: req.query
    });

    // Send response
    res.status(statusCode).json({
      success: false,
      error: {
        message,
        statusCode,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method
      },
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });

    // If non-operational error, exit process
    if (!isOperational) {
      process.exit(1);
    }
  }
}

module.exports = ExceptionFilter;
