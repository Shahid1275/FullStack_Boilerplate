import express, { Application } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database'
import { errorHandler, notFound } from './middleware/errorMiddleware'
import { setupMiddleware } from './middleware'
import routes from './routes'

// Load environment variables
dotenv.config()

// Initialize Express app
const app: Application = express()

// Setup middleware
setupMiddleware(app)

// Connect to MongoDB
connectDB()

// Root Route
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Server is up and running!',
    status: 'Test Successful',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    endpoints: {
      health: '/health',
      api: '/api',
    },
    timestamp: new Date().toISOString(),
  })
})

// API Routes
app.use('/api', routes)

// Health Check
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

// Favicon Handler (prevent 404 errors)
app.get('/favicon.ico', (_req, res) => res.status(204).end())

// 404 Handler
app.use(notFound)

// Error Handler
app.use(errorHandler)

// Start Server
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Rejection:', err.message)
  server.close(() => process.exit(1))
})

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('❌ Uncaught Exception:', err.message)
  process.exit(1)
})

export default app
