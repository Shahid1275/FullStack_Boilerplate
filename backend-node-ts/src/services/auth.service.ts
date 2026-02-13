/**
 * Auth Service (TypeScript)
 */

import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User, { IUserDocument } from '@/models/User';
import { AppError } from '@/utils/responseHelper';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

class AuthService {
  /**
   * Generate JWT token
   */
  generateToken(userId: string): string {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    } as jwt.SignOptions);
  }

  /**
   * Register new user
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    const userExists = await User.findOne({ email: userData.email });
    
    if (userExists) {
      throw new AppError('User already exists with this email', 400);
    }

    const user: IUserDocument = await User.create(userData);
    const token = this.generateToken(user._id.toString());

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = this.generateToken(user._id.toString());

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  /**
   * Generate password reset token
   */
  async generatePasswordResetToken(email: string): Promise<string> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.save({ validateBeforeSave: false });

    return resetToken;
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string): Promise<string> {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError('Invalid or expired reset token', 400);
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return this.generateToken(user._id.toString());
  }
}

export default new AuthService();
