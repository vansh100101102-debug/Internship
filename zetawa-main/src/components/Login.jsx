import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, LogIn, ArrowLeft } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import Nav from "./Nav"
import Footer from "./Footer"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAppContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await login(email, password)
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
          <Link to="/" style={{
            color: "#7e3a41",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
          }}>
            <ArrowLeft size={16} /> Back to home
          </Link>

          <h1 style={{ color: "#2d2d2d", fontSize: "1.8rem", marginBottom: "0.25rem" }}>
            Welcome back
          </h1>
          <p style={{ color: "#777", marginBottom: "2rem" }}>
            Sign in to your Zetawa Dark account
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
            Password
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1.5px solid #e0d9db", borderRadius: "10px", padding: "0.8rem 1rem", marginBottom: "1.5rem" }}>
            <Lock size={18} color="#9a8f92" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              style={{ border: "none", outline: "none", flex: 1, fontSize: "1rem", background: "transparent", color: "#2d2d2d" }} />
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
            <LogIn size={18} />
            {submitting ? "Signing in..." : "Sign In"}
          </button>

          <p style={{ textAlign: "center", color: "#777", marginTop: "1.5rem" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#7e3a41", fontWeight: 600, textDecoration: "none" }}>
              Sign up
            </Link>
          </p>
          <p style={{ textAlign: "center", color: "#777", marginTop: "0.5rem" }}>
            <Link to="/reset-password" style={{ color: "#7e3a41", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}>
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login
