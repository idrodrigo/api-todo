import server from './app.js'
import { connectDB } from './db.js'

const PORT = process.env.PORT || 3000
connectDB()
server.listen(PORT)
console.log('Server on port', PORT)
