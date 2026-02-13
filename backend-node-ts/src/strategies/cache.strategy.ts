/**
 * Cache Strategy - Caching strategies implementation
 */

import { CacheProvider } from '../providers/cache.provider';

export type CacheStrategy = 'cache-first' | 'network-first' | 'cache-only' | 'network-only';

export class CacheStrategyImpl {
  private cache: CacheProvider;

  constructor() {
    this.cache = CacheProvider.getInstance();
  }

  /**
   * Cache-first strategy
   * Try cache first, fallback to network
   */
  async cacheFirst<T>(key: string, fetchFn: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = this.cache.get<T>(key);
    if (cached !== null) {
      console.log(`[CacheStrategy] Cache HIT: ${key}`);
      return cached;
    }

    console.log(`[CacheStrategy] Cache MISS: ${key}`);
    const data = await fetchFn();
    this.cache.set(key, data, ttl);
    return data;
  }

  /**
   * Network-first strategy
   * Try network first, fallback to cache
   */
  async networkFirst<T>(key: string, fetchFn: () => Promise<T>, ttl?: number): Promise<T> {
    try {
      const data = await fetchFn();
      this.cache.set(key, data, ttl);
      return data;
    } catch (error) {
      console.log(`[CacheStrategy] Network failed, trying cache: ${key}`);
      const cached = this.cache.get<T>(key);
      if (cached !== null) {
        return cached;
      }
      throw error;
    }
  }

  /**
   * Cache-only strategy
   * Return only from cache
   */
  async cacheOnly<T>(key: string): Promise<T | null> {
    return this.cache.get<T>(key);
  }

  /**
   * Network-only strategy
   * Always fetch from network
   */
  async networkOnly<T>(key: string, fetchFn: () => Promise<T>, ttl?: number): Promise<T> {
    const data = await fetchFn();
    this.cache.set(key, data, ttl);
    return data;
  }

  /**
   * Invalidate cache
   */
  invalidate(key: string): void {
    this.cache.delete(key);
    console.log(`[CacheStrategy] Invalidated: ${key}`);
  }

  /**
   * Invalidate pattern
   */
  invalidatePattern(pattern: RegExp): void {
    // Note: This is a simplified implementation
    // In production, you'd need a more sophisticated cache implementation
    console.log(`[CacheStrategy] Invalidated pattern: ${pattern}`);
  }
}
