import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const ADMIN_EMAIL = 'vansh100101102@gmail.com'

const adminAuth = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.replace(/^Bearer\s+/i, '') || req.headers?.token
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" })
  }


  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
    if (!tokenDecode.id) {
      return res.json({ success: false, message: "Not Authorized, Login Again" })
    }

    const user = await userModel.findById(tokenDecode.id)
    const isAdmin = Boolean(user && (user.isAdmin || user.email === ADMIN_EMAIL))
    if (!user || !isAdmin) {
      return res.json({ success: false, message: "Admin access only" })
    }

    if (user.email === ADMIN_EMAIL && !user.isAdmin) {
      user.isAdmin = true
      await user.save()
    }

    req.user = user
    req.userId = user._id
    if (!req.body) req.body = {}
    req.body.userId = user._id
    next()
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export default adminAuth

