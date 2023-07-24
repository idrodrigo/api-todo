import { Router } from 'express'
import { register, login, logout, profile, verifyToken } from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { valideSchema } from '../middlewares/validator.middleware.js'
import { authSchema, loginSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/register', valideSchema(authSchema), register)
router.post('/login', valideSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)
router.get('/verify', verifyToken)

export default router
