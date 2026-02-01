import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const SubmitPage = () => {

  const navigate = useNavigate() // Get navigate function

  const handleBackClick = () => {
    navigate('/home') // Navigate to the home page
  }

  return (
    <div className='submit'>
        <FontAwesomeIcon className="back-arrow" onClick={handleBackClick} icon={faArrowLeft} />
        <div className="banner-message">
            <div className="section-title">
                <div className="checkmark-circle">
                    <svg viewBox="0 0 52 52" className="checkmark">
                    <circle cx="26" cy="26" r="25" fill="none" className="checkmark-circle" />
                    <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" className="checkmark-check" />
                    </svg>
                </div>
                <h3>Thank You</h3>
                <p>Your report will be handled immediately.</p>
            </div>
            
        </div>
    </div>
  )
}

export default SubmitPage