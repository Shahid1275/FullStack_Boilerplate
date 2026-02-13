/**
 * User Service (TypeScript)
 */

import User, { IUserDocument } from '@/models/User';
import { AppError } from '@/utils/responseHelper';

interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

interface PaginatedUsers {
  users: IUserDocument[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface UserUpdateData {
  name?: string;
  email?: string;
  role?: string;
}

class UserService {
  /**
   * Get all users with pagination
   */
  async getAllUsers(query: UserQuery): Promise<PaginatedUsers> {
    const { page = 1, limit = 10, search = '', role } = query;
    
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (role) {
      filter.role = role;
    }

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select('-password')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    return {
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    };
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<IUserDocument> {
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * Update user
   */
  async updateUser(userId: string, updateData: UserUpdateData): Promise<IUserDocument> {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if email is being updated and already exists
    if (updateData.email && updateData.email !== user.email) {
      const emailExists = await User.findOne({ email: updateData.email });
      if (emailExists) {
        throw new AppError('Email already in use', 400);
      }
    }

    Object.assign(user, updateData);
    await user.save();

    return user;
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<{ message: string }> {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await user.deleteOne();
    return { message: 'User deleted successfully' };
  }

  /**
   * Update user profile (own profile)
   */
  async updateProfile(userId: string, updateData: UserUpdateData): Promise<IUserDocument> {
    // Prevent role update through profile
    const { role, ...safeUpdateData } = updateData;
    
    return this.updateUser(userId, safeUpdateData);
  }
}

export default new UserService();
