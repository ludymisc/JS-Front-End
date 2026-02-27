import { useContext } from "react"
import { AuthContext } from "../../backend/controller/auth.context.jsx"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const { isAdmin } = useContext(AuthContext)

  if (!isAdmin) {
    return <Navigate to="/" />
  }

  return children
}