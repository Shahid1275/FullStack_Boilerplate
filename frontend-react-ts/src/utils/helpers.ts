type DateFormat = 'full' | 'short' | 'time' | 'datetime'

export const formatDate = (date: string | Date, format: DateFormat = 'full'): string => {
  const d = new Date(date)
  
  const formats: Record<DateFormat, string> = {
    full: d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    short: d.toLocaleDateString('en-US'),
    time: d.toLocaleTimeString('en-US'),
    datetime: d.toLocaleString('en-US'),
  }
  
  return formats[format] || formats.full
}

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}
