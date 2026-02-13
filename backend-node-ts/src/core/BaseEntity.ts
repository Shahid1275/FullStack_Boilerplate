/**
 * Base Entity - Domain-Driven Design Entity
 * All domain entities should extend this base class
 */

export abstract class BaseEntity {
  protected id?: string;
  protected createdAt: Date;
  protected updatedAt: Date;
  protected deletedAt?: Date;

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Get entity ID
   */
  getId(): string | undefined {
    return this.id;
  }

  /**
   * Set entity ID
   */
  setId(id: string): void {
    this.id = id;
  }

  /**
   * Get creation timestamp
   */
  getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Get last update timestamp
   */
  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  /**
   * Mark entity as updated
   */
  markAsUpdated(): void {
    this.updatedAt = new Date();
  }

  /**
   * Soft delete entity
   */
  softDelete(): void {
    this.deletedAt = new Date();
    this.markAsUpdated();
  }

  /**
   * Check if entity is deleted
   */
  isDeleted(): boolean {
    return this.deletedAt !== undefined;
  }

  /**
   * Restore soft-deleted entity
   */
  restore(): void {
    this.deletedAt = undefined;
    this.markAsUpdated();
  }

  /**
   * Convert entity to plain object
   */
  toJSON(): Record<string, any> {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  /**
   * Check if two entities are equal
   */
  equals(other: BaseEntity): boolean {
    if (!other || !this.id || !other.id) {
      return false;
    }
    return this.id === other.getId();
  }
}
