/**
 * Role Guard
 * Authorization guard for role-based access
 */

const { ForbiddenException } = require('../exceptions');

class RoleGuard {
  /**
   * Create role guard middleware
   */
  static hasRole(...roles) {
    return (req, res, next) => {
      try {
        if (!req.user) {
          throw new ForbiddenException('User not authenticated');
        }

        if (!roles.includes(req.user.role)) {
          throw new ForbiddenException(`Required roles: ${roles.join(', ')}`);
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

module.exports = RoleGuard;
