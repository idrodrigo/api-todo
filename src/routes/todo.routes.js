import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
  getUserTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todo.controller.js'
import { createTodoSchema } from '../schemas/todo.schema.js'
import { valideSchema } from '../middlewares/validator.middleware.js'

const router = Router()

router.get('/todos', authRequired, getUserTodos)
router.get('/todos/:id', authRequired, getTodo)
router.post('/todos', authRequired, valideSchema(createTodoSchema), createTodo)
router.put('/todos/:id', authRequired, updateTodo)
router.delete('/todos/:id', authRequired, deleteTodo)

export default router
