/**
 * Error Monitoring Service
 * Integrate with Sentry, LogRocket, or similar
 */

class ErrorMonitoring {
  private isProduction: boolean;

  constructor() {
    this.isProduction = import.meta.env.PROD;
  }

  /**
   * Initialize error tracking
   */
  init(): void {
    if (this.isProduction) {
      // TODO: Initialize Sentry or other error tracking service
      // Sentry.init({ dsn: import.meta.env.VITE_SENTRY_DSN });
    }
  }

  /**
   * Capture error
   */
  captureError(error: Error, context: Record<string, any> = {}): void {
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
  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
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
  setUser(user: { id: string; email: string } | null): void {
    if (this.isProduction && user) {
      // TODO: Set user context
      // Sentry.setUser({ id: user.id, email: user.email });
    }
  }
}

export default new ErrorMonitoring();
