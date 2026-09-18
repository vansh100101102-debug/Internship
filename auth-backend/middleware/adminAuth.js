import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const adminAuth = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" })
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
    if (!tokenDecode.id) {
      return res.json({ success: false, message: "Not Authorized, Login Again" })
    }

    const user = await userModel.findById(tokenDecode.id)
    if (!user || !user.isAdmin) {
      return res.json({ success: false, message: "Admin access only" })
    }

    req.userId = user._id
    if (!req.body) req.body = {}
    req.body.userId = user._id
    next()
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export default adminAuth
