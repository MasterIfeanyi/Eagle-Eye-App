import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faPhone } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { auth, createUserWithEmailAndPassword, updateProfile } from '../firebase/config';
import { useAuth } from '@/context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

import { useFormik } from 'formik'
import { signupValidationSchema } from '../validations/authSchemas'
import { authAPI } from '../api/api'


const Signup = () => {


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const [apiError, setApiError] = useState("")

    const { setCurrentUser } = useAuth() // Get setCurrentUser from AuthContext

    const navigate = useNavigate() 

    


    // Formik configuration
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: signupValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,

        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            setApiError('')

            try {
                // Prepare user data for backend
                const userData = {
                    username: values.username.trim(),
                    email: values.email.trim().toLowerCase(),
                    password: values.password,
                }

                // Make API request to backend
                const response = await authAPI.signup(userData)

                // Extract user data from response
                const { user } = response.data

                // Create user object for context
                const userContextData = {
                    userId: user.userId,
                    email: user.email
                }

                // Update AuthContext with the user data
                setCurrentUser(userContextData)

                // Navigate to home page
                navigate('/home')

            } catch (error) {
                // Handle different error scenarios
                if (error.response) {
                    const { status, data } = error.response

                    switch (status) {
                        case 400:
                            // Check if it's a field-specific error
                            if (data.field) {
                                setFieldError(data.field, data.message)
                            } else {
                                setApiError(data.message || 'Invalid input. Please check your details.')
                            }
                            break
                        case 409: {
                            // User already exists - set field-specific error if possible
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
                
                console.error('Signup error:', error)
            } finally {
                setSubmitting(false)
            }
        }

    })

    

 
    // Helper function to check if field has error
    const hasFieldError = (fieldName) => {
        return formik.touched[fieldName] && formik.errors[fieldName]
    }




  return (
    <div className='signup'>

        <div className="section-title">
            <h2 className="fw-bold mb-1">Create Account</h2>
            <p className="text-muted mb-4">Sign up to get started</p>
        </div>


        {error && <div className="alert alert-danger mx-3">{error}</div>}


        <form onSubmit={formik.handleSubmit} className='row g-3 px-3'>
            {/* Username */}
            <div>
                <div className="input-group custom-input-group">
                    <span className="input-group-text bg-white border-end-0">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                        type="text"
                        name="username"
                        className={`form-control border-start-0 ${hasFieldError('firstname') ? 'is-invalid' : ''}`}
                        placeholder="Enter your User Name"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {hasFieldError('username') && (
                    <div className="text-danger small mt-1">
                        {formik.errors.firstname}
                    </div>
                )}
            </div>
            
            {/* E-Mail */}
            <div>
                <div className="input-group custom-input-group">
                    <span className="input-group-text bg-white border-end-0">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                        type="email"
                        name="email"
                        className={`form-control border-start-0 ${hasFieldError('email') ? 'is-invalid' : ''}`}
                        placeholder="Enter your Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {hasFieldError('email') && (
                    <div className="text-danger small mt-1">
                        {formik.errors.email}
                    </div>
                )}
            </div>

            {/* Password */}
            <div className="input-group custom-input-group">
                <span className="input-group-text bg-white border-end-0">
                    <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control border-start-0 border-end-0"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span
                    className="input-group-text bg-white border-start-0 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </span>
            </div>

            <div>
                <div className="input-group custom-input-group">
                    <span className="input-group-text bg-white border-end-0">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className={`form-control border-start-0 border-end-0 ${hasFieldError('confirmPassword') ? 'is-invalid' : ''}`}
                        placeholder="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span
                        className="input-group-text bg-white border-start-0 cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </span>
                </div>
                {hasFieldError('confirmPassword') && (
                    <div className="text-danger small mt-1">
                        {formik.errors.confirmPassword}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="col-12 d-flex justify-content-center">
                <button 
                    type="submit" 
                    className="button btn-brand"
                    disabled={formik.isSubmitting || !formik.isValid}
                >
                    {formik.isSubmitting  ? 'Creating Account...' : 'Sign up'}
                </button>
            </div>
        </form>

        <footer className="text-center mt-auto">
            <p className="text-muted">
                Already have an account ?
                <Link to="/login" className="ms-1 text-decoration-underline fw-medium cursor-pointer">
                    Log In
                </Link>
            </p>
        </footer>
    </div>
  )

}

export default Signup