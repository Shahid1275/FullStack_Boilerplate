/**
 * Storage Adapter - Abstraction over storage mechanism
 * Can easily switch between localStorage, sessionStorage, or IndexedDB
 */

class StorageAdapter {
  constructor(private storage: Storage = localStorage) {}

  get<T = any>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from storage:`, error);
      return defaultValue;
    }
  }

  set<T = any>(key: string, value: T): boolean {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in storage:`, error);
      return false;
    }
  }

  remove(key: string): boolean {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
      return false;
    }
  }

  clear(): boolean {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  has(key: string): boolean {
    return this.storage.getItem(key) !== null;
  }
}

// Export different storage adapters
export const localStorageAdapter = new StorageAdapter(localStorage);
export const sessionStorageAdapter = new StorageAdapter(sessionStorage);
export default localStorageAdapter;
