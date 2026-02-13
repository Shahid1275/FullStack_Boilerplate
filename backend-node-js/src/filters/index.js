/**
 * Filters Index
 * Exception and response filters aggregator
 */

const ExceptionFilter = require('./exception.filter');
const ResponseFilter = require('./response.filter');

module.exports = {
  ExceptionFilter,
  ResponseFilter
};
