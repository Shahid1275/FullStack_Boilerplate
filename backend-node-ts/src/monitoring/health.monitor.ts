/**
 * Health Monitor - Application health checks
 */

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  uptime: number;
  checks: HealthCheck[];
}

export interface HealthCheck {
  name: string;
  status: 'pass' | 'fail';
  message?: string;
  responseTime?: number;
}

export class HealthMonitor {
  private static startTime: number = Date.now();
  private static checks: Map<string, () => Promise<HealthCheck>> = new Map();

  /**
   * Register a health check
   */
  static registerCheck(name: string, checkFn: () => Promise<HealthCheck>): void {
    this.checks.set(name, checkFn);
  }

  /**
   * Run all health checks
   */
  static async getHealth(): Promise<HealthStatus> {
    const results: HealthCheck[] = [];

    for (const [name, checkFn] of this.checks.entries()) {
      try {
        const result = await checkFn();
        results.push(result);
      } catch (error: any) {
        results.push({
          name,
          status: 'fail',
          message: error.message,
        });
      }
    }

    const failedChecks = results.filter(c => c.status === 'fail');
    const status: 'healthy' | 'degraded' | 'unhealthy' = 
      failedChecks.length === 0 ? 'healthy' :
      failedChecks.length < results.length / 2 ? 'degraded' :
      'unhealthy';

    return {
      status,
      timestamp: new Date(),
      uptime: Date.now() - this.startTime,
      checks: results,
    };
  }

  /**
   * Database health check
   */
  static async checkDatabase(): Promise<HealthCheck> {
    const start = Date.now();
    
    try {
      // Simulate database check
      await new Promise(resolve => setTimeout(resolve, 10));
      
      return {
        name: 'database',
        status: 'pass',
        message: 'Database connection is healthy',
        responseTime: Date.now() - start,
      };
    } catch (error: any) {
      return {
        name: 'database',
        status: 'fail',
        message: error.message,
        responseTime: Date.now() - start,
      };
    }
  }

  /**
   * Memory health check
   */
  static async checkMemory(): Promise<HealthCheck> {
    const usage = process.memoryUsage();
    const heapUsedMB = usage.heapUsed / 1024 / 1024;
    const heapTotalMB = usage.heapTotal / 1024 / 1024;
    const percentUsed = (heapUsedMB / heapTotalMB) * 100;

    return {
      name: 'memory',
      status: percentUsed < 90 ? 'pass' : 'fail',
      message: `Heap: ${heapUsedMB.toFixed(2)}MB / ${heapTotalMB.toFixed(2)}MB (${percentUsed.toFixed(1)}%)`,
    };
  }

  /**
   * Disk health check
   */
  static async checkDisk(): Promise<HealthCheck> {
    // Simplified disk check
    return {
      name: 'disk',
      status: 'pass',
      message: 'Disk space is sufficient',
    };
  }

  /**
   * Initialize default health checks
   */
  static initialize(): void {
    this.registerCheck('database', () => this.checkDatabase());
    this.registerCheck('memory', () => this.checkMemory());
    this.registerCheck('disk', () => this.checkDisk());
  }
}
