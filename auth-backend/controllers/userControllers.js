import userModel from "../models/userModel.js"

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId || req.body?.userId

    const user = await userModel.findById(userId)
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    const ADMIN_EMAIL = 'vansh100101102@gmail.com'
    const isAdmin = Boolean(user.email === ADMIN_EMAIL)
    if (user.isAdmin !== isAdmin) {
      user.isAdmin = isAdmin
      await user.save()
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
        isAdmin: isAdmin,
      }
    })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
