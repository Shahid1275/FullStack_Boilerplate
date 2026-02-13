/**
 * Role Guard - Role-based access control
 */

import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { ForbiddenException } from '../exceptions/ForbiddenException';
import { UserRole, hasRolePermission } from '../enums/UserRoles';

export class RoleGuard {
  /**
   * Check if user has required role
   */
  static requireRole(...roles: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const user = (req as any).user;

      if (!user) {
        throw new UnauthorizedException('Authentication required');
      }

      const hasPermission = roles.some(role => 
        hasRolePermission(user.role, role)
      );

      if (!hasPermission) {
        throw new ForbiddenException(
          `Required role: ${roles.join(' or ')}`
        );
      }

      next();
    };
  }

  /**
   * Check if user has at least one of the specified roles
   */
  static requireAnyRole(...roles: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const user = (req as any).user;

      if (!user) {
        throw new UnauthorizedException('Authentication required');
      }

      const hasRole = roles.includes(user.role);

      if (!hasRole) {
        throw new ForbiddenException(
          `Required one of roles: ${roles.join(', ')}`
        );
      }

      next();
    };
  }

  /**
   * Check if user has all specified roles
   */
  static requireAllRoles(...roles: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const user = (req as any).user;

      if (!user) {
        throw new UnauthorizedException('Authentication required');
      }

      const hasAllRoles = roles.every(role => 
        hasRolePermission(user.role, role)
      );

      if (!hasAllRoles) {
        throw new ForbiddenException(
          `Required all roles: ${roles.join(', ')}`
        );
      }

      next();
    };
  }
}
