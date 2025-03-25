import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faPhone, faUser, faFileAlt } from "@fortawesome/free-solid-svg-icons"
import { Search, Shield, Bell, Menu, AlertTriangle, FileText, Clock, MessageSquare, ChevronRight } from "lucide-react"
import { Card, Badge, Button, Form } from "react-bootstrap"
import { Link } from 'react-router-dom'

const HomePage = () => {

    
  return (
    <div className='home-page'>

      {/* Header */}
      <header className="bg-dark text-white p-3 shadow">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            {/* <Shield size={24} /> */}
            <img src="./eagle.png" style={{width: "20px", height: "30px"}} alt="" />
            <h1 className="h5 mb-0 fw-bold">Eagle Eye</h1>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Bell size={20} />
            <Menu size={20} />
          </div>
        </div>
      </header>




      

      {/* Main Content */}
      <div className="main flex-1 flex-column justify-content-start">

        {/* search bar */}
        <div className='px-4 py-2 search-bar-container'>
          <div className='search-bar shadow-sm'>
            <input type="text" placeholder='Search' className='search-input' />
            <FontAwesomeIcon icon={faSearch} className='search-icon' />
          </div>
        </div>

        <div className="container py-3">
          {/* Emergency Banner */}
          <div className="bg-danger bg-opacity-10 border border-danger rounded p-3 mb-4 d-flex align-items-center">
            <div className="bg-danger d-flex justify-content-center align-items-center rounded-circle p-2 me-3">
              <AlertTriangle size={20} color="white" />
            </div>
            <div>
              <h3 className="fs-6 fw-medium text-danger mb-0">Emergency?</h3>
              <p className="small text-danger mb-0">Call emergency services immediately</p>
            </div>
            <Button variant="danger" size="sm" className="ms-auto">
              Call Now
            </Button>
          </div>

          <div className='safety-tips'>
            <h2 className="fs-5 fw-semibold mb-3">Safety Tips</h2>
            <Card className="border bg-info bg-opacity-10">
              <Card.Body className="p-3">
                <h3 className="fs-6 fw-medium mb-2">Stay Safe When Reporting</h3>
                <ul className="small ps-3 mb-2">
                  <li>Report from a safe location</li>
                  <li>All reports are confidential</li>
                  <li>You can report anonymously</li>
                  <li>Save evidence when possible</li>
                </ul>
                {/* <Button variant="link" className="p-0 small text-decoration-none">
                  Learn More
                </Button> */}
              </Card.Body>
            </Card>
          </div>
        </div>



        <p className="text-center text-gray-600">see something, say something</p>



        {/* Safety Tips */}

        




















      </div>


      <footer>
        <div className="footer">
          <Link className='phone-btn'>
            <FontAwesomeIcon icon={faFileAlt} className="" />
          </Link>

          <button className='user-btn'>
            <FontAwesomeIcon icon={faUser} className="" />
          </button>
        </div>
      </footer>


    </div>
  )
}

export default HomePage