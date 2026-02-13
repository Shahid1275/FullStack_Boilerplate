/**
 * Decorators Index
 * Function decorators aggregator
 */

const asyncDecorator = require('./async.decorator');
const cacheDecorator = require('./cache.decorator');
const validateDecorator = require('./validate.decorator');

module.exports = {
  asyncDecorator,
  cacheDecorator,
  validateDecorator
};
