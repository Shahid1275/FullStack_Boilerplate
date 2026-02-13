/**
 * Application Constants
 */

module.exports = {
  USER_ROLES: {
    ADMIN: 'admin',
    USER: 'user',
  },

  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },

  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
  },

  TOKEN: {
    EXPIRY: '7d',
    RESET_EXPIRY: 10 * 60 * 1000, // 10 minutes
  },
};
