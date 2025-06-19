"use client"

import { useState, useEffect } from "react"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isAuthenticated: boolean
}

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Simulate auth check
    setTimeout(() => {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      }
      setLoading(false)
    }, 1000)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate login API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const userData: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        isAuthenticated: true,
      }

      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Login failed" }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const register = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      // Simulate registration API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const userData: User = {
        id: Date.now().toString(),
        email,
        name,
        isAuthenticated: true,
      }

      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
  }
}
