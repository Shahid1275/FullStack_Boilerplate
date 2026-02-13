/**
 * Storage Utility (TypeScript)
 */

import { logger } from './logger';

interface Storage {
  get: <T>(key: string, defaultValue?: T) => T | null;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
  clear: () => void;
}

class StorageService implements Storage {
  get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      logger.error(`Error getting item from storage: ${key}`, error);
      return defaultValue;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      logger.error(`Error setting item in storage: ${key}`, error);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      logger.error(`Error removing item from storage: ${key}`, error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      logger.error('Error clearing storage', error);
    }
  }
}

export const storage = new StorageService();
