import { z } from 'zod'

export const createTodoSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }).min(3).max(255),
  description: z.string({
    required_error: 'Description is required'
  }).min(1).max(255),
  date: z.string({
    required_error: 'Date is required'
  }).datetime({
    message: 'Date is invalid'
  }).optional()
})
