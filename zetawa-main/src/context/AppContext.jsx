import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const AppContext = createContext()

axios.defaults.withCredentials = true

const API_URL = ""

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("zetawa_user")
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [isAuth, setIsAuth] = useState(() => {
    return !!localStorage.getItem("zetawa_user")
  })
  const [loading, setLoading] = useState(true)

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/user/data`)
      if (data.success && data.userData) {
        setUser(data.userData)
        setIsAuth(true)
        localStorage.setItem("zetawa_user", JSON.stringify(data.userData))
        return true
      } else {
        setUser(null)
        setIsAuth(false)
        localStorage.removeItem("zetawa_user")
        return false
      }
    } catch {
      setUser(null)
      setIsAuth(false)
      localStorage.removeItem("zetawa_user")
      return false
    }
  }

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      })
      if (data.success) {
        toast.success("Logged in successfully")
        if (data.userData) {
          setUser(data.userData)
          setIsAuth(true)
          localStorage.setItem("zetawa_user", JSON.stringify(data.userData))
        }
        // Removed redundant getUserData call
        return true
      } else {
        toast.error(data.message || "Invalid credentials")
        return false
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      return false
    }
  }

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      })
      if (data.success) {
        toast.success(data.message || "OTP sent to your email")
        return true
      } else {
        toast.error(data.message)
        return false
      }
    } catch (error) {
      toast.error(error.message)
      return false
    }
  }

  const logout = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/logout`)
      if (data.success) {
        toast.success("Logged out")
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setUser(null)
      setIsAuth(false)
      localStorage.removeItem("zetawa_user")
    }
  }

  const sendVerifyOtp = async () => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/send-verify-otp`
      )
      if (data.success) {
        toast.success("OTP sent to your email")
        return true
      } else {
        toast.error(data.message)
        return false
      }
    } catch (error) {
      toast.error(error.message)
      return false
    }
  }

  const verifyEmail = async (email, otp) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/verify-account`,
        { email, otp }
      )
      if (data.success) {
        toast.success("Email verified successfully!")
        await getUserData()
        return true
      } else {
        toast.error(data.message)
        return false
      }
    } catch (error) {
      toast.error(error.message)
      return false
    }
  }

  const sendResetOtp = async (email) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/send-reset-otp`,
        { email }
      )
      if (data.success) {
        toast.success("OTP sent to your email")
        return true
      } else {
        toast.error(data.message)
        return false
      }
    } catch (error) {
      toast.error(error.message)
      return false
    }
  }

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/reset-password`,
        { email, otp, newPassword }
      )
      if (data.success) {
        toast.success("Password reset successfully")
        await getUserData()
        return true
      } else {
        toast.error(data.message)
        return false
      }
    } catch (error) {
      toast.error(error.message)
      return false
    }
  }

  useEffect(() => {
    const init = async () => {
      try {
        await getUserData()
      } catch {
        // not logged in
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        isAuth,
        isAdmin: user?.isAdmin || false,
        loading,
        login,
        register,
        logout,
        getUserData,
        sendVerifyOtp,
        verifyEmail,
        sendResetOtp,
        resetPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
