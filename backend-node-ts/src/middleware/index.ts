import { Application } from 'express'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import config from '../config/config'

export const setupMiddleware = (app: Application): void => {
  // Body Parser
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))

  // Cookie Parser
  app.use(cookieParser())

  // Security Headers
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }))

  // CORS
  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || config.cors.origins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  }
  app.use(cors(corsOptions))

  // Sanitize Data (NoSQL Injection)
  app.use(mongoSanitize())

  // Logging
  if (config.env === 'development') {
    app.use(morgan('dev'))
  } else {
    app.use(morgan('combined'))
  }

  // Compression
  app.use(compression())

  // Rate Limiting
  const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
  app.use('/api/', limiter)

  // Trust proxy (for rate limiting behind reverse proxy)
  app.set('trust proxy', 1)
}

export default setupMiddleware
