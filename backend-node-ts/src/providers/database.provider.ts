/**
 * Database Provider - Database connection management
 */

import mongoose from 'mongoose';

export class DatabaseProvider {
  private static instance: DatabaseProvider;
  private connection: typeof mongoose | null = null;

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): DatabaseProvider {
    if (!DatabaseProvider.instance) {
      DatabaseProvider.instance = new DatabaseProvider();
    }
    return DatabaseProvider.instance;
  }

  /**
   * Connect to database
   */
  async connect(uri: string): Promise<void> {
    try {
      this.connection = await mongoose.connect(uri);
      console.log('[DatabaseProvider] Connected to MongoDB');
    } catch (error: any) {
      console.error('[DatabaseProvider] Connection failed:', error.message);
      throw error;
    }
  }

  /**
   * Disconnect from database
   */
  async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
      console.log('[DatabaseProvider] Disconnected from MongoDB');
    }
  }

  /**
   * Get connection status
   */
  isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Get connection instance
   */
  getConnection(): typeof mongoose | null {
    return this.connection;
  }
}
