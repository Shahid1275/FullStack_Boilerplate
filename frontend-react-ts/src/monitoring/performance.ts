/**
 * Performance Monitoring
 * Track app performance metrics
 */

class PerformanceMonitoring {
  /**
   * Measure component render time
   */
  measure<T>(componentName: string, callback: () => T): T {
    const start = performance.now();
    const result = callback();
    const end = performance.now();
    
    console.log(`${componentName} render time: ${(end - start).toFixed(2)}ms`);
    
    return result;
  }

  /**
   * Track API call performance
   */
  trackApiCall(endpoint: string, duration: number): void {
    if (duration > 1000) {
      console.warn(`Slow API call to ${endpoint}: ${duration}ms`);
    }
  }

  /**
   * Get page load metrics
   */
  getPageLoadMetrics(): {
    domContentLoaded: number;
    loadComplete: number;
    domInteractive: number;
  } | null {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (!navigation) return null;

    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      domInteractive: navigation.domInteractive,
    };
  }
}

export default new PerformanceMonitoring();
