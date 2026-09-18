import { useState } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { ShieldCheck, ArrowLeft, Mail } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import Nav from "./Nav"
import Footer from "./Footer"

const EmailVerify = () => {
  const [searchParams] = useSearchParams()
  const emailFromUrl = searchParams.get("email") || ""
  const [email, setEmail] = useState(emailFromUrl)
  const [otp, setOtp] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { verifyEmail } = useAppContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await verifyEmail(email, otp)
    setSubmitting(false)
    if (success) navigate("/")
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
        <form onSubmit={handleSubmit} style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          borderRadius: "16px",
          padding: "3rem 2.5rem",
          boxShadow: "0 20px 60px rgba(126,58,65,0.15)",
        }}>
          <Link to="/register" style={{
            color: "#7e3a41",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
          }}>
            <ArrowLeft size={16} /> Back to register
          </Link>

          <h1 style={{ color: "#2d2d2d", fontSize: "1.8rem", marginBottom: "0.25rem" }}>
            Email Verification
          </h1>
          <p style={{ color: "#777", marginBottom: "2rem" }}>
            Enter the 6-digit OTP sent to your email
          </p>

          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#4a4a4a", marginBottom: "0.5rem" }}>
            Email
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1.5px solid #e0d9db", borderRadius: "10px", padding: "0.8rem 1rem", marginBottom: "1.25rem" }}>
            <Mail size={18} color="#9a8f92" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              style={{ border: "none", outline: "none", flex: 1, fontSize: "1rem", background: "transparent", color: "#2d2d2d" }} />
          </div>

          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#4a4a4a", marginBottom: "0.5rem" }}>
            OTP Code
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1.5px solid #e0d9db", borderRadius: "10px", padding: "0.8rem 1rem", marginBottom: "1.5rem" }}>
            <ShieldCheck size={18} color="#9a8f92" />
            <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} placeholder="000000"
              style={{ border: "none", outline: "none", flex: 1, fontSize: "1.2rem", background: "transparent", color: "#2d2d2d", letterSpacing: "0.3em", textAlign: "center" }} />
          </div>

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
            <ShieldCheck size={18} />
            {submitting ? "Verifying..." : "Verify Email"}
          </button>

          <p style={{ textAlign: "center", color: "#777", marginTop: "1.5rem" }}>
            Already verified?{" "}
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

export default EmailVerify
