import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request) {
    try {
        await connectDB()

        const { username, email, password } = await request.json()

        // Check if all fields are provided
        if (!username || !email || !password) {
            return Response.json(
                { message: 'All fields are required' },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (existingUser) {
            return Response.json(
                { message: 'Email or username already exists' },
                { status: 409 }
            )
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })

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
            message: 'Account created successfully',
            data: {
                user: {
                    userId: user._id,
                    email: user.email,
                    username: user.username,
                }
            }
        }, { status: 201 })

        // Store token in a cookie
        response.headers.set(
            'Set-Cookie',
            `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`
        )

        return response

    } catch (error) {
        console.error('Signup error:', error)
        return Response.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}