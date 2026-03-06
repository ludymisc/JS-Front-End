import { useContext } from "react"
import { AuthContext } from "./auth.context"
import { Navigate } from "react-router-dom"
import Loading from "../loading"

export default function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useContext(AuthContext)

  if (loading) {
    return <Loading text="Checking access..." />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}