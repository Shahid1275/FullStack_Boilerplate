/**
 * Application Constants (TypeScript)
 */

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'My App';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

export enum StorageKeys {
  TOKEN = 'token',
  USER = 'user',
  THEME = 'theme',
  LANGUAGE = 'language',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum Language {
  EN = 'en',
  UR = 'ur',
  HI = 'hi',
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export type PaginationConfig = typeof PAGINATION;
