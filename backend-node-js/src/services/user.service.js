/**
 * User Service
 * Business logic for user operations
 */

const User = require('../models/User');
const { AppError } = require('../utils/responseHelper');

class UserService {
  /**
   * Get all users with pagination
   */
  async getAllUsers(query) {
    const { page = 1, limit = 10, search = '', role } = query;
    
    const filter = {};
    
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
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    return {
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * Update user
   */
  async updateUser(userId, updateData) {
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
  async deleteUser(userId) {
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
  async updateProfile(userId, updateData) {
    // Prevent role update through profile
    delete updateData.role;
    
    return this.updateUser(userId, updateData);
  }
}

module.exports = new UserService();
