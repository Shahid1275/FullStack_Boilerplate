// Async Handler Decorator
export function asyncHandler(fn) {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error('Async error:', error)
      throw error
    }
  }
}

// Cache Decorator
export function cache(ttl = 60000) {
  const cache = new Map()
  return function (target, propertyKey, descriptor) {
    const originalMethod = descriptor.value
    descriptor.value = function (...args) {
      const key = JSON.stringify(args)
      if (cache.has(key)) {
        return cache.get(key)
      }
      const result = originalMethod.apply(this, args)
      cache.set(key, result)
      setTimeout(() => cache.delete(key), ttl)
      return result
    }
  }
}

export default { asyncHandler, cache }
