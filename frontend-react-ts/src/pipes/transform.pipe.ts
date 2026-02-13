/**
 * Transform Pipe
 * Transform data between different formats
 */

export class TransformPipe {
  /**
   * Transform array to map
   */
  static arrayToMap<T extends Record<string, any>>(
    array: T[],
    key: keyof T
  ): Map<string, T> {
    const map = new Map<string, T>();
    array.forEach(item => {
      map.set(String(item[key]), item);
    });
    return map;
  }

  /**
   * Transform map to array
   */
  static mapToArray<T>(map: Map<string, T>): T[] {
    return Array.from(map.values());
  }

  /**
   * Transform snake_case to camelCase
   */
  static snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  /**
   * Transform camelCase to snake_case
   */
  static camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  /**
   * Deep transform object keys
   */
  static transformKeys<T extends Record<string, any>>(
    obj: T,
    transformer: (key: string) => string
  ): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.transformKeys(item, transformer));
    }

    if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc, key) => {
        const newKey = transformer(key);
        acc[newKey] = this.transformKeys(obj[key], transformer);
        return acc;
      }, {} as any);
    }

    return obj;
  }

  /**
   * Flatten nested object
   */
  static flatten(obj: any, prefix: string = ''): Record<string, any> {
    const flattened: Record<string, any> = {};

    for (const key in obj) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
        Object.assign(flattened, this.flatten(obj[key], newKey));
      } else {
        flattened[newKey] = obj[key];
      }
    }

    return flattened;
  }
}

export default TransformPipe;
