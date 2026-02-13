/**
 * User Validators
 * Validation rules for user endpoints
 */

const { body, param, query } = require('express-validator');

exports.getUserValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format'),
];

exports.updateUserValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin'),
];

exports.deleteUserValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format'),
];

exports.getUsersQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search query too long'),
  
  query('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin'),
];
