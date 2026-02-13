/**
 * Redux Middleware for API Call Logging
 */

import { logger } from '@/lib/logger';

export const apiCallLogger = (store) => (next) => (action) => {
  if (action.type?.includes('/pending')) {
    logger.info(`API Call Started: ${action.type}`);
  }
  
  if (action.type?.includes('/fulfilled')) {
    logger.info(`API Call Success: ${action.type}`, action.payload);
  }
  
  if (action.type?.includes('/rejected')) {
    logger.error(`API Call Failed: ${action.type}`, action.error);
  }

  return next(action);
};
