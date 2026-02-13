export function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncate(str, length = 50) {
  return str.length > length ? str.substring(0, length) + '...' : str
}

export default { formatDate, formatCurrency, capitalize, truncate }
