export async function POST() {
    try {
        const response = Response.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        )

        // Clear the token cookie
        response.headers.set(
            'Set-Cookie',
            `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
        )

        return response

    } catch (error) {
        console.error('Logout error:', error)
        return Response.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}