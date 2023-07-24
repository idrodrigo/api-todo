import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import todosRoutes from './routes/todo.routes.js'

const server = express()

server.use(cors({
  origin: 'https://todo-node-vnbn.vercel.app',
  credentials: true
}))
server.use(express.json())
server.use(morgan('dev'))
// server.use(cookieParser())
server.use('/api', authRoutes)
server.use('/api', todosRoutes)

export default server
