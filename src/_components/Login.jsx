import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

// refactor
import { authAPI } from '@/api/api.js'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { loginValidationSchema } from '../validations/authSchemas'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)


    const { setCurrentUser, setLoading } = useAuth() // Get setCurrentUser from AuthContext
    const navigate = useNavigate() 
    

    // Formik configuration
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,


        onSubmit: async (values, {setSubmitting}) => {
            // Show loading toast
            const loadingToast = toast.loading('Signing you in...')

            try {
                setLoading(true)

                // Make API request to backend
                const response = await authAPI.login({
                    email: values.email.trim().toLowerCase(),
                    password: values.password
                })

                // Dismiss loading toast and show success
                toast.dismiss(loadingToast)
                toast.success(`Welcome back, ${user.firstname}!`)


                // Navigate to home page
                navigate('/home')
            } catch (error) {

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
                            className="form-control border-start-0"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    Don't have an account?
                    <Link to="/signup" className="ms-1 text-decoration-underline fw-medium cursor-pointer">
                        Sign up
                    </Link>
                </p>
            </footer>
        </div>
    )

}


export default Login