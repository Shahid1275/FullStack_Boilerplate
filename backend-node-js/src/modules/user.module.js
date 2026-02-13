/**
 * User Module
 * User management module
 */

const userController = require('../controllers/userController');
const userService = require('../services/user.service');
const userRoutes = require('../routes/userRoutes');

class UserModule {
  /**
   * Get module routes
   */
  static getRoutes() {
    return userRoutes;
  }

  /**
   * Get module controllers
   */
  static getControllers() {
    return userController;
  }

  /**
   * Get module services
   */
  static getServices() {
    return userService;
  }
}

module.exports = UserModule;
