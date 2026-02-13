/**
 * Cache Decorator
 * Cache function results
 */

const CacheProvider = require('../providers/cache.provider');

/**
 * Decorator to cache function results
 */
const cacheDecorator = (key, ttl = 3600) => {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args) {
      const cacheKey = typeof key === 'function' ? key(...args) : key;
      
      // Try to get from cache
      const cached = await CacheProvider.get(cacheKey);
      if (cached) {
        return cached;
      }

      // Call original method
      const result = await originalMethod.apply(this, args);

      // Store in cache
      await CacheProvider.set(cacheKey, result, ttl);

      return result;
    };

    return descriptor;
  };
};

module.exports = cacheDecorator;
