import server from './app.js'
import { connectDB } from './db.js'

const PORT = process.env.PORT || 0
connectDB()
server.listen(PORT)
console.log('Server on portt', PORT)
