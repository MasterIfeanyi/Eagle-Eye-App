import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '@/api/authAPI'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)


    const { setCurrentUser, setLoading, error, setError } = useAuth() // Get setCurrentUser from AuthContext
    
    const navigate = useNavigate() 


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address")
            return
        }

        try {
            
            setLoading(true);


            // Sign in with Firebase Authentication
            const response = await authAPI.login({ email, password })

            // Extract user data from response
            const { user } = response.data

            // Create secure user object for context with userId
            const userData = {
                userId: user.userId, // Unique identifier
                email: user.email,
            }


            // Update AuthContext with the new user
            setCurrentUser(userData)


            navigate('/home') // Redirect to home page after successful login


        } catch (error) {
           // Handle different error scenarios
            if (error.response) {
                // Server responded with error status
                const { status, data } = error.response

                switch (status) {
                    case 400:
                        setError(data.message || 'Invalid email or password')
                        break
                    case 404:
                        setError('User not found')
                        break
                    case 409:
                        setError(data.message || 'Conflict error')
                        break
                    case 500:
                        setError('Server error. Please try again later.')
                        break
                    default:
                        setError(data.message || 'Failed to sign in')
                }
            } else if (error.request) {
                // Request made but no response received
                setError('Unable to connect to server. Please check your internet connection.')
            } else {
                // Something else happened
                setError('An unexpected error occurred. Please try again.')
            }
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        } 
    }

return (
    <div className='login'>
    
        <div className="section-title">
            <h2 className="fw-bold mb-1">Welcome back</h2>
            <p className="text-muted mb-4">Enter your credentials to continue</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className='row g-3 px-3'>

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


            <div className="col-12 d-flex justify-content-center">
                <button type="submit" className="button btn-brand">Log in</button>
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