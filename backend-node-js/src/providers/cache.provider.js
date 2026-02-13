/**
 * Cache Provider
 * Caching provider (Redis, Memory)
 */

class CacheProvider {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Get value from cache
   */
  async get(key) {
    return this.cache.get(key);
  }

  /**
   * Set value in cache
   */
  async set(key, value, ttl = 3600) {
    this.cache.set(key, value);
    
    // Simple TTL implementation
    if (ttl) {
      setTimeout(() => {
        this.cache.delete(key);
      }, ttl * 1000);
    }
    
    return true;
  }

  /**
   * Delete value from cache
   */
  async delete(key) {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  async clear() {
    this.cache.clear();
    return true;
  }

  /**
   * Check if key exists
   */
  async has(key) {
    return this.cache.has(key);
  }
}

module.exports = new CacheProvider();
