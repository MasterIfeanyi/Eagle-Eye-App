import React from 'react'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const SplashScreen = () => {

  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to main screen after 3 seconds
    const timer = setTimeout(() => {
      navigate("/home")
    }, 1000)

    return () => clearTimeout(timer)
  }, [navigate])

    
  return (
    <div className='splash-screen'>
      <div className="splash_message-container">
        <img src="./eagle.png" alt="logo" className='splash-logo' />
        <p className='fw-bold fs-2'>Eagle Eye</p>
      </div>
    </div>
  )
}

export default SplashScreen