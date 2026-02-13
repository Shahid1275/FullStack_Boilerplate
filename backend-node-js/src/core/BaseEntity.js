/**
 * Base Entity
 * Core domain entity with common properties
 */

class BaseEntity {
  constructor(data = {}) {
    this.id = data.id || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.deletedAt = data.deletedAt || null;
    this.isDeleted = data.isDeleted || false;
  }

  /**
   * Mark entity as deleted (soft delete)
   */
  markAsDeleted() {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }

  /**
   * Restore deleted entity
   */
  restore() {
    this.isDeleted = false;
    this.deletedAt = null;
  }

  /**
   * Update timestamp
   */
  touch() {
    this.updatedAt = new Date();
  }

  /**
   * Convert to plain object
   */
  toObject() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      isDeleted: this.isDeleted
    };
  }

  /**
   * Convert to JSON
   */
  toJSON() {
    return this.toObject();
  }
}

module.exports = BaseEntity;
