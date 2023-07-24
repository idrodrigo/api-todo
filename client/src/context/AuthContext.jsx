import { createContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth.js'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authErrors, setAuthErrors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authErrors.length > 0) {
      const timer = setTimeout(() => {
        setAuthErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [authErrors])

  const signUp = async (user) => {
    try {
      const response = await registerRequest(user)
      console.log(response.data);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setAuthErrors(error.response.data.message)
    }
  }

  const signIn = async (user) => {
    try {
      const response = await loginRequest(user)
      console.log(response.data);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setAuthErrors([error.response])
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    Cookies.remove('token')
  }

  useEffect(() => {
    async function checkAuthenticated() {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return setUser(null)
      }
      try {
        const res = await verifyTokenRequest(cookies.token)
        if (!res.data) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }
        setIsAuthenticated(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
    }
    checkAuthenticated()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signUp,
      signIn,
      logout,
      loading,
      isAuthenticated,
      authErrors
    }}>
      {children}
    </AuthContext.Provider>
  )
}