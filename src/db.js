// i2KpACPmpKYaQFss
import mongoose from 'mongoose'

const PASSWORD = 'i2KpACPmpKYaQFss'
const MONGOOSEDB_URI = `mongodb+srv://idrodrigo:${PASSWORD}@todo.4kf1rcq.mongodb.net/?retryWrites=true&w=majority`

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGOOSEDB_URI)
    console.log('✔ DB Connected')
  } catch (error) {
    console.log('❌ DB Connection Error', error)
  }
}
