/**
 * Redux Middleware for API Call Logging
 */

import { Middleware } from '@reduxjs/toolkit';

export const apiCallLogger: Middleware = (store) => (next) => (action: any) => {
  if (action.type?.includes('/pending')) {
    console.log(`API Call Started: ${action.type}`);
  }
  
  if (action.type?.includes('/fulfilled')) {
    console.log(`API Call Success: ${action.type}`, action.payload);
  }
  
  if (action.type?.includes('/rejected')) {
    console.error(`API Call Failed: ${action.type}`, action.error);
  }

  return next(action);
};
