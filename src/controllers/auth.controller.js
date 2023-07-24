import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createdAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body
    console.log(email, password, username)
    const userFound = await User.findOne({ email })
    if (userFound) {
      return res
        .status(400)
        .json({ message: 'The email is already in use' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      password: passwordHash,
      username
    })

    const userSaved = await newUser.save()

    const token = await createdAccessToken({
      id: userSaved._id
    })
    res.cookie('token', token, {
      // httpOnly: process.env.NODE_ENV !== 'development',
      // secure: true,
      // sameSite: 'none',
      // maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const login = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)

  try {
    const userFound = await User.findOne({ email })

    if (!userFound) return res.status(400).json({ message: 'User not found' })

    const isPassword = await bcrypt.compare(password, userFound.password)

    if (!isPassword) return res.status(400).json({ message: 'Incorrect password' })

    const token = await createdAccessToken({
      id: userFound._id
    })
    res.cookie('token', token, {
      // httpOnly: process.env.NODE_ENV !== 'development',
      // secure: true,
      // sameSite: 'none',
      // maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0)
  })
  res.json({ message: 'Logout' })
}
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)
  if (!userFound) return res.status(400).json({ message: 'User not found' })
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  })
}
export const verifyToken = async (req, res) => {
  // console.log(req.headers.cookie?.split('=')[1])
  const token = req.headers.cookie?.split('=')[1]

  if (!token) return res.send(false)

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(401)

    const userFound = await User.findById(user.id)
    if (!userFound) return res.sendStatus(401)

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  })
}
