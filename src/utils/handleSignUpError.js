export function handleSignupError(error, { setFieldError, setApiError }) {
    if (error.response) {
        const { status, data } = error.response

        switch (status) {
            case 400:
                if (data.field) {
                    setFieldError(data.field, data.message)
                } else {
                    setApiError(data.message || 'Invalid input. Please check your details.')
                }
                break
            case 409: {
                const message = data.message || 'An account with this email or phone number already exists'
                if (message.toLowerCase().includes('email')) {
                    setFieldError('email', 'This email is already registered')
                } else if (message.toLowerCase().includes('phone')) {
                    setFieldError('phoneNumber', 'This phone number is already registered')
                } else {
                    setApiError(message)
                }
                break
            }
            case 500:
                setApiError('Server error. Please try again later.')
                break
            default:
                setApiError(data.message || 'Failed to create account')
        }
    } else if (error.request) {
        setApiError('Unable to connect to server. Please check your internet connection.')
    } else {
        setApiError('An unexpected error occurred. Please try again.')
    }
}