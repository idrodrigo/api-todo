// i2KpACPmpKYaQFss
import mongoose from 'mongoose'
import { MONGOOSEDB_URI } from './config.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGOOSEDB_URI)
    console.log('✔ DB Connected')
  } catch (error) {
    console.log('❌ DB Connection Error', error)
  }
}
