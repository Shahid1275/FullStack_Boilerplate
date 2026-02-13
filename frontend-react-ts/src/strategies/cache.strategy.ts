/**
 * Cache Strategy
 * Client-side caching strategies
 */

export class CacheStrategy {
  private static cache = new Map<string, { value: any; timestamp: number; ttl: number }>();

  /**
   * Cache-first strategy
   * Returns cached data if available, otherwise fetches
   */
  static async cacheFirst<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = 60000
  ): Promise<T> {
    const cached = this.get<T>(key);
    
    if (cached !== null) {
      return cached;
    }

    const data = await fetchFn();
    this.set(key, data, ttl);
    
    return data;
  }

  /**
   * Network-first strategy
   * Always fetches fresh data, falls back to cache on error
   */
  static async networkFirst<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = 60000
  ): Promise<T> {
    try {
      const data = await fetchFn();
      this.set(key, data, ttl);
      return data;
    } catch (error) {
      const cached = this.get<T>(key);
      
      if (cached !== null) {
        return cached;
      }
      
      throw error;
    }
  }

  /**
   * Set cache value
   */
  static set(key: string, value: any, ttl: number = 60000): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Get cache value
   */
  static get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    
    if (!cached) return null;

    // Check if expired
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.value as T;
  }

  /**
   * Delete cache entry
   */
  static delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  static clear(): void {
    this.cache.clear();
  }

  /**
   * Check if key exists in cache
   */
  static has(key: string): boolean {
    const cached = this.cache.get(key);
    
    if (!cached) return false;

    // Check if expired
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

export default CacheStrategy;
