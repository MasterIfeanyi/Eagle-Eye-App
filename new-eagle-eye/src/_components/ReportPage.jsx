'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle, faLocation, faUpload, faCalendar, faSpinner  } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { createReport } from '@/helper/api'
import Header from './Header'


const ReportPage = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState("")
    const [anonymous, setAnonymous] = useState("no")
    const [fileBase64, setFileBase64] = useState("")
    const [fileName, setFileName] = useState("")
    const [userCurrentLocation, setUserCurrentLocation] = useState("")
    const [locationLoading, setLocationLoading] = useState(false)

    const { currentUser } = useAuth()
    const router = useRouter()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFileName(file.name)
            const reader = new FileReader()
            reader.onloadend = () => {
                setFileBase64(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    // Called when user clicks the location input
    const handleLocationFocus = () => {
        if (!navigator.geolocation) {
            setError("Your browser does not support geolocation")
            return
        }

        setLocationLoading(true)
        setUserCurrentLocation("Detecting your location...")

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords

                try {
                    // Free reverse geocoding, no API key needed
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    )
                    const data = await response.json()

                    // Build a clean human readable address
                    const address = data.display_name || `${latitude}, ${longitude}`
                    setUserCurrentLocation(address)
                } catch (err) {
                    // If reverse geocoding fails, fall back to coordinates
                    setUserCurrentLocation(`${latitude}, ${longitude}`)
                } finally {
                    setLocationLoading(false)
                }
            },
            (err) => {
                setLocationLoading(false)
                setUserCurrentLocation("")
                setError("Could not get your location. Please type it manually.")
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!title || !userCurrentLocation || !date || !description || !anonymous) {
            setError("Please fill in all fields")
            return
        }

        if (!currentUser) {
            setError("You must be logged in to submit a report")
            router.push('/login')
            return
        }

        try {
            setLoading(true)

            let imageUrl = ""
            if (fileBase64) {
                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileBase64 })
                })

                const uploadData = await uploadResponse.json()

                if (!uploadResponse.ok) {
                    throw new Error(uploadData.message || 'Image upload failed')
                }

                imageUrl = uploadData.url
            }

            const userId = anonymous === "yes"
                ? `anon-${Math.random().toString(36).substring(2, 15)}`
                : currentUser.email

            const reportData = {
                title,
                location: userCurrentLocation,
                date,
                description,
                anonymous,
                userId,
                imageUrl,
                createdAt: new Date().toISOString()
            }

            await createReport(reportData)

            setTitle("")
            setUserCurrentLocation("")
            setDescription("")
            setFileBase64("")
            setFileName("")
            setDate("")
            setAnonymous("no")

            router.push('/submit')
        } catch (error) {
            setError(error.message || "Failed to create report")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='report'>
            <Header />

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
                        {locationLoading
                            ? <FontAwesomeIcon icon={faSpinner} spin />
                            : <FontAwesomeIcon icon={faLocation} />
                        }
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Click to detect your location"
                        value={userCurrentLocation}
                        onFocus={handleLocationFocus}
                        onChange={(e) => setUserCurrentLocation(e.target.value)}
                    />
                </div>

                <div className="input-group custom-input-group">
                    <span className="input-group-text bg-white border-end-0">
                        <FontAwesomeIcon icon={faUpload} />
                    </span>
                    <input
                        type="file"
                        accept="image/*"
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
                    <button type="submit" className="button btn-brand" disabled={loading || locationLoading}>
                        {loading ? 'Submitting Report...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ReportPage