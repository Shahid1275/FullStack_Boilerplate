/**
 * Database Helper Functions
 */

const mongoose = require('mongoose');

/**
 * Check if ID is valid MongoDB ObjectId
 */
exports.isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Convert string to ObjectId
 */
exports.toObjectId = (id) => {
  return new mongoose.Types.ObjectId(id);
};

/**
 * Sanitize MongoDB query
 */
exports.sanitizeQuery = (query) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === 'object' && value !== null) {
      sanitized[key] = exports.sanitizeQuery(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};
