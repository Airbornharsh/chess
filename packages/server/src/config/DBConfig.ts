import mongoose, { Error } from 'mongoose'

let conn: typeof mongoose

const connectDB = async () => {
  try {
    conn = await mongoose.connect(
      process.env.MONGO_URL || 'mongodb://localhost:27017/database',
    )

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error: Error | any | unknown) {
    console.error(`Error connecting to MongoDB: ${error.message}`)
    process.exit(1)
  } finally {
    return { conn }
  }
}

export default connectDB
export { conn as DB }
