/**
 * Repositories Index
 * Data access layer repositories aggregator
 */

const BaseRepository = require('./BaseRepository');
const UserRepository = require('./user.repository');

module.exports = {
  BaseRepository,
  UserRepository
};
