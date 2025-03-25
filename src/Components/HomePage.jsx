import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
import { Search, Shield, Bell, Menu, AlertTriangle, FileText, Clock, MessageSquare, ChevronRight } from "lucide-react"
import { Card, Badge, Button, Form } from "react-bootstrap"


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
        </div>



        <p className="text-center text-gray-600">see something, say something</p>


























      </div>


      <footer>
        <div className="footer">
          <button className='phone-btn'>
            <FontAwesomeIcon icon={faPhone} className="" />
          </button>

          <button className='user-btn'>
            <FontAwesomeIcon icon={faUser} className="" />
          </button>
        </div>
      </footer>


    </div>
  )
}

export default HomePage