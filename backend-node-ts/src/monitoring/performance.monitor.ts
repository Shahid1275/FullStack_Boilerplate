/**
 * Performance Monitor - Track application performance
 */

export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export class PerformanceMonitor {
  private static metrics: PerformanceMetric[] = [];
  private static timers: Map<string, number> = new Map();

  /**
   * Start a performance timer
   */
  static start(name: string): void {
    this.timers.set(name, Date.now());
  }

  /**
   * End a performance timer and record metric
   */
  static end(name: string, metadata?: Record<string, any>): number {
    const startTime = this.timers.get(name);
    if (!startTime) {
      console.warn(`[Performance] No timer found for: ${name}`);
      return 0;
    }

    const duration = Date.now() - startTime;
    this.timers.delete(name);

    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: new Date(),
      metadata,
    };

    this.metrics.push(metric);
    console.log(`[Performance] ${name}: ${duration}ms`);

    return duration;
  }

  /**
   * Get all metrics
   */
  static getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Get metrics by name
   */
  static getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(m => m.name === name);
  }

  /**
   * Get average duration for a metric
   */
  static getAverageDuration(name: string): number {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return 0;

    const total = metrics.reduce((sum, m) => sum + m.duration, 0);
    return total / metrics.length;
  }

  /**
   * Clear all metrics
   */
  static clear(): void {
    this.metrics = [];
    this.timers.clear();
  }

  /**
   * Get performance summary
   */
  static getSummary(): Record<string, any> {
    const uniqueNames = [...new Set(this.metrics.map(m => m.name))];
    
    return {
      totalMetrics: this.metrics.length,
      uniqueOperations: uniqueNames.length,
      operations: uniqueNames.map(name => ({
        name,
        count: this.getMetricsByName(name).length,
        avgDuration: this.getAverageDuration(name),
      })),
    };
  }
}
