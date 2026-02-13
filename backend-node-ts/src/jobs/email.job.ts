/**
 * Email Job Example (TypeScript)
 */

import logger from '@/helpers/logger';

interface User {
  name: string;
  email: string;
}

class EmailJob {
  /**
   * Send welcome email to new user
   */
  async sendWelcomeEmail(user: User): Promise<void> {
    try {
      logger.info(`Sending welcome email to ${user.email}`);
      
      // TODO: Implement actual email sending logic
      // Example: await emailService.send({
      //   to: user.email,
      //   subject: 'Welcome!',
      //   template: 'welcome',
      //   data: { name: user.name }
      // });

      logger.info(`Welcome email sent to ${user.email}`);
    } catch (error) {
      logger.error('Failed to send welcome email', error);
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    try {
      logger.info(`Sending password reset email to ${email}`);
      
      // TODO: Implement actual email sending logic
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      logger.info(`Reset URL: ${resetUrl}`);
      
      logger.info(`Password reset email sent to ${email}`);
    } catch (error) {
      logger.error('Failed to send password reset email', error);
    }
  }
}

export default new EmailJob();
