/**
 * Cache Strategy
 * Caching strategies (LRU, TTL, etc.)
 */

class CacheStrategy {
  /**
   * Cache-aside pattern
   */
  static async cacheAside(key, fetchFn, cache, ttl = 3600) {
    // Try to get from cache
    let data = await cache.get(key);

    if (data) {
      return data;
    }

    // If not in cache, fetch from source
    data = await fetchFn();

    // Store in cache
    await cache.set(key, data, ttl);

    return data;
  }

  /**
   * Write-through pattern
   */
  static async writeThrough(key, data, saveFn, cache, ttl = 3600) {
    // Save to database
    const saved = await saveFn(data);

    // Update cache
    await cache.set(key, saved, ttl);

    return saved;
  }

  /**
   * Invalidate cache
   */
  static async invalidate(key, cache) {
    await cache.delete(key);
  }
}

module.exports = CacheStrategy;
