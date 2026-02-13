/**
 * Admin User Seed (TypeScript)
 * Creates default admin user for development
 * 
 * SECURITY: Uses environment variables for credentials
 * Never hardcode passwords in source code!
 */

import User from '@/models/User';
import logger from '@/helpers/logger';

const seedAdminUser = async (): Promise<void> => {
  try {
    // Check if environment variables are set
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      logger.warn('Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD not set in .env');
      return;
    }

    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
      await User.create({
        name: process.env.ADMIN_NAME || 'Admin User',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin',
      });

      logger.info('✅ Admin user seeded successfully');
      logger.info(`📧 Email: ${process.env.ADMIN_EMAIL}`);
      logger.warn('⚠️  Remember to change password after first login!');
    } else {
      logger.info('ℹ️  Admin user already exists');
    }
  } catch (error) {
    logger.error('❌ Error seeding admin user:', error);
  }
};

export default seedAdminUser;
