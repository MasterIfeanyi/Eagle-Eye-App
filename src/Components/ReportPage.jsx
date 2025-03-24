import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faEye, faEyeSlash, faExclamationTriangle, faLocation, faUpload } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'

const ReportPage = () => {

    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [upload, setUpload] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const handleFileChange = (e) => {
        setUpload(e.target.files[0])
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
    
        if (!title || !location || !upload) {
          setError("Please fill in all fields")
          return
        }

        try {
            setLoading(true)


            setTitle("")
            setLocation("")
            setDescription("")
            setUpload(null)
            
        } catch (error) {
            setError("Failed to create report")
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

  return (
    <div className='report'>
        <div className="section-title">
            <h2 className="fw-bold mb-1">Create Report</h2>
            <p className="text-muted mb-4">see something, say something</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form className='row g-3 px-3' onSubmit={handleSubmit}>
            <div className="input-group custom-input-group">
                <span className="input-group-text bg-white border-end-0">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                </span>
                <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="What Happened?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="input-group custom-input-group">
                <span className="input-group-text bg-white border-end-0">
                    <FontAwesomeIcon icon={faLocation} />
                </span>
                <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="input-group custom-input-group">
                <span className="input-group-text bg-white border-end-0">
                    <FontAwesomeIcon icon={faUpload} />
                </span>
                <input
                    type="file"
                    className="form-control border-start-0"
                    onChange={handleFileChange}
                />
            </div>
        </form>





    </div>
  )
}

export default ReportPage