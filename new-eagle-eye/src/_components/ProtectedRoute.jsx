'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !currentUser) {
            router.push('/login')
        }
    }, [currentUser, loading, router])

    if (loading) {
        return <div className='mexican-wave'></div>
    }

    if (!currentUser) {
        return null
    }

    return children
}

export default ProtectedRoute