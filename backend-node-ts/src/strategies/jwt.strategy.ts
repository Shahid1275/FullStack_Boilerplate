/**
 * JWT Strategy - JWT token management
 */

import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces';

export class JwtStrategy {
  private secret: string;
  private expiresIn: string;

  constructor(secret: string, expiresIn: string = '24h') {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  /**
   * Generate JWT token
   */
  sign(payload: IJwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  /**
   * Verify JWT token
   */
  verify(token: string): IJwtPayload {
    try {
      return jwt.verify(token, this.secret) as IJwtPayload;
    } catch (error: any) {
      throw new Error(`Invalid token: ${error.message}`);
    }
  }

  /**
   * Decode JWT token without verification
   */
  decode(token: string): IJwtPayload | null {
    return jwt.decode(token) as IJwtPayload | null;
  }

  /**
   * Generate refresh token
   */
  signRefresh(payload: IJwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: '7d' });
  }

  /**
   * Check if token is expired
   */
  isExpired(token: string): boolean {
    try {
      const decoded = this.decode(token);
      if (!decoded || !decoded.exp) return true;
      return Date.now() >= decoded.exp * 1000;
    } catch {
      return true;
    }
  }
}
