'use client'
import HomePage from '@/_components/HomePage.jsx'
import ProtectedRoute from '@/_components/ProtectedRoute.jsx'

export default function HomePageRoute() {
    return (
        <ProtectedRoute>
            <HomePage />
        </ProtectedRoute>
    )
}