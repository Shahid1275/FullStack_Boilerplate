/**
 * Base Service
 * Core service class with common business logic
 */

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Find all records
   */
  async findAll(options = {}) {
    try {
      return await this.repository.findAll(options);
    } catch (error) {
      throw new Error(`Find all failed: ${error.message}`);
    }
  }

  /**
   * Find by ID
   */
  async findById(id) {
    try {
      const record = await this.repository.findById(id);
      if (!record) {
        throw new Error('Record not found');
      }
      return record;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new record
   */
  async create(data) {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw new Error(`Create failed: ${error.message}`);
    }
  }

  /**
   * Update record
   */
  async update(id, data) {
    try {
      const record = await this.findById(id);
      return await this.repository.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete record
   */
  async delete(id) {
    try {
      const record = await this.findById(id);
      return await this.repository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Soft delete record
   */
  async softDelete(id) {
    try {
      return await this.repository.softDelete(id);
    } catch (error) {
      throw new Error(`Soft delete failed: ${error.message}`);
    }
  }
}

module.exports = BaseService;
