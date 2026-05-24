'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { loginValidationSchema } from '@/validations/authSchemas'
import { authAPI } from '@/api/api'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { setCurrentUser, setLoading } = useAuth()
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,

        onSubmit: async (values, { setSubmitting }) => {
            const loadingToast = toast.loading('Signing you in...')
            try {
                setLoading(true)

                const response = await authAPI.login({
                    email: values.email.trim().toLowerCase(),
                    password: values.password
                })

                const { user } = response.data

                setCurrentUser(user)

                toast.dismiss(loadingToast)
                toast.success(`Welcome back, ${user.username}!`)

                router.push('/home')
            } catch (error) {
                toast.dismiss(loadingToast)
                toast.error('Invalid email or password')
                console.error(error)
            } finally {
                setLoading(false)
                setSubmitting(false)
            }
        }
    })

    const hasFieldError = (fieldName) => {
        return formik.touched[fieldName] && formik.errors[fieldName]
    }

    return (
        <div className='login'>
            <div className="section-title">
                <h2 className="fw-bold mb-1">Welcome back</h2>
                <p className="text-muted mb-4">Enter your credentials to continue</p>
            </div>

            <form onSubmit={formik.handleSubmit} className='row g-3 px-3'>
                {/* Email Field */}
                <div>
                    <div className="input-group custom-input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                            type="email"
                            name="email"
                            className="form-control border-start-0"
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

                {/* Password Field */}
                <div>
                    <div className="input-group custom-input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="form-control border-start-0 border-end-0"
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

                <div className="col-12 d-flex justify-content-center">
                    <button
                        type="submit"
                        className="button btn-brand"
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        {formik.isSubmitting ? 'Logging in...' : 'Log in'}
                    </button>
                </div>
            </form>

            <footer className="text-center mt-auto">
                <p className="text-muted">
                    Do not have an account?
                    <Link href="/signup" className="ms-1 text-decoration-underline fw-medium cursor-pointer">
                        Sign up
                    </Link>
                </p>
            </footer>
        </div>
    )
}

export default Login