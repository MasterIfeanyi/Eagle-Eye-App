import React from 'react'

const Welcome = () => {



  return (
    <div className='welcome'>
        <div className="welcome-title">
            <h2 className="fw-bold mb-1">Be a Patriotic citizen, Play your Part</h2>
            <p className="text-muted mb-4">see something, say something</p>
        </div>


        {/* buttons */}
        <div className="welcome-buttons row px-5 mt-auto mb-5 d-flex flex-column align-items-center justify-content-center">
            <button type="submit" className="button btn-brand my-2">Sign Up</button>

            <button type="submit" className="button btn-outline-brand">Log in</button>
   
        </div>


    </div>
  )
}

export default Welcome