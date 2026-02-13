/**
 * Update User DTO
 * Data Transfer Object for user updates
 */

class UpdateUserDto {
  constructor(data = {}) {
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
  }

  /**
   * Validate DTO
   */
  validate() {
    const errors = [];

    if (this.name !== undefined && this.name.trim().length === 0) {
      errors.push('Name cannot be empty');
    }

    if (this.email !== undefined && !this.isValidEmail(this.email)) {
      errors.push('Valid email is required');
    }

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    return true;
  }

  /**
   * Check if email is valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Get only defined fields
   */
  toObject() {
    const result = {};
    if (this.name !== undefined) result.name = this.name;
    if (this.email !== undefined) result.email = this.email;
    if (this.role !== undefined) result.role = this.role;
    return result;
  }
}

module.exports = UpdateUserDto;
