/**
 * User Entity - Domain model
 * Rich domain entity with business logic
 */

import { BaseEntity } from '../core/BaseEntity';

export interface UserProps {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  password: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt?: Date;
}

export class UserEntity extends BaseEntity {
  private email: string;
  private username: string;
  private firstName?: string;
  private lastName?: string;
  private password: string;
  private role: string;
  private isActive: boolean;
  private isEmailVerified: boolean;
  private lastLoginAt?: Date;

  constructor(props: UserProps) {
    super();
    this.email = props.email;
    this.username = props.username;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.password = props.password;
    this.role = props.role;
    this.isActive = props.isActive;
    this.isEmailVerified = props.isEmailVerified;
    this.lastLoginAt = props.lastLoginAt;
  }

  // Getters
  getEmail(): string {
    return this.email;
  }

  getUsername(): string {
    return this.username;
  }

  getFullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim() || this.username;
  }

  getRole(): string {
    return this.role;
  }

  // Business logic methods
  activate(): void {
    this.isActive = true;
    this.markAsUpdated();
  }

  deactivate(): void {
    this.isActive = false;
    this.markAsUpdated();
  }

  verifyEmail(): void {
    this.isEmailVerified = true;
    this.markAsUpdated();
  }

  updateLastLogin(): void {
    this.lastLoginAt = new Date();
    this.markAsUpdated();
  }

  changePassword(newPassword: string): void {
    this.password = newPassword;
    this.markAsUpdated();
  }

  changeRole(newRole: string): void {
    this.role = newRole;
    this.markAsUpdated();
  }

  updateProfile(firstName?: string, lastName?: string): void {
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    this.markAsUpdated();
  }

  // Convert to JSON
  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      email: this.email,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.getFullName(),
      role: this.role,
      isActive: this.isActive,
      isEmailVerified: this.isEmailVerified,
      lastLoginAt: this.lastLoginAt,
    };
  }

  // Exclude password from public JSON
  toPublicJSON(): Record<string, any> {
    const json = this.toJSON();
    delete json.password;
    return json;
  }
}
