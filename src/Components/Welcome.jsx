import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {



  return (
    <div className='welcome'>
      <div className="welcome-title">
        <h2 className="fw-bold mb-1">Be a Patriotic citizen, Play your Part</h2>
        <p className="text-muted mb-4">see something, say something</p>
      </div>


      {/* buttons */}
      <div className="welcome-buttons row px-5 mt-auto mb-5 d-flex flex-column align-items-center justify-content-center">
          <Link to="/signup" className="button btn-brand link my-2">Create account</Link>

          <Link to="/login" className="button btn-outline-brand link">Log in</Link>
      </div>
    </div>
  )
}

export default Welcome