import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, KeyRound, ArrowLeft } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import Nav from "./Nav"
import Footer from "./Footer"

const ResetPassword = () => {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const { sendResetOtp, resetPassword } = useAppContext()
  const navigate = useNavigate()

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const sent = await sendResetOtp(email)
    setSubmitting(false)
    if (sent) setStep(2)
  }

  const handleReset = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await resetPassword(email, otp, newPassword)
    setSubmitting(false)
    if (success) navigate("/")
  }

  const fieldStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    border: "1.5px solid #e0d9db",
    borderRadius: "10px",
    padding: "0.8rem 1rem",
    marginBottom: "1.25rem",
  }

  const inputStyle = {
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: "1rem",
    background: "transparent",
    color: "#2d2d2d",
  }

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#4a4a4a",
    marginBottom: "0.5rem",
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f2f3" }}>
      <Nav />
      <div style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
      }}>
        <form onSubmit={step === 1 ? handleSendOtp : handleReset} style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          borderRadius: "16px",
          padding: "3rem 2.5rem",
          boxShadow: "0 20px 60px rgba(126,58,65,0.15)",
        }}>
          <Link to="/login" style={{
            color: "#7e3a41",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
          }}>
            <ArrowLeft size={16} /> Back to login
          </Link>

          <h1 style={{ color: "#2d2d2d", fontSize: "1.8rem", marginBottom: "0.25rem" }}>
            {step === 1 ? "Reset Password" : "Enter OTP & New Password"}
          </h1>
          <p style={{ color: "#777", marginBottom: "2rem" }}>
            {step === 1 ? "Enter your email to receive OTP" : "Enter the OTP and your new password"}
          </p>

          {step === 1 ? (
            <>
              <label style={labelStyle}>Email</label>
              <div style={{ ...fieldStyle, marginBottom: "1.5rem" }}>
                <Mail size={18} color="#9a8f92" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
              </div>
            </>
          ) : (
            <>
              <label style={labelStyle}>OTP Code</label>
              <div style={fieldStyle}>
                <KeyRound size={18} color="#9a8f92" />
                <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} placeholder="000000"
                  style={{ ...inputStyle, letterSpacing: "0.3em", textAlign: "center" }} />
              </div>
              <label style={labelStyle}>New Password</label>
              <div style={{ ...fieldStyle, marginBottom: "1.5rem" }}>
                <Lock size={18} color="#9a8f92" />
                <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 6 characters" style={inputStyle} />
              </div>
            </>
          )}

          <button type="submit" disabled={submitting} style={{
            width: "100%",
            background: "linear-gradient(135deg, #7e3a41 0%, #6a3139 100%)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "0.9rem",
            fontSize: "1.05rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            opacity: submitting ? 0.7 : 1,
          }}>
            <KeyRound size={18} />
            {submitting ? "Processing..." : step === 1 ? "Send OTP" : "Reset Password"}
          </button>

          <p style={{ textAlign: "center", color: "#777", marginTop: "1.5rem" }}>
            Remember your password?{" "}
            <Link to="/login" style={{ color: "#7e3a41", fontWeight: 600, textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default ResetPassword
