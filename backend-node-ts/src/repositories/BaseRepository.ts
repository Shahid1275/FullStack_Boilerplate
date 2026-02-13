/**
 * Base Repository - Repository Pattern base class
 * All repositories should extend this class
 */

import { Model, Document, FilterQuery } from 'mongoose';
import { IQueryOptions } from '../interfaces';

export abstract class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  /**
   * Create a new document
   */
  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return await document.save();
  }

  /**
   * Find document by ID
   */
  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  /**
   * Find one document by query
   */
  async findOne(query: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(query).exec();
  }

  /**
   * Find all documents
   */
  async findAll(options?: IQueryOptions): Promise<T[]> {
    let query = this.model.find();

    // Apply filters
    if (options?.filters) {
      query = query.where(options.filters);
    }

    // Apply search
    if (options?.search) {
      // Implement search logic based on your schema
      query = query.where({ $text: { $search: options.search } });
    }

    // Apply sorting
    if (options?.sort) {
      const sortOrder = options.order === 'desc' ? '-' : '';
      query = query.sort(`${sortOrder}${options.sort}`);
    }

    // Apply pagination
    if (options?.page && options?.limit) {
      const skip = (options.page - 1) * options.limit;
      query = query.skip(skip).limit(options.limit);
    }

    return await query.exec();
  }

  /**
   * Update document by ID
   */
  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  /**
   * Delete document by ID
   */
  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  /**
   * Count documents
   */
  async count(query?: FilterQuery<T>): Promise<number> {
    return await this.model.countDocuments(query || {}).exec();
  }

  /**
   * Check if document exists
   */
  async exists(query: FilterQuery<T>): Promise<boolean> {
    const count = await this.model.countDocuments(query).exec();
    return count > 0;
  }
}
