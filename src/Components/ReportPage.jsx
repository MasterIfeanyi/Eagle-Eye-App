import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faEye, faEyeSlash, faExclamationTriangle, faLocation, faUpload, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import Header from "./Header"


const ReportPage = () => {

    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    // const [upload, setUpload] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState("")
    const [anonymous, setAnonymous] = useState("no")

    const { currentUser } = useAuth() // Get the current user from AuthContext
  const navigate = useNavigate() // Get navigate function

    
    
    


    // const handleFileChange = (e) => {
    //     setUpload(e.target.files[0])
    // }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
    
        if (!title || !location || !date || !description || !anonymous) {
            setError("Please fill in all fields")
            return
          }

        try {
            setLoading(true)


            // Generate a scrambled user ID if the user chooses to submit anonymously
            const userId = anonymous === "yes" ? `anon-${Math.random().toString(36).substring(2, 15)}` : currentUser.email


            // Add a new document with a generated ID
            await addDoc(collection(db, "reports"), {
                title,
                location,
                date,
                description,
                anonymous,
                userId, // Attach the user ID (email or scrambled ID)
            })

            setTitle("")
            setLocation("")
            setDescription("")
            // setUpload(null)
            setDate("")
            setAnonymous("no")

            // Navigate to the submit page
            navigate('/submit')
            
        } catch (error) {
            setError("Failed to create report")
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

  return (
    <div className='report'>


        {/* Header */}
        <Header />

        {/* Create Report Form */}

        <div className="section-title">
            <h2 className="fw-bold mb-1">Create Report</h2>
            <p className="text-muted mb-4">see something, say something</p>
        </div>

        {error && <div className="alert alert-danger mx-3">{error}</div>}

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


            {/* <div className="input-group custom-input-group">
                <span className="input-group-text bg-white border-end-0">
                    <FontAwesomeIcon icon={faUpload} />
                </span>
                <input
                    type="file"
                    className="form-control border-start-0"
                    onChange={handleFileChange}
                />
            </div> */}

            <div className="input-group custom-input-group">
                <span className="input-group-text bg-white border-end-0">
                    <FontAwesomeIcon icon={faCalendar} />
                </span>
                <input
                    type="date"
                    className="form-control border-start-0"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <div className="input-group custom-input-group">
                <label className="input-group-text bg-white border-end-0" htmlFor="anonymous">
                    Report Anonymously
                </label>
                <select
                    id="anonymous"
                    className="form-select border-start-0"
                    value={anonymous}
                    onChange={(e) => setAnonymous(e.target.value)}
                >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>


            <div className="input-group custom-input-group">
                <textarea
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="col-12 d-flex justify-content-center">
                <button type="submit" className="button btn-brand">{loading ? 'Creating Report...' : 'Submit'}</button>
            </div>

        </form>
    </div>
  )
}

export default ReportPage