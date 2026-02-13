/**
 * Monitoring Index
 * Performance and health monitoring aggregator
 */

const PerformanceMonitor = require('./performance.monitor');
const HealthMonitor = require('./health.monitor');

module.exports = {
  PerformanceMonitor,
  HealthMonitor
};
