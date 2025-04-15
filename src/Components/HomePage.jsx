import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faPhone, faUser, faFileAlt } from "@fortawesome/free-solid-svg-icons"
import { Search, Shield, Bell, Menu, AlertTriangle, FileText, Clock, MessageSquare, ChevronRight } from "lucide-react"
import { Card, Badge, Button, Form } from "react-bootstrap"
import { Link } from 'react-router-dom'
import Header from './Header'

const HomePage = () => {

    
  return (
    <div className='home-page'>

      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="main flex-1 flex-column justify-content-start">

        

        <div className="container py-3">
          {/* Emergency Banner */}
          <div className="bg-danger mt-2 bg-opacity-10 border border-danger rounded p-3 mb-4 d-flex align-items-center gap-3">
            <div className="bg-danger d-flex justify-content-center align-items-center rounded-circle p-2 me-3">
              <AlertTriangle size={20} color="white" />
            </div>
            <div>
              <h3 className="fs-6 fw-medium text-danger mb-0">Emergency?</h3>
              <p className="small text-danger mb-0">Call emergency services immediately</p>
            </div>
            <div></div>
          </div>

          <div className='safety-tips my-4'>
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

          {/* Report Categories */}
          <div className="my-4">
            <h2 className="fs-5 fw-semibold mb-3">Report Categories</h2>
            <div className="d-flex flex-column gap-2 report-categories">
              {[
                { title: "Corruption", desc: "Report bribery, embezzlement, or abuse of power", icon: "💰" },
                { title: "Violent Crime", desc: "Report assault, robbery, or other violent incidents", icon: "⚠️" },
                { title: "Kidnapping", desc: "Report missing persons or suspected abductions", icon: "🚨" },
                { title: "Sexual Assault", desc: "Report sexual violence or harassment", icon: "🛑" },
                { title: "Other Crimes", desc: "Report other types of criminal activity", icon: "📋" },
              ].map((category, index) => (
                <Card key={index} className="border" onClick={() => navigate("/report")}>
                  <Card.Body className="p-3 d-flex align-items-center">
                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                      style={{ width: "40px", height: "40px", fontSize: "1.25rem" }}
                    >
                      {category.icon}
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="fs-6 fw-medium mb-0">{category.title}</h3>
                      <p className="small text-muted mb-0">{category.desc}</p>
                    </div>
                    <ChevronRight size={20} className="text-muted" />
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>




        </div>



        {/* <p className="text-center text-gray-600">see something, say something</p> */}



        {/* Recent Reports */}
        {/* <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fs-5 fw-semibold mb-0">Recent Reports</h2>
            <Button variant="link" size="sm" className="text-decoration-none p-0">
              View All
            </Button>
          </div>
          <div className="d-flex flex-column gap-3">
            {[
              { id: "CR-2025-0342", type: "Corruption", status: "Under Review", date: "Mar 24, 2025" },
              { id: "CR-2025-0339", type: "Theft", status: "Assigned", date: "Mar 22, 2025" },
            ].map((report, index) => (
              <Card key={index} className="border" onClick={() => navigate("/status")}>
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 className="fs-6 fw-medium mb-0">{report.id}</h3>
                    <Badge bg={report.status === "Under Review" ? "secondary" : "info"}>{report.status}</Badge>
                  </div>
                  <div className="d-flex justify-content-between small">
                    <span className="text-muted">{report.type}</span>
                    <span className="text-muted">{report.date}</span>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div> */}

        


        

      </div>


      <footer>
        <div className="footer">
          <Link to="/report" className='phone-btn'>
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