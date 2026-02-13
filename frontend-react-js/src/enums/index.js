/**
 * Application Enums
 */

export const UserRole = Object.freeze({
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
});

export const Theme = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
});

export const Language = Object.freeze({
  ENGLISH: 'en',
  URDU: 'ur',
  HINDI: 'hi',
});

export const HttpMethod = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
});

export const LoadingState = Object.freeze({
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
});

export const SortOrder = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
});
