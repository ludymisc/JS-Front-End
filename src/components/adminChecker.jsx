import { useContext } from "react"
import { AuthContext } from "./auth.context"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const { isAdmin } = useContext(AuthContext)

  console.log("ProtectedRoute isAdmin:", isAdmin)
  
  if (!isAdmin) {
      console.log("bukan admin")
      return <Navigate to="/" />
  }

  return children
}