/**
 * Error Monitoring Service
 * Integrate with Sentry, LogRocket, or similar
 */

class ErrorMonitoring {
  constructor() {
    this.isProduction = import.meta.env.PROD;
  }

  /**
   * Initialize error tracking
   */
  init() {
    if (this.isProduction) {
      // TODO: Initialize Sentry or other error tracking service
      // Sentry.init({ dsn: import.meta.env.VITE_SENTRY_DSN });
    }
  }

  /**
   * Capture error
   */
  captureError(error, context = {}) {
    if (this.isProduction) {
      // TODO: Send to error tracking service
      // Sentry.captureException(error, { extra: context });
    } else {
      console.error('Error:', error, context);
    }
  }

  /**
   * Capture message
   */
  captureMessage(message, level = 'info') {
    if (this.isProduction) {
      // TODO: Send to error tracking service
      // Sentry.captureMessage(message, level);
    } else {
      console.log(`[${level}]`, message);
    }
  }

  /**
   * Set user context
   */
  setUser(user) {
    if (this.isProduction && user) {
      // TODO: Set user context
      // Sentry.setUser({ id: user.id, email: user.email });
    }
  }
}

export default new ErrorMonitoring();
