/**
 * User Repository
 * User-specific database operations
 */

const BaseRepository = require('./BaseRepository');
const User = require('../models/User');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  /**
   * Find user by email
   */
  async findByEmail(email) {
    return await this.model.findOne({ email }).exec();
  }

  /**
   * Find active users
   */
  async findActiveUsers() {
    return await this.model.find({ isActive: true, isDeleted: false }).exec();
  }

  /**
   * Find users by role
   */
  async findByRole(role) {
    return await this.model.find({ role }).exec();
  }

  /**
   * Update last login
   */
  async updateLastLogin(id) {
    return await this.model.findByIdAndUpdate(
      id,
      { lastLogin: new Date() },
      { new: true }
    ).exec();
  }
}

module.exports = new UserRepository();
