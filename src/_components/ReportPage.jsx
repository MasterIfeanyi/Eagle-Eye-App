import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle, faLocation, faUpload, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { createReport } from '../api/api';
import Header from "./Header"


const ReportPage = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState("")
    const [anonymous, setAnonymous] = useState("no")
    
    const [fileBase64, setFileBase64] = useState("") // State for Base64 string

    const [userCurrentLocation, setuserCurrentLocation] = useState("")

    const { currentUser } = useAuth() // Get the current user from AuthContext

    const navigate = useNavigate() // Get navigate function

    let address;
    

    const handleFileChange = (e) => {

        const file = e.target.files[0];


        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
              setFileBase64(reader.result) // Save the Base64 string
            }
            reader.readAsDataURL(file) // Convert the file to a Base64 string
        }
      
    }


    


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
    
        if (!title || !userCurrentLocation || !date || !description || !anonymous) {
            setError("Please fill in all fields")
            return
          }

        try {
            setLoading(true)


            // Generate a scrambled user ID if the user chooses to submit anonymously
            const userId = anonymous === "yes" ? `anon-${Math.random().toString(36).substring(2, 15)}` : currentUser.email

            // user location and coordinates
            // const location =  {
            //     address: userCurrentLocation,
            //     coords: coords
            // }
         
            const reportData = {
                title,
                location: address ? address : location, // Attach the coordinates
                date,
                description,
                anonymous,
                userId, // Attach the user ID (email or scrambled ID) 
                fileBase64, // Include the Base64 string
                createdAt: new Date().toISOString() // Include the timestamp
            }

            await createReport(reportData)

            setTitle("")
            setuserCurrentLocation("")
            setDescription("")
            setFileBase64(null) // Reset the file state
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

        <div className="report-section-title">
            <h2 className="fw-bold">Create Report</h2>
            <p className="text-muted">see something, say something</p>
            {error && <div className="alert alert-danger mx-3 mb-3">{error}</div>}
        </div>


        <form className='row g-3 px-3 handleForm' onSubmit={handleSubmit}>
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
                    placeholder="Enter your current Location"
                    value={address ? address : userCurrentLocation} // Use the address if available
                    onChange={(e) => setuserCurrentLocation(e.target.value)}
                    // onFocus={handleLocationFocus}
                    // disabled={isLocationDisabled} // Disable the input field until location is fetched
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