import { useEffect, useState } from 'react';
import { authAPI } from '../api/api'



export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
    useEffect(() => {
      const checkAuth = async () => {
        try {
          // Try to get current user from backend
          const response = await authAPI.getCurrentUser()
          
          // Store user data with userId
          const userData = {
            userId: response.data.userId,
            email: response.data.email,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
          }
            
          setCurrentUser(userData)
        } catch (error) {
          // Not authenticated or error occurred
          setCurrentUser(null)
          console.error(error.message)
        } finally {
          setLoading(false)
        }
      }

      checkAuth()
    }, [])


  const logout = async () => {
    try {
      await authAPI.logout()
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}