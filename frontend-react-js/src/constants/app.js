/**
 * Application Constants
 */

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'My App';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const LANGUAGES = {
  EN: 'en',
  UR: 'ur',
  HI: 'hi',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};
