/**
 * Database Helper Functions (TypeScript)
 */

import mongoose from 'mongoose';

/**
 * Check if ID is valid MongoDB ObjectId
 */
export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Convert string to ObjectId
 */
export const toObjectId = (id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(id);
};

/**
 * Sanitize MongoDB query
 */
export const sanitizeQuery = (query: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeQuery(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};
