'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Check if user is logged in when app loads
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/me')

                if (response.ok) {
                    const user = await response.json()
                    setCurrentUser(user)
                } else {
                    setCurrentUser(null)
                }
            } catch (error) {
                setCurrentUser(null)
                console.error('Auth check error:', error)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            setCurrentUser(null)
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    const value = {
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}