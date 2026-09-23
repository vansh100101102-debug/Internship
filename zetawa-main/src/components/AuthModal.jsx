import { useState, useEffect, useRef } from "react"
import { X, Mail, Lock, User as UserIcon, LogIn, UserPlus, ArrowLeft, KeyRound, ShieldCheck } from "lucide-react"
import { useAppContext } from "../context/AppContext"

const VIEWS = { LOGIN: "login", SIGNUP: "signup", OTP: "otp", FORGOT: "forgot", RESET_OTP: "reset_otp", NEW_PASSWORD: "new_password" }

const AuthModal = ({ isOpen, onClose, onSuccess, initialView = "login" }) => {
  const [view, setView] = useState(initialView)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const overlayRef = useRef(null)
  const { login, register, verifyEmail, sendResetOtp, resetPassword } = useAppContext()

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setView(initialView)
      setEmail("")
      setPassword("")
      setName("")
      setOtp("")
      setNewPassword("")
      setSubmitting(false)
    }
  }, [isOpen, initialView])

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape" && isOpen) onClose() }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await login(email, password)
    setSubmitting(false)
    if (success) {
      onClose()
      if (onSuccess) onSuccess()
    }
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await register(name, email, password)
    setSubmitting(false)
    if (success) {
      setView(VIEWS.OTP)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await verifyEmail(email, otp)
    setSubmitting(false)
    if (success) {
      onClose()
      if (onSuccess) onSuccess()
    }
  }

  const handleForgotSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await sendResetOtp(email)
    setSubmitting(false)
    if (success) {
      setView(VIEWS.RESET_OTP)
    }
  }

  const handleResetOtpSubmit = async (e) => {
    e.preventDefault()
    setView(VIEWS.NEW_PASSWORD)
  }

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await resetPassword(email, otp, newPassword)
    setSubmitting(false)
    if (success) {
      setView(VIEWS.LOGIN)
      setOtp("")
      setNewPassword("")
    }
  }

  if (!isOpen) return null

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      zIndex: 5000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      animation: "authFadeIn 0.25s ease",
    },
    card: {
      width: "100%",
      maxWidth: "440px",
      background: "white",
      borderRadius: "20px",
      padding: "2.5rem 2.25rem",
      boxShadow: "0 25px 80px rgba(126,58,65,0.25)",
      position: "relative",
      animation: "authSlideUp 0.3s ease",
      maxHeight: "90vh",
      overflowY: "auto",
      margin: "1rem",
    },
    closeBtn: {
      position: "absolute",
      top: "1.25rem",
      right: "1.25rem",
      background: "rgba(126,58,65,0.08)",
      border: "none",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "#7e3a41",
      transition: "all 0.2s ease",
    },
    title: {
      fontSize: "1.65rem",
      fontWeight: 700,
      color: "#2d2d2d",
      marginBottom: "0.3rem",
    },
    subtitle: {
      color: "#888",
      fontSize: "0.95rem",
      marginBottom: "1.75rem",
    },
    label: {
      display: "block",
      fontSize: "0.85rem",
      fontWeight: 600,
      color: "#4a4a4a",
      marginBottom: "0.4rem",
    },
    fieldWrap: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      border: "1.5px solid #e0d9db",
      borderRadius: "10px",
      padding: "0.75rem 1rem",
      marginBottom: "1.1rem",
      transition: "border-color 0.2s ease",
    },
    input: {
      border: "none",
      outline: "none",
      flex: 1,
      fontSize: "1rem",
      background: "transparent",
      color: "#2d2d2d",
      fontFamily: "inherit",
    },
    submitBtn: {
      width: "100%",
      background: "linear-gradient(135deg, #7e3a41 0%, #6a3139 100%)",
      color: "white",
      border: "none",
      borderRadius: "10px",
      padding: "0.85rem",
      fontSize: "1.05rem",
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      transition: "opacity 0.2s ease, transform 0.15s ease",
      marginTop: "0.5rem",
    },
    footerText: {
      textAlign: "center",
      color: "#888",
      fontSize: "0.9rem",
      marginTop: "1.5rem",
    },
    link: {
      color: "#7e3a41",
      fontWeight: 600,
      cursor: "pointer",
      textDecoration: "none",
      background: "none",
      border: "none",
      fontSize: "inherit",
      fontFamily: "inherit",
      padding: 0,
    },
    backBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      color: "#7e3a41",
      fontSize: "0.85rem",
      fontWeight: 500,
      cursor: "pointer",
      background: "none",
      border: "none",
      marginBottom: "1.25rem",
      fontFamily: "inherit",
      padding: 0,
    },
  }

  const renderLogin = () => (
    <form onSubmit={handleLoginSubmit}>
      <h2 style={styles.title}>Welcome back</h2>
      <p style={styles.subtitle}>Sign in to your Zetawa Dark account</p>

      <label style={styles.label}>Email</label>
      <div style={styles.fieldWrap}>
        <Mail size={18} color="#9a8f92" />
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={styles.input} />
      </div>

      <label style={styles.label}>Password</label>
      <div style={styles.fieldWrap}>
        <Lock size={18} color="#9a8f92" />
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={styles.input} />
      </div>

      <div style={{ textAlign: "right", marginBottom: "0.75rem" }}>
        <button type="button" onClick={() => { setView(VIEWS.FORGOT); setOtp(""); setNewPassword("") }} style={{ ...styles.link, fontSize: "0.85rem" }}>
          Forgot Password?
        </button>
      </div>

      <button type="submit" disabled={submitting} style={{ ...styles.submitBtn, opacity: submitting ? 0.7 : 1 }}>
        <LogIn size={18} />
        {submitting ? "Signing in…" : "Sign In"}
      </button>

      <p style={styles.footerText}>
        Don't have an account?{" "}
        <button type="button" onClick={() => setView(VIEWS.SIGNUP)} style={styles.link}>Sign up</button>
      </p>
    </form>
  )

  const renderSignup = () => (
    <form onSubmit={handleSignupSubmit}>
      <h2 style={styles.title}>Create account</h2>
      <p style={styles.subtitle}>OTP will be sent to verify your email</p>

      <label style={styles.label}>Name</label>
      <div style={styles.fieldWrap}>
        <UserIcon size={18} color="#9a8f92" />
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" style={styles.input} />
      </div>

      <label style={styles.label}>Email</label>
      <div style={styles.fieldWrap}>
        <Mail size={18} color="#9a8f92" />
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={styles.input} />
      </div>

      <label style={styles.label}>Password</label>
      <div style={{ ...styles.fieldWrap, marginBottom: "1.5rem" }}>
        <Lock size={18} color="#9a8f92" />
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" style={styles.input} />
      </div>

      <button type="submit" disabled={submitting} style={{ ...styles.submitBtn, opacity: submitting ? 0.7 : 1 }}>
        <UserPlus size={18} />
        {submitting ? "Creating account…" : "Sign Up"}
      </button>

      <p style={styles.footerText}>
        Already have an account?{" "}
        <button type="button" onClick={() => setView(VIEWS.LOGIN)} style={styles.link}>Login</button>
      </p>
    </form>
  )

  const renderOtp = () => (
    <form onSubmit={handleOtpSubmit}>
      <button type="button" onClick={() => setView(VIEWS.SIGNUP)} style={styles.backBtn}>
        <ArrowLeft size={14} /> Back
      </button>
      <h2 style={styles.title}>Verify your email</h2>
      <p style={styles.subtitle}>Enter the 6-digit OTP sent to <strong>{email}</strong></p>

      <label style={styles.label}>Verification OTP</label>
      <div style={styles.fieldWrap}>
        <ShieldCheck size={18} color="#9a8f92" />
        <input
          type="text"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="123456"
          style={{ ...styles.input, letterSpacing: "0.3em", fontSize: "1.2rem", textAlign: "center" }}
          maxLength={6}
          inputMode="numeric"
        />
      </div>

      <button type="submit" disabled={submitting || otp.length !== 6} style={{ ...styles.submitBtn, opacity: submitting || otp.length !== 6 ? 0.7 : 1 }}>
        <ShieldCheck size={18} />
        {submitting ? "Verifying…" : "Verify Email"}
      </button>
    </form>
  )

  const renderForgot = () => (
    <form onSubmit={handleForgotSubmit}>
      <button type="button" onClick={() => setView(VIEWS.LOGIN)} style={styles.backBtn}>
        <ArrowLeft size={14} /> Back to Login
      </button>
      <h2 style={styles.title}>Forgot password?</h2>
      <p style={styles.subtitle}>Enter your email to receive a reset OTP</p>

      <label style={styles.label}>Email</label>
      <div style={styles.fieldWrap}>
        <Mail size={18} color="#9a8f92" />
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={styles.input} />
      </div>

      <button type="submit" disabled={submitting} style={{ ...styles.submitBtn, opacity: submitting ? 0.7 : 1 }}>
        <KeyRound size={18} />
        {submitting ? "Sending OTP…" : "Send Reset OTP"}
      </button>
    </form>
  )

  const renderResetOtp = () => (
    <form onSubmit={handleResetOtpSubmit}>
      <button type="button" onClick={() => setView(VIEWS.FORGOT)} style={styles.backBtn}>
        <ArrowLeft size={14} /> Back
      </button>
      <h2 style={styles.title}>Enter OTP</h2>
      <p style={styles.subtitle}>Enter the OTP sent to <strong>{email}</strong></p>

      <label style={styles.label}>OTP</label>
      <div style={styles.fieldWrap}>
        <ShieldCheck size={18} color="#9a8f92" />
        <input
          type="text"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="123456"
          style={{ ...styles.input, letterSpacing: "0.3em", fontSize: "1.2rem", textAlign: "center" }}
          maxLength={6}
          inputMode="numeric"
        />
      </div>

      <button type="submit" disabled={otp.length !== 6} style={{ ...styles.submitBtn, opacity: otp.length !== 6 ? 0.7 : 1 }}>
        Continue
      </button>
    </form>
  )

  const renderNewPassword = () => (
    <form onSubmit={handleNewPasswordSubmit}>
      <button type="button" onClick={() => setView(VIEWS.RESET_OTP)} style={styles.backBtn}>
        <ArrowLeft size={14} /> Back
      </button>
      <h2 style={styles.title}>Set new password</h2>
      <p style={styles.subtitle}>Choose a strong new password</p>

      <label style={styles.label}>New Password</label>
      <div style={{ ...styles.fieldWrap, marginBottom: "1.5rem" }}>
        <Lock size={18} color="#9a8f92" />
        <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 6 characters" style={styles.input} />
      </div>

      <button type="submit" disabled={submitting} style={{ ...styles.submitBtn, opacity: submitting ? 0.7 : 1 }}>
        <KeyRound size={18} />
        {submitting ? "Resetting…" : "Reset Password"}
      </button>
    </form>
  )

  return (
    <>
      <style>{`
        @keyframes authFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes authSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div ref={overlayRef} style={styles.overlay} onClick={handleOverlayClick}>
        <div style={styles.card}>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            onMouseOver={(e) => { e.currentTarget.style.background = "#7e3a41"; e.currentTarget.style.color = "white" }}
            onMouseOut={(e) => { e.currentTarget.style.background = "rgba(126,58,65,0.08)"; e.currentTarget.style.color = "#7e3a41" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {view === VIEWS.LOGIN && renderLogin()}
          {view === VIEWS.SIGNUP && renderSignup()}
          {view === VIEWS.OTP && renderOtp()}
          {view === VIEWS.FORGOT && renderForgot()}
          {view === VIEWS.RESET_OTP && renderResetOtp()}
          {view === VIEWS.NEW_PASSWORD && renderNewPassword()}
        </div>
      </div>
    </>
  )
}

export default AuthModal
