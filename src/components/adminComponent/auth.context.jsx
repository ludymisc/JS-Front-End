import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("isAdmin")
    if (stored === "true") {
      setIsAdmin(true)
    }
    setLoading(false)
  }, [])

  const login = () => {
    setIsAdmin(true)
    localStorage.setItem("isAdmin", "true")
  }

  const logout = () => {
    setIsAdmin(false)
    localStorage.removeItem("isAdmin")
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}