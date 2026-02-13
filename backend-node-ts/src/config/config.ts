interface Config {
  env: string
  port: number
  mongoUri: string
  jwt: {
    secret: string
    expire: string
    cookieExpire: number
  }
  cors: {
    origins: string[]
  }
  rateLimit: {
    windowMs: number
    maxRequests: number
  }
  upload: {
    maxFileSize: number
  }
}

export const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongoUri: process.env.NODE_ENV === 'production' 
    ? process.env.MONGODB_URI_PROD! 
    : process.env.MONGODB_URI!,
  
  jwt: {
    secret: process.env.JWT_SECRET!,
    expire: process.env.JWT_EXPIRE || '7d',
    cookieExpire: parseInt(process.env.JWT_COOKIE_EXPIRE || '7', 10),
  },

  cors: {
    origins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10),
  },
}

export default config
