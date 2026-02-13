/**
 * User Type Definitions
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {string} avatar
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user
 * @property {boolean} isAuthenticated
 * @property {boolean} loading
 * @property {string|null} error
 */

export const UserRoles = {
  ADMIN: 'admin',
  USER: 'user',
};
