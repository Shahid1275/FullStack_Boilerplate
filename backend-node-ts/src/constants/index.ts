/**
 * Application Constants (TypeScript)
 */

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
} as const;

export const TOKEN = {
  EXPIRY: '7d',
  RESET_EXPIRY: 10 * 60 * 1000, // 10 minutes
} as const;
