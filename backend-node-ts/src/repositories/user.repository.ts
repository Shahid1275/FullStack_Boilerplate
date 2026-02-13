/**
 * User Repository - User data access layer
 */

import { Model } from 'mongoose';
import { BaseRepository } from './BaseRepository';

export interface IUserDocument {
  _id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UserRepository extends BaseRepository<any> {
  constructor(model: Model<any>) {
    super(model);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<any | null> {
    return await this.findOne({ email });
  }

  /**
   * Find user by username
   */
  async findByUsername(username: string): Promise<any | null> {
    return await this.findOne({ username });
  }

  /**
   * Find active users
   */
  async findActiveUsers(): Promise<any[]> {
    return await this.model.find({ isActive: true }).exec();
  }

  /**
   * Find users by role
   */
  async findByRole(role: string): Promise<any[]> {
    return await this.model.find({ role }).exec();
  }

  /**
   * Update last login
   */
  async updateLastLogin(id: string): Promise<any | null> {
    return await this.model
      .findByIdAndUpdate(id, { lastLoginAt: new Date() }, { new: true })
      .exec();
  }

  /**
   * Deactivate user
   */
  async deactivate(id: string): Promise<any | null> {
    return await this.update(id, { isActive: false } as any);
  }

  /**
   * Activate user
   */
  async activate(id: string): Promise<any | null> {
    return await this.update(id, { isActive: true } as any);
  }
}
