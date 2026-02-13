/**
 * Logger Helper (TypeScript)
 */

import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
// Remove unused imports and types

const logDir = path.join(process.cwd(), 'logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create write streams
const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'access.log'),
  { flags: 'a' }
);

const errorLogStream = fs.createWriteStream(
  path.join(logDir, 'error.log'),
  { flags: 'a' }
);

// type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isDev: boolean;

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
  info(message: string, ...args: any[]): void {
    if (this.isDev) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  /**
   * Log warning message
   */
  warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  /**
   * Log error message
   */
  error(message: string, error: Error | any): void {
    const errorMessage = `[ERROR] ${new Date().toISOString()} - ${message}\n${
      error.stack || error
    }\n`;
    
    console.error(errorMessage);
    errorLogStream.write(errorMessage);
  }

  /**
   * Log debug message (only in development)
   */
  debug(message: string, ...args: any[]): void {
    if (this.isDev) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

export default new Logger();
