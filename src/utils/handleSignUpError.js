import toast from "react-hot-toast"

export function handleSignupError(error, { setFieldError }) {

    const loadingToast = toast.loading('Creating your account...')

    // Dismiss loading toast
    toast.dismiss(loadingToast)


    if (error.response) {
        const { status, data } = error.response

        switch (status) {
            case 400:
                if (data.field) {
                    setFieldError(data.field, data.message)
                    toast.error('Please check your input')
                } else {
                    toast.error('Invalid input. Please check your details.')
                }
                break
            case 409: {
                const message = data.message || 'An account with this email or phone number already exists'
                if (message.toLowerCase().includes('email')) {
                    setFieldError('email', 'This email is already registered')
                    toast.error('This email is already registered')
                } else if (message.toLowerCase().includes('phone')) {
                    setFieldError('phoneNumber', 'This phone number is already registered')
                    toast.error('This phone number is already registered')
                } else {
                    toast.error(message)
                }
                break
            }
            case 500:
                toast.error('Server error. Please try again later.')
                break
            default:
                toast.error('Failed to create account')
        }
    } else if (error.request) {
        toast.error('Unable to connect to server. Please check your internet connection.')
    } else {
        toast.error('An unexpected error occurred. Please try again.')
    }
}