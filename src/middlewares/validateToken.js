import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
  const token = req.headers.cookie?.split('=')[1]
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized, No Token'
    })
  }
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'invalid token'
      })
    }
    req.user = user
    next()
  })
}
