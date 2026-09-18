import { Navigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useAppContext()

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f2f3",
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          border: "4px solid #e0d9db",
          borderTop: "4px solid #7e3a41",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
