/**
 * User Repository Interface
 * @typedef {Object} IUserRepository
 * @property {Function} findAll - Find all users
 * @property {Function} findById - Find user by ID
 * @property {Function} findByEmail - Find user by email
 * @property {Function} create - Create new user
 * @property {Function} update - Update user
 * @property {Function} delete - Delete user
 * @property {Function} softDelete - Soft delete user
 */

/**
 * Service Interface
 * @typedef {Object} IService
 * @property {Function} findAll - Find all records
 * @property {Function} findById - Find record by ID
 * @property {Function} create - Create new record
 * @property {Function} update - Update record
 * @property {Function} delete - Delete record
 */

/**
 * Repository Interface
 * @typedef {Object} IRepository
 * @property {Function} findAll - Find all records
 * @property {Function} findById - Find by ID
 * @property {Function} findOne - Find one by criteria
 * @property {Function} create - Create record
 * @property {Function} update - Update record
 * @property {Function} delete - Delete record
 * @property {Function} count - Count records
 */

module.exports = {
  // Export interfaces for JSDoc usage
};
