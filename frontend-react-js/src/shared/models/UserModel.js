/**
 * User Domain Interface
 */

export class UserModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.role = data.role || 'user';
    this.avatar = data.avatar || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  get isAdmin() {
    return this.role === 'admin';
  }

  get displayName() {
    return this.name || this.email.split('@')[0];
  }

  get initials() {
    return this.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
