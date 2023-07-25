import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import todosRoutes from './routes/todo.routes.js'

const server = express()

server.use(cors({
  origin: '*',
  credentials: true
}))
server.use(express.json())
server.use(morgan('dev'))
// server.use(cookieParser())
server.use('/api', authRoutes)
server.use('/api', todosRoutes)

const path = await import('path')
server.use(express.static('client/dist'))

server.get('*', (_, res) => {
  console.log(path.resolve('client', 'dist', 'index.html'))
  res.sendFile(path.resolve('client', 'dist', 'index.html'))
})

export default server
