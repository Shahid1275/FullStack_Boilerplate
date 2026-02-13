/**
 * Cache Decorator
 * Decorator to cache component data or function results
 */

export function withCache<T extends (...args: any[]) => any>(
  fn: T,
  ttl: number = 60000
): T {
  const cache = new Map<string, { value: any; timestamp: number }>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }

    const result = fn(...args);
    cache.set(key, { value: result, timestamp: Date.now() });

    return result;
  }) as T;
}

/**
 * Memoize decorator for class methods
 */
export function Memoize() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const cache = new Map<string, any>();

    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      
      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      
      return result;
    };

    return descriptor;
  };
}

export default { withCache, Memoize };
