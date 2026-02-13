/**
 * Strategies Index
 * Authentication and caching strategies aggregator
 */

const JwtStrategy = require('./jwt.strategy');
const CacheStrategy = require('./cache.strategy');

module.exports = {
  JwtStrategy,
  CacheStrategy
};
