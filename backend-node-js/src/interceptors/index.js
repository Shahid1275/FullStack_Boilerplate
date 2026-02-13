/**
 * Interceptors Index
 * Request/response interceptors aggregator
 */

const LoggingInterceptor = require('./logging.interceptor');
const TransformInterceptor = require('./transform.interceptor');

module.exports = {
  LoggingInterceptor,
  TransformInterceptor
};
