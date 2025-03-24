import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'

import { auth, signInWithEmailAndPassword } from '../firebase/config';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")


    const { setCurrentUser } = useAuth() // Get setCurrentUser from AuthContext
    
    const navigate = useNavigate() 


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        try {
            
            setLoading(true);


            // Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Update AuthContext with the new user
            setCurrentUser(userCredential.user)


            navigate('/home') // Redirect to home page after successful login


        } catch (error) {
           // Handle specific Firebase errors
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setError('Invalid email or password');
            } else if (error.code === 'auth/invalid-email') {
                setError('Invalid email address');
            } else if (error.code === 'auth/too-many-requests') {
                setError('Too many failed login attempts. Please try again later.');
            } else {
                setError(error.message || 'Failed to sign in');
            }
            console.error(error);
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
                    type="text"
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
              Don't have account?
              <span className="ms-1 text-decoration-underline fw-medium cursor-pointer">
                Sign up
              </span>
            </p>
        </footer>
    </div>
)

}


export default Login