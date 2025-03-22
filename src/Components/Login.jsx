import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!username || !password) {
            setError("Please fill in all fields")
            return
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
                    <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Enter your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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