import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
    try {
        const { fileBase64 } = await request.json()

        if (!fileBase64) {
            return Response.json(
                { message: 'No file provided' },
                { status: 400 }
            )
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(fileBase64, {
            folder: 'eagle-eye-reports',
        })

        return Response.json({
            url: result.secure_url,
            public_id: result.public_id
        })

    } catch (error) {
        console.error('Cloudinary upload error:', error)
        return Response.json(
            { message: 'Image upload failed' },
            { status: 500 }
        )
    }
}