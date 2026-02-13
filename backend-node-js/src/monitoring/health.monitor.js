/**
 * Health Monitor
 * Monitor system health (database, memory, CPU)
 */

const os = require('os');
const mongoose = require('mongoose');

class HealthMonitor {
  /**
   * Check database health
   */
  async checkDatabase() {
    try {
      const state = mongoose.connection.readyState;
      return {
        status: state === 1 ? 'healthy' : 'unhealthy',
        connected: state === 1,
        readyState: state
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        connected: false,
        error: error.message
      };
    }
  }

  /**
   * Check memory usage
   */
  checkMemory() {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercent = (usedMemory / totalMemory) * 100;

    return {
      total: this.formatBytes(totalMemory),
      free: this.formatBytes(freeMemory),
      used: this.formatBytes(usedMemory),
      usagePercent: memoryUsagePercent.toFixed(2),
      status: memoryUsagePercent > 90 ? 'critical' : 'healthy'
    };
  }

  /**
   * Check CPU usage
   */
  checkCPU() {
    const cpus = os.cpus();
    const cpuCount = cpus.length;
    const loadAverage = os.loadavg();

    return {
      count: cpuCount,
      model: cpus[0].model,
      loadAverage: {
        '1min': loadAverage[0].toFixed(2),
        '5min': loadAverage[1].toFixed(2),
        '15min': loadAverage[2].toFixed(2)
      }
    };
  }

  /**
   * Get full health status
   */
  async getHealthStatus() {
    const database = await this.checkDatabase();
    const memory = this.checkMemory();
    const cpu = this.checkCPU();

    return {
      status: database.status === 'healthy' && memory.status === 'healthy' 
        ? 'healthy' 
        : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database,
      memory,
      cpu,
      nodeVersion: process.version,
      platform: os.platform(),
      architecture: os.arch()
    };
  }

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }
}

module.exports = new HealthMonitor();
