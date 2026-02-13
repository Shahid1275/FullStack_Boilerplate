/**
 * User Transformer - Transform user data for output
 */

import { IUser } from '../interfaces';

export class UserTransformer {
  /**
   * Transform user to public format
   */
  static toPublic(user: any): Record<string, any> {
    return {
      id: user.id || user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      role: user.role,
      isActive: user.isActive,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
    };
  }

  /**
   * Transform user to minimal format
   */
  static toMinimal(user: any): Record<string, any> {
    return {
      id: user.id || user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  /**
   * Transform user array to public format
   */
  static toPublicArray(users: any[]): Record<string, any>[] {
    return users.map(user => this.toPublic(user));
  }

  /**
   * Transform user for JWT payload
   */
  static toJwtPayload(user: any): Record<string, any> {
    return {
      userId: user.id || user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }
}
