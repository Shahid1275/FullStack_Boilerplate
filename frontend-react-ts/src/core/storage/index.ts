/**
 * Storage Core Module
 * Core storage operations
 */

class StorageCore {
  /**
   * Generate namespaced key
   */
  getKey(key: string, namespace: string = 'app'): string {
    return `${namespace}:${key}`;
  }

  /**
   * Check storage availability
   */
  isAvailable(storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): boolean {
    try {
      const storage = window[storageType];
      const test = '__storage_test__';
      storage.setItem(test, test);
      storage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get storage size in KB
   */
  getStorageSize(storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): string {
    let size = 0;
    const storage = window[storageType];
    
    for (const key in storage) {
      if (storage.hasOwnProperty(key)) {
        size += storage[key].length + key.length;
      }
    }
    
    return (size / 1024).toFixed(2); // KB
  }

  /**
   * Clear expired items
   */
  clearExpired(storage: Storage): void {
    const now = Date.now();
    
    for (const key in storage) {
      if (storage.hasOwnProperty(key)) {
        try {
          const item = JSON.parse(storage[key]);
          if (item.expiry && item.expiry < now) {
            storage.removeItem(key);
          }
        } catch {
          // Not a managed item, skip
        }
      }
    }
  }
}

export default new StorageCore();
