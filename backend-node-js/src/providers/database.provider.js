/**
 * Database Provider
 * Database connection provider
 */

const mongoose = require('mongoose');
const logger = require('../helpers/logger');

class DatabaseProvider {
  constructor() {
    this.connection = null;
  }

  /**
   * Connect to database
   */
  async connect(uri) {
    try {
      this.connection = await mongoose.connect(uri);
      logger.info('Database connected successfully');
      return this.connection;
    } catch (error) {
      logger.error('Database connection failed:', error);
      throw error;
    }
  }

  /**
   * Disconnect from database
   */
  async disconnect() {
    try {
      await mongoose.disconnect();
      logger.info('Database disconnected');
    } catch (error) {
      logger.error('Database disconnection failed:', error);
      throw error;
    }
  }

  /**
   * Get connection instance
   */
  getConnection() {
    return this.connection;
  }
}

module.exports = new DatabaseProvider();
