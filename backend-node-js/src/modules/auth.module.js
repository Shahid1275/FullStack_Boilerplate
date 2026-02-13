/**
 * Auth Module
 * Authentication and authorization module
 */

const authController = require('../controllers/authController');
const authService = require('../services/auth.service');
const authRoutes = require('../routes/authRoutes');
const { protect } = require('../middleware/authMiddleware');

class AuthModule {
  /**
   * Get module routes
   */
  static getRoutes() {
    return authRoutes;
  }

  /**
   * Get module controllers
   */
  static getControllers() {
    return authController;
  }

  /**
   * Get module services
   */
  static getServices() {
    return authService;
  }

  /**
   * Get module middleware
   */
  static getMiddleware() {
    return { protect };
  }
}

module.exports = AuthModule;
