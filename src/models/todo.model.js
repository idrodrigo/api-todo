import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
},
{
  timestamps: true
})

export default mongoose.model('Todo', todoSchema)
