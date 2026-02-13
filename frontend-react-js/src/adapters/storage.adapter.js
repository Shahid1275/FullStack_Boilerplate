/**
 * Storage Adapter - Abstraction over storage mechanism
 * Can easily switch between localStorage, sessionStorage, or IndexedDB
 */

class StorageAdapter {
  constructor(storage = localStorage) {
    this.storage = storage;
  }

  get(key, defaultValue = null) {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from storage:`, error);
      return defaultValue;
    }
  }

  set(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in storage:`, error);
      return false;
    }
  }

  remove(key) {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
      return false;
    }
  }

  clear() {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  has(key) {
    return this.storage.getItem(key) !== null;
  }
}

// Export different storage adapters
export const localStorageAdapter = new StorageAdapter(localStorage);
export const sessionStorageAdapter = new StorageAdapter(sessionStorage);
export default localStorageAdapter;
