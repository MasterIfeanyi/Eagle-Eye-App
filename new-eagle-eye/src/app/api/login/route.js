import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request) {
    try {
        await connectDB()

        const { email, password } = await request.json()

        // Check if all fields are provided
        if (!email || !password) {
            return Response.json(
                { message: 'Email and password are required' },
                { status: 400 }
            )
        }

        // Find user by email
        const user = await User.findOne({ email })

        if (!user) {
            return Response.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            )
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return Response.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            )
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        // Send back response
        const response = Response.json({
            message: 'Login successful',
            data: {
                user: {
                    userId: user._id,
                    email: user.email,
                    username: user.username,
                }
            }
        }, { status: 200 })

        // Store token in a cookie
        response.headers.set(
            'Set-Cookie',
            `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`
        )

        return response

    } catch (error) {
        console.error('Login error:', error)
        return Response.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}