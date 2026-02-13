/**
 * Admin User Seed (TypeScript)
 */

import User from '@/models/User';
import logger from '@/helpers/logger';

const seedAdminUser = async (): Promise<void> => {
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

export default seedAdminUser;
