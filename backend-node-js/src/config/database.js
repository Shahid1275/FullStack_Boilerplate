import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === 'production' 
      ? process.env.MONGODB_URI_PROD 
      : process.env.MONGODB_URI

    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    const conn = await mongoose.connect(mongoURI, options)

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)

    // Handle mongoose connection events
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected')
    })

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err)
    })

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

export default connectDB
