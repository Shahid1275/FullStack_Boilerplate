/**
 * Admin Guard
 * Authorization guard for admin-only routes
 */

const { ForbiddenException } = require('../exceptions');

class AdminGuard {
  /**
   * Check if user has admin role
   */
  static canActivate(req, res, next) {
    try {
      if (!req.user) {
        throw new ForbiddenException('User not authenticated');
      }

      if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
        throw new ForbiddenException('Admin access required');
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminGuard;
