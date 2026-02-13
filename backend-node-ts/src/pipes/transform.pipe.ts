/**
 * Transform Pipe - Data transformation utilities
 */

export class TransformPipe {
  /**
   * Transform to lowercase
   */
  static toLowerCase(value: string): string {
    return value ? value.toLowerCase() : '';
  }

  /**
   * Transform to uppercase
   */
  static toUpperCase(value: string): string {
    return value ? value.toUpperCase() : '';
  }

  /**
   * Transform to title case
   */
  static toTitleCase(value: string): string {
    if (!value) return '';
    return value.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  /**
   * Trim whitespace
   */
  static trim(value: string): string {
    return value ? value.trim() : '';
  }

  /**
   * Transform to slug
   */
  static toSlug(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /**
   * Parse JSON string
   */
  static parseJSON<T = any>(value: string): T {
    try {
      return JSON.parse(value);
    } catch {
      throw new Error('Invalid JSON string');
    }
  }

  /**
   * Stringify to JSON
   */
  static toJSON(value: any, pretty: boolean = false): string {
    return JSON.stringify(value, null, pretty ? 2 : 0);
  }

  /**
   * Transform to Date
   */
  static toDate(value: any): Date {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    return date;
  }

  /**
   * Transform array to CSV string
   */
  static toCSV(array: any[], delimiter: string = ','): string {
    if (!Array.isArray(array) || array.length === 0) {
      return '';
    }

    const headers = Object.keys(array[0]);
    const rows = array.map(obj => 
      headers.map(key => JSON.stringify(obj[key] || '')).join(delimiter)
    );

    return [headers.join(delimiter), ...rows].join('\n');
  }

  /**
   * Remove duplicates from array
   */
  static unique<T>(array: T[]): T[] {
    return [...new Set(array)];
  }

  /**
   * Flatten nested array
   */
  static flatten<T>(array: any[]): T[] {
    return array.flat(Infinity);
  }

  /**
   * Group array by key
   */
  static groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((groups: Record<string, T[]>, item) => {
      const value = String(item[key]);
      groups[value] = groups[value] || [];
      groups[value].push(item);
      return groups;
    }, {});
  }
}
