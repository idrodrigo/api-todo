import server from './src/app.js'
import { connectDB } from './src/db.js'

const PORT = process.env.PORT || 3000
connectDB()
server.listen(PORT)
console.log('Server on portt', PORT)
