import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function GET() {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')

        if (!token) {
            return Response.json(
                { message: 'Not authenticated' },
                { status: 401 }
            )
        }

        // Verify token
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET)

        await connectDB()

        // Find user
        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return Response.json(
                { message: 'User not found' },
                { status: 404 }
            )
        }

        return Response.json({
            userId: user._id,
            email: user.email,
            username: user.username,
        }, { status: 200 })

    } catch (error) {
        console.error('Auth check error:', error)
        return Response.json(
            { message: 'Not authenticated' },
            { status: 401 }
        )
    }
}