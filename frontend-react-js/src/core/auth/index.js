/**
 * Auth Core Module
 * Core authentication logic independent of UI framework
 */

import { storageAdapter } from '@/adapters';

class AuthCore {
  constructor() {
    this.tokenKey = 'auth_token';
    this.userKey = 'auth_user';
  }

  /**
   * Store authentication data
   */
  setAuth(token, user) {
    storageAdapter.set(this.tokenKey, token);
    storageAdapter.set(this.userKey, user);
  }

  /**
   * Get stored token
   */
  getToken() {
    return storageAdapter.get(this.tokenKey);
  }

  /**
   * Get stored user
   */
  getUser() {
    return storageAdapter.get(this.userKey);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Clear authentication data
   */
  clearAuth() {
    storageAdapter.remove(this.tokenKey);
    storageAdapter.remove(this.userKey);
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

export default new AuthCore();
