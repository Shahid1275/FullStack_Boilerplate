/**
 * Storage Utility
 * Wrapper for localStorage with error handling
 */

import { logger } from './logger';

export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      logger.error(`Error getting item from storage: ${key}`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      logger.error(`Error setting item in storage: ${key}`, error);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      logger.error(`Error removing item from storage: ${key}`, error);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      logger.error('Error clearing storage', error);
    }
  },
};
