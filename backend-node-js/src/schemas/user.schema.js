/**
 * User Schema
 * Validation schema for user operations
 */

const Joi = require('joi');

const UserSchema = {
  /**
   * Create user validation schema
   */
  create: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
    role: Joi.string().valid('user', 'moderator', 'admin').default('user')
  }),

  /**
   * Update user validation schema
   */
  update: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    role: Joi.string().valid('user', 'moderator', 'admin')
  }).min(1),

  /**
   * Login validation schema
   */
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};

module.exports = UserSchema;
