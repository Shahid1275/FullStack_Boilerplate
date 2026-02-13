/**
 * User Domain Model
 */

export class UserModel {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<UserModel> = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.email= data.email || '';
    this.role = data.role || 'user';
    this.avatar = data.avatar || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  get isAdmin(): boolean {
    return this.role === 'admin';
  }

  get displayName(): string {
    return this.name || this.email.split('@')[0];
  }

  get initials(): string {
    return this.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
