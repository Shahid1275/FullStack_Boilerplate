/**
 * Interfaces Module - TypeScript interfaces
 * Centralized type definitions for the application
 */

/**
 * User interface
 */
export interface IUser {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API Response interface
 */
export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: IApiError;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    timestamp: Date;
  };
}

/**
 * API Error interface
 */
export interface IApiError {
  name: string;
  message: string;
  statusCode: number;
  details?: any;
}

/**
 * Pagination interface
 */
export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Query Options interface
 */
export interface IQueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

/**
 * Repository interface
 */
export interface IRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(options?: IQueryOptions): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

/**
 * Service interface
 */
export interface IService<T> {
  create(data: any): Promise<T>;
  findById(id: string): Promise<T>;
  findAll(options?: IQueryOptions): Promise<T[]>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<boolean>;
}

/**
 * JWT Payload interface
 */
export interface IJwtPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Config interface
 */
export interface IConfig {
  port: number;
  env: string;
  database: {
    uri: string;
    name: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  cors: {
    origin: string | string[];
    credentials: boolean;
  };
}
