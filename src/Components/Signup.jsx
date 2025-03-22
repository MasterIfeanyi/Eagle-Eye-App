import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'

const Signup = () => {


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = () => {

        if (!username || !email || !password || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }
    
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        // Send data to backend
    }

  return (
    <div className='signup'>

        <div className="section-title">
            <h2 className="fw-bold mb-1">Create Account</h2>
            <p className="text-muted mb-4">Sign up to get started</p>
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

            <div className="input-group custom-input-group">
                <span className="input-group-text bg-white border-end-0">
                <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control border-start-0 border-end-0"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                    className="input-group-text bg-white border-start-0 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </span>
            </div>

            <div className="col-12 d-flex justify-content-center">
                <button type="submit" className="button btn-brand">Sign Up</button>
            </div>
        </form>
    </div>
  )
}

export default Signup