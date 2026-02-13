/**
 * User Domain Entity
 * Rich domain model with business logic
 */

const BaseEntity = require('../core/BaseEntity');

class UserEntity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.email = data.email || '';
    this.name = data.name || '';
    this.role = data.role || 'user';
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.emailVerified = data.emailVerified || false;
    this.lastLoginAt = data.lastLoginAt || null;
  }

  /**
   * Check if user is admin
   */
  isAdmin() {
    return this.role === 'admin';
  }

  /**
   * Check if user is moderator
   */
  isModerator() {
    return this.role === 'moderator' || this.isAdmin();
  }

  /**
   * Check if account is active
   */
  canLogin() {
    return this.isActive && this.emailVerified && !this.isDeleted;
  }

  /**
   * Activate user account
   */
  activate() {
    this.isActive = true;
    this.touch();
  }

  /**
   * Deactivate user account
   */
  deactivate() {
    this.isActive = false;
    this.touch();
  }

  /**
   * Verify email
   */
  verifyEmail() {
    this.emailVerified = true;
    this.touch();
  }

  /**
   * Update last login
   */
  updateLastLogin() {
    this.lastLoginAt = new Date();
    this.touch();
  }

  /**
   * Change role
   */
  changeRole(newRole) {
    const validRoles = ['user', 'moderator', 'admin'];
    if (!validRoles.includes(newRole)) {
      throw new Error(`Invalid role: ${newRole}`);
    }
    this.role = newRole;
    this.touch();
  }

  /**
   * Convert to object
   */
  toObject() {
    return {
      ...super.toObject(),
      email: this.email,
      name: this.name,
      role: this.role,
      isActive: this.isActive,
      emailVerified: this.emailVerified,
      lastLoginAt: this.lastLoginAt
    };
  }
}

module.exports = UserEntity;
