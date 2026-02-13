/**
 * Auth Core Module
 * Core authentication logic independent of UI framework
 */

import { storageAdapter } from '@/adapters';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

class AuthCore {
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  /**
   * Store authentication data
   */
  setAuth(token: string, user: User): void {
    storageAdapter.set(this.tokenKey, token);
    storageAdapter.set(this.userKey, user);
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return storageAdapter.get<string>(this.tokenKey);
  }

  /**
   * Get stored user
   */
  getUser(): User | null {
    return storageAdapter.get<User>(this.userKey);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Clear authentication data
   */
  clearAuth(): void {
    storageAdapter.remove(this.tokenKey);
    storageAdapter.remove(this.userKey);
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

export default new AuthCore();
