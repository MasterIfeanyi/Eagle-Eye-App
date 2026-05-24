'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle, faLocation, faUpload, faCalendar } from "@fortawesome/free-solid-svg-icons"
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

    const { currentUser } = useAuth()
    const router = useRouter()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFileName(file.name)
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

            // Step 1: Upload image to Cloudinary first
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

                // This is now a clean Cloudinary URL, not a heavy Base64 string
                imageUrl = uploadData.url
            }

            // Step 2: Save report to MongoDB with the image URL
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

            // Step 3: Reset form
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
                        <FontAwesomeIcon icon={faLocation} />
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Enter your current Location"
                        value={userCurrentLocation}
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
                    <button type="submit" className="button btn-brand" disabled={loading}>
                        {loading ? 'Submitting Report...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ReportPage