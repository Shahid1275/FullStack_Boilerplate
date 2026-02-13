import { Router } from 'express'
import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'
import { validators, validate } from '../middleware/validationMiddleware.js'

const router = Router()

// Public Routes
router.post('/register', validators.register, validate, register)
router.post('/login', validators.login, validate, login)
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:resetToken', resetPassword)

// Protected Routes
router.get('/me', protect, getMe)
router.post('/logout', protect, logout)

export default router
