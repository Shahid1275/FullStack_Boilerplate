/**
 * Logger Utility
 * Centralized logging for development and production
 */

const isDev = import.meta.env.DEV;

class Logger {
  info(message, ...args) {
    if (isDev) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  warn(message, ...args) {
    if (isDev) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message, ...args) {
    console.error(`[ERROR] ${message}`, ...args);
  }

  debug(message, ...args) {
    if (isDev) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

export const logger = new Logger();
