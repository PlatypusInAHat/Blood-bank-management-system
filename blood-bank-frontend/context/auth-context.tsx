"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { API } from "@/lib/api"
import axios from "axios"

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await API.auth.login(email, password)
      
      if (response.data.token && response.data.user) {
        const userData: User = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
        }
        setUser(userData)
        
        // Store token in both localStorage and cookie
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(userData))
        
        // Set cookie for middleware to read
        document.cookie = `token=${response.data.token}; path=/; max-age=${60 * 60 * 24}`
        
        setIsLoading(false)
        return true
      }
      setIsLoading(false)
      return false
    } catch (error) {
      console.error("Login failed:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    // Clear cookie
    document.cookie = "token=; path=/; max-age=0"
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

