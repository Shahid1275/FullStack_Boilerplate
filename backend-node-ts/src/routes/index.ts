import { Router } from 'express'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'

const router = Router()

// API Routes
router.use('/auth', authRoutes)
router.use('/users', userRoutes)

// API Info
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
    },
  })
})

export default router
