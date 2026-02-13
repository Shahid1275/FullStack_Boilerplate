/**
 * Guards Index
 * Authorization guards aggregator
 */

const AdminGuard = require('./admin.guard');
const RoleGuard = require('./role.guard');

module.exports = {
  AdminGuard,
  RoleGuard
};
