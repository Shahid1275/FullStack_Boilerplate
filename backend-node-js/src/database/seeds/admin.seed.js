/**
 * Admin User Seed
 * Creates default admin user for development
 */

const User = require('../../models/User');
const logger = require('../../helpers/logger');

const seedAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin@123',
        role: 'admin',
      });

      logger.info('Admin user seeded successfully');
    } else {
      logger.info('Admin user already exists');
    }
  } catch (error) {
    logger.error('Error seeding admin user:', error);
  }
};

module.exports = seedAdminUser;
