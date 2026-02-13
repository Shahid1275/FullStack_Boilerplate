import { Router } from 'express'
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateProfile,
} from '../controllers/userController'
import { protect, authorize } from '../middleware/authMiddleware'
import { validators, validate } from '../middleware/validationMiddleware'

const router = Router()

// All routes are protected
router.use(protect)

// User's own profile
router.put('/profile', updateProfile)

// Admin only routes
router.get('/', authorize('admin'), validators.pagination, validate, getUsers)
router.get('/:id', validators.mongoId, validate, getUser)
router.put('/:id', authorize('admin'), validators.mongoId, validate, updateUser)
router.delete('/:id', authorize('admin'), validators.mongoId, validate, deleteUser)

export default router
