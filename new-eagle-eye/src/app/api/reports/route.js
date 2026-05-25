import connectDB from '@/lib/mongodb'
import Report from '@/models/Report'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request) {
    try {
        // Check if user is authenticated
        const cookieStore = await cookies()
        const token = cookieStore.get('token')

        if (!token) {
            return Response.json(
                { message: 'Not authenticated' },
                { status: 401 }
            )
        }

        // Verify token
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET)

        if (!decoded) {
            return Response.json(
                { message: 'Invalid token' },
                { status: 401 }
            )
        }

        await connectDB()

        const {
            title,
            description,
            location,
            date,
            anonymous,
            userId,
            imageUrl,
            createdAt
        } = await request.json()

        // Validate required fields
        if (!title || !description || !location || !date) {
            return Response.json(
                { message: 'Please fill in all required fields' },
                { status: 400 }
            )
        }

        // Create the report
        const report = await Report.create({
            title,
            description,
            location,
            date,
            anonymous,
            userId,
            imageUrl,
            createdAt
        })

        return Response.json({
            message: 'Report created successfully',
            data: { report }
        }, { status: 201 })

    } catch (error) {
        console.error('Create report error:', error)
        return Response.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')

        if (!token) {
            return Response.json(
                { message: 'Not authenticated' },
                { status: 401 }
            )
        }

        const decoded = jwt.verify(token.value, process.env.JWT_SECRET)

        if (!decoded) {
            return Response.json(
                { message: 'Invalid token' },
                { status: 401 }
            )
        }

        await connectDB()

        const reports = await Report.find({}).sort({ createdAt: -1 })

        return Response.json({
            data: { reports }
        }, { status: 200 })

    } catch (error) {
        console.error('Get reports error:', error)
        return Response.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}