/**
 * Base Service - Service Layer Pattern
 * All business logic services should extend this base class
 */

export interface ServiceOptions {
  logger?: any;
  cache?: any;
}

export abstract class BaseService<T = any> {
  protected logger?: any;
  protected cache?: any;

  constructor(options?: ServiceOptions) {
    this.logger = options?.logger;
    this.cache = options?.cache;
  }

  /**
   * Log info message
   */
  protected logInfo(message: string, meta?: any): void {
    if (this.logger) {
      this.logger.info(message, meta);
    } else {
      console.log(`[INFO] ${message}`, meta || '');
    }
  }

  /**
   * Log error message
   */
  protected logError(message: string, error?: any): void {
    if (this.logger) {
      this.logger.error(message, error);
    } else {
      console.error(`[ERROR] ${message}`, error || '');
    }
  }

  /**
   * Log warning message
   */
  protected logWarn(message: string, meta?: any): void {
    if (this.logger) {
      this.logger.warn(message, meta);
    } else {
      console.warn(`[WARN] ${message}`, meta || '');
    }
  }

  /**
   * Get cached data
   */
  protected async getCached<K>(key: string): Promise<K | null> {
    if (!this.cache) return null;
    
    try {
      return await this.cache.get(key);
    } catch (error) {
      this.logError(`Cache get error for key: ${key}`, error);
      return null;
    }
  }

  /**
   * Set cached data
   */
  protected async setCached(key: string, value: any, ttl?: number): Promise<void> {
    if (!this.cache) return;
    
    try {
      await this.cache.set(key, value, ttl);
    } catch (error) {
      this.logError(`Cache set error for key: ${key}`, error);
    }
  }

  /**
   * Delete cached data
   */
  protected async deleteCached(key: string): Promise<void> {
    if (!this.cache) return;
    
    try {
      await this.cache.del(key);
    } catch (error) {
      this.logError(`Cache delete error for key: ${key}`, error);
    }
  }

  /**
   * Handle service errors
   */
  protected handleError(error: any, context?: string): never {
    const message = context ? `${context}: ${error.message}` : error.message;
    this.logError(message, error);
    throw error;
  }

  /**
   * Validate required fields
   */
  protected validateRequired(data: any, fields: string[]): void {
    const missing = fields.filter(field => !data[field]);
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
  }
}
