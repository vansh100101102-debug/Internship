import jwt from "jsonwebtoken"

const userAuth = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.replace(/^Bearer\s+/i, '') || req.headers?.token
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" })
  }


  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
    if (!tokenDecode.id) {
      return res.json({ success: false, message: "Not Authorized, Login Again" })
    }
    req.userId = tokenDecode.id
    if (!req.body) req.body = {}
    req.body.userId = tokenDecode.id
    next()
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export default userAuth
