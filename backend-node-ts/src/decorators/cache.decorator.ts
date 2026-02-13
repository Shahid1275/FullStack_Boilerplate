/**
 * Cache Decorator - Method result caching
 * Caches method results for improved performance
 */

const cache = new Map<string, { value: any; expiresAt: number }>();

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  key?: string; // Custom cache key
}

/**
 * Cache decorator for methods
 */
export function Cache(options: CacheOptions = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const ttl = options.ttl || 60000; // Default 1 minute

    descriptor.value = async function (...args: any[]) {
      const cacheKey = options.key || `${target.constructor.name}.${propertyKey}:${JSON.stringify(args)}`;
      const now = Date.now();

      // Check if cached value exists and is not expired
      const cached = cache.get(cacheKey);
      if (cached && cached.expiresAt > now) {
        console.log(`[Cache HIT] ${cacheKey}`);
        return cached.value;
      }

      // Execute original method
      console.log(`[Cache MISS] ${cacheKey}`);
      const result = await originalMethod.apply(this, args);

      // Store in cache
      cache.set(cacheKey, {
        value: result,
        expiresAt: now + ttl,
      });

      return result;
    };

    return descriptor;
  };
}

/**
 * Clear all cache entries
 */
export function clearCache(): void {
  cache.clear();
  console.log('[Cache] All entries cleared');
}

/**
 * Clear specific cache entry
 */
export function clearCacheKey(key: string): void {
  cache.delete(key);
  console.log(`[Cache] Cleared key: ${key}`);
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}

/**
 * Memoize decorator for pure functions
 */
export function Memoize() {
  const memoCache = new Map<string, any>();

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      
      if (memoCache.has(key)) {
        return memoCache.get(key);
      }

      const result = originalMethod.apply(this, args);
      memoCache.set(key, result);
      return result;
    };

    return descriptor;
  };
}
