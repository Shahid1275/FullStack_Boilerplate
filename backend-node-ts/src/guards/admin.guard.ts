/**
 * Admin Guard - Restricts access to admin users
 */

import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { ForbiddenException } from '../exceptions/ForbiddenException';
import { UserRole } from '../enums/UserRoles';

export class AdminGuard {
  /**
   * Check if user is authenticated and is an admin
   */
  static check(req: Request, res: Response, next: NextFunction): void {
    const user = (req as any).user;

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('Admin access required');
    }

    next();
  }
}
