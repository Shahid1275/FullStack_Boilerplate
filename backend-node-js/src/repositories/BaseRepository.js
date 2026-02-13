/**
 * Base Repository
 * Abstract repository with common database operations
 */

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  /**
   * Find all records
   */
  async findAll(options = {}) {
    const { filter = {}, sort = {}, limit, skip } = options;
    let query = this.model.find(filter);

    if (sort) query = query.sort(sort);
    if (skip) query = query.skip(skip);
    if (limit) query = query.limit(limit);

    return await query.exec();
  }

  /**
   * Find by ID
   */
  async findById(id) {
    return await this.model.findById(id).exec();
  }

  /**
   * Find one by criteria
   */
  async findOne(criteria) {
    return await this.model.findOne(criteria).exec();
  }

  /**
   * Create new record
   */
  async create(data) {
    const record = new this.model(data);
    return await record.save();
  }

  /**
   * Update record
   */
  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).exec();
  }

  /**
   * Delete record
   */
  async delete(id) {
    return await this.model.findByIdAndDelete(id).exec();
  }

  /**
   * Soft delete record
   */
  async softDelete(id) {
    return await this.model.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date()
    }, { new: true }).exec();
  }

  /**
   * Count records
   */
  async count(filter = {}) {
    return await this.model.countDocuments(filter).exec();
  }

  /**
   * Check if exists
   */
  async exists(criteria) {
    const count = await this.model.countDocuments(criteria).exec();
    return count > 0;
  }
}

module.exports = BaseRepository;
