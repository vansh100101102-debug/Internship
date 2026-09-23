import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import "dotenv/config"
import transporter from "../config/nodemailer.js"

export const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.json({ success: false, message: 'Missing Details' })
  }

  try {
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const isAdmin = email === 'vansh100101102@gmail.com'
    const user = new userModel({ name, email, password: hashedPassword, isAdmin })

    // Generate OTP before saving
    const otp = String(Math.floor(100000 + Math.random() * 900000))
    user.verifyOtp = otp
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000
    await user.save()

    // Send OTP email (no cookie set — user must verify then login)
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verify your Zetawa account',
      text: `Welcome to Zetawa! Your verification OTP is ${otp}. Enter this OTP to verify your account.`
    }
    await transporter.sendMail(mailOptions)

    return res.json({ success: true, message: 'OTP sent to your email. Please verify your account.' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.json({ success: false, message: 'Email and password are required' })
  }
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "Invalid email" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid password' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    const ADMIN_EMAIL = 'vansh100101102@gmail.com'
    const isAdmin = Boolean(user.email === ADMIN_EMAIL)
    if (user.isAdmin !== isAdmin) {
      user.isAdmin = isAdmin
      await user.save()
    }

    return res.json({
      success: true,
      token,
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

export const logout = async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      expires: new Date(0),
      maxAge: 0,
    })
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    })
    return res.json({ success: true, message: "Logged Out" })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId || req.body?.userId
    const user = await userModel.findById(userId)
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already verified" })
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000))
    user.verifyOtp = otp
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

    await user.save()
    const mailOption = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Account verification otp',
      text: `Your OTP is ${otp}. Verify your account using this OTP`
    }
    await transporter.sendMail(mailOption)
    res.json({ success: true, message: 'Verification OTP sent on the Email' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body
  if (!email || !otp) {
    return res.json({ success: false, message: 'Missing Details' })
  }
  try {
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }
    if (user.verifyOtp === '' || user.verifyOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' })
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' })
    }
    user.isAccountVerified = true
    user.verifyOtp = ''
    user.verifyOtpExpireAt = 0
    await user.save()

    // Auto-login: set JWT cookie after verification
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    // Send welcome email after successful verification
    const welcomeMail = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Welcome to Zetawa Dark Privated Limited',
      text: `Welcome to Zetawa! Your account has been verified successfully. Your account is now fully active with email: ${user.email}`
    }
    await transporter.sendMail(welcomeMail)

    return res.json({ success: true, message: 'Email verified successfully' })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

export const sendResetOtp = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.json({ success: false, message: "Email is required" })
  }
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000))
    user.resetOtp = otp
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000
    await user.save()
    const mailOption = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`
    }
    await transporter.sendMail(mailOption)

    return res.json({ success: true, message: 'OTP sent to your email' })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "Email, Otp and new password are required" })
  }

  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }
    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' })
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' })
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword
    user.resetOtp = ''
    user.resetOtpExpireAt = 0
    await user.save()

    // Auto-login: set JWT cookie after password reset
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.json({ success: true, message: 'Password has been reset successfully' })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
