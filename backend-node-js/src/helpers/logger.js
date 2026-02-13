/**
 * Logger Helper
 * Centralized logging utility
 */

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const logDir = path.join(process.cwd(), 'logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create write streams for different log files
const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'access.log'),
  { flags: 'a' }
);

const errorLogStream = fs.createWriteStream(
  path.join(logDir, 'error.log'),
  { flags: 'a' }
);

class Logger {
  constructor() {
    this.isDev = process.env.NODE_ENV === 'development';
  }

  /**
   * Morgan middleware for HTTP request logging
   */
  getHttpLogger() {
    if (this.isDev) {
      return morgan('dev');
    }
    return morgan('combined', { stream: accessLogStream });
  }

  /**
   * Log info message
   */
  info(message, ...args) {
    if (this.isDev) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  /**
   * Log warning message
   */
  warn(message, ...args) {
    console.warn(`[WARN] ${message}`, ...args);
  }

  /**
   * Log error message
   */
  error(message, error) {
    const errorMessage = `[ERROR] ${new Date().toISOString()} - ${message}\n${
      error.stack || error
    }\n`;
    
    console.error(errorMessage);
    
    // Write to error log file
    errorLogStream.write(errorMessage);
  }

  /**
   * Log debug message (only in development)
   */
  debug(message, ...args) {
    if (this.isDev) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

module.exports = new Logger();
