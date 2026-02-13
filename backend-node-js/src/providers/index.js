/**
 * Providers Index
 * Dependency injection providers aggregator
 */

const DatabaseProvider = require('./database.provider');
const CacheProvider = require('./cache.provider');

module.exports = {
  DatabaseProvider,
  CacheProvider
};
