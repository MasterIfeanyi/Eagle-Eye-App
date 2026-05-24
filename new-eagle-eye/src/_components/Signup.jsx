'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useFormik } from 'formik'
import { signupValidationSchema } from '@/validations/authSchemas'
import { authAPI } from '@/helper/api'
import toast from 'react-hot-toast'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { setCurrentUser } = useAuth()
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: signupValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,

        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            const loadingToast = toast.loading('Creating your account...')
            try {
                const userData = {
                    username: values.username.trim(),
                    email: values.email.trim().toLowerCase(),
                    password: values.password,
                }

                const response = await authAPI.signup(userData)
                const { user } = response.data

                setCurrentUser({
                    userId: user.userId,
                    email: user.email,
                    username: user.username
                })

                toast.dismiss(loadingToast)
                toast.success(`Welcome, ${user.username}! Account created successfully.`)

                router.push('/home')
            } catch (error) {
                toast.dismiss(loadingToast)
                toast.error(error.response?.data?.message || 'Signup failed')
                console.error('Signup error:', error)
            } finally {
                setSubmitting(false)
            }
        }
    })

    const hasFieldError = (fieldName) => {
        return formik.touched[fieldName] && formik.errors[fieldName]
    }

    return (
        <div className='signup'>
            <div className="section-title">
                <h2 className="fw-bold mb-1">Create Account</h2>
                <p className="text-muted mb-4">Sign up to get started</p>
            </div>

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
                            className={`form-control border-start-0 ${hasFieldError('username') ? 'is-invalid' : ''}`}
                            placeholder="Enter your User Name"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {hasFieldError('username') && (
                        <div className="text-danger small mt-1">
                            {formik.errors.username}
                        </div>
                    )}
                </div>

                {/* Email */}
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
                <div>
                    <div className="input-group custom-input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className={`form-control border-start-0 border-end-0 ${hasFieldError('password') ? 'is-invalid' : ''}`}
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span
                            className="input-group-text bg-white border-start-0 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </span>
                    </div>
                    {hasFieldError('password') && (
                        <div className="text-danger small mt-1">
                            {formik.errors.password}
                        </div>
                    )}
                </div>

                {/* Confirm Password */}
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

                <div className="col-12 d-flex justify-content-center">
                    <button
                        type="submit"
                        className="button btn-brand"
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        {formik.isSubmitting ? 'Creating Account...' : 'Sign up'}
                    </button>
                </div>
            </form>

            <footer className="text-center mt-auto">
                <p className="text-muted">
                    Already have an account?
                    <Link href="/login" className="ms-1 text-decoration-underline fw-medium cursor-pointer">
                        Log In
                    </Link>
                </p>
            </footer>
        </div>
    )
}

export default Signup