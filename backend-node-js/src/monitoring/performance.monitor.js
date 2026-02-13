/**
 * Performance Monitor
 * Monitor application performance metrics
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      totalResponseTime: 0,
      averageResponseTime: 0
    };
  }

  /**
   * Track request
   */
  trackRequest(duration) {
    this.metrics.requests++;
    this.metrics.totalResponseTime += duration;
    this.metrics.averageResponseTime = 
      this.metrics.totalResponseTime / this.metrics.requests;
  }

  /**
   * Track error
   */
  trackError() {
    this.metrics.errors++;
  }

  /**
   * Get metrics
   */
  getMetrics() {
    return {
      ...this.metrics,
      errorRate: this.metrics.requests > 0 
        ? (this.metrics.errors / this.metrics.requests) * 100 
        : 0
    };
  }

  /**
   * Reset metrics
   */
  reset() {
    this.metrics = {
      requests: 0,
      errors: 0,
      totalResponseTime: 0,
      averageResponseTime: 0
    };
  }

  /**
   * Middleware to track performance
   */
  middleware() {
    return (req, res, next) => {
      const startTime = Date.now();

      res.on('finish', () => {
        const duration = Date.now() - startTime;
        this.trackRequest(duration);

        if (res.statusCode >= 400) {
          this.trackError();
        }
      });

      next();
    };
  }
}

module.exports = new PerformanceMonitor();
