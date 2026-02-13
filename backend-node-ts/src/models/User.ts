import mongoose, { Document, Schema, Model } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import crypto from 'crypto'
import config from '../config/config'

export interface IUserDocument extends Document {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  avatar?: string
  isEmailVerified: boolean
  resetPasswordToken?: string
  resetPasswordExpire?: Date
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  
  matchPassword(enteredPassword: string): Promise<boolean>
  getSignedJwtToken(): string
  getResetPasswordToken(): string
}

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: undefined,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    lastLogin: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function (): string {
  return jwt.sign({ id: this._id }, config.jwt.secret as string, {
    expiresIn: config.jwt.expire as string,
  } as jwt.SignOptions)
}

// Match user entered password to hashed password
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function (): string {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Set expire (10 minutes)
  this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000)

  return resetToken
}

const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema)

export default User
