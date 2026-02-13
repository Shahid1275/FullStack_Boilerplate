/**
 * Storage Core Module
 * Core storage operations
 */

class StorageCore {
  /**
   * Generate namespaced key
   */
  getKey(key, namespace = 'app') {
    return `${namespace}:${key}`;
  }

  /**
   * Check storage availability
   */
  isAvailable(storageType = 'localStorage') {
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
   * Get storage size
   */
  getStorageSize(storageType = 'localStorage') {
    let size = 0;
    const storage = window[storageType];
    
    for (let key in storage) {
      if (storage.hasOwnProperty(key)) {
        size += storage[key].length + key.length;
      }
    }
    
    return (size / 1024).toFixed(2); // KB
  }

  /**
   * Clear expired items
   */
  clearExpired(storage) {
    const now = Date.now();
    
    for (let key in storage) {
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
