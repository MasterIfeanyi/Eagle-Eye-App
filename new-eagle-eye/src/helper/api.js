const BASE_URL = '/api'

export const authAPI = {
    signup: async (userData) => {
        const response = await fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Signup failed')
        }

        return data
    },

    login: async (credentials) => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Login failed')
        }

        return data
    },

    logout: async () => {
        const response = await fetch(`${BASE_URL}/auth/logout`, {
            method: 'POST'
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Logout failed')
        }

        return data
    },

    getCurrentUser: async () => {
        const response = await fetch(`${BASE_URL}/auth/me`)

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Not authenticated')
        }

        return data
    }
}

export const createReport = async (reportData) => {
    const response = await fetch(`${BASE_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Failed to create report')
    }

    return data
}