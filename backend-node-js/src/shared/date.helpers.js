/**
 * Date Helpers
 * Common date manipulation functions
 */

/**
 * Format date to ISO string
 */
const toISOString = (date = new Date()) => {
  return date.toISOString();
};

/**
 * Add days to date
 */
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add hours to date
 */
const addHours = (date, hours) => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

/**
 * Difference in days
 */
const diffInDays = (date1, date2) => {
  const diff = Math.abs(date2 - date1);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

/**
 * Is past date
 */
const isPast = (date) => {
  return new Date(date) < new Date();
};

/**
 * Is future date
 */
const isFuture = (date) => {
  return new Date(date) > new Date();
};

/**
 * Format date
 */
const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day);
};

module.exports = {
  toISOString,
  addDays,
  addHours,
  diffInDays,
  isPast,
  isFuture,
  formatDate
};
