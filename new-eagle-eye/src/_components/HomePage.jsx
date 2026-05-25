import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faFileAlt, faPhone } from "@fortawesome/free-solid-svg-icons"
import {  AlertTriangle } from "lucide-react"
import { Card } from "react-bootstrap"
import Link  from 'next/link'
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
            <div>
              <Link href="/report" className='report-btn'>Make a report</Link>
            </div>
          </div>

          <div className='safety-tips my-4'>
            <h2 className="fs-5 fw-semibold mb-3">Safety Tips</h2>
            <Card className="border bg-info bg-opacity-10">
              <Card.Body className="p-3">
                <ul className="small ps-3 mb-2">
                  <li>Report from a safe location</li>
                  <li>Travel in groups</li>
                  <li>You can report anonymously</li>
                  <li>Save evidence when possible</li>
                </ul>
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
                <Card key={index} className="border">
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
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>


      <footer>
        <div className="footer">
          <Link href="/report" className='phone-btn'>
            <FontAwesomeIcon icon={faFileAlt} className="" />
          </Link>

          <Link href="/hotlines" className='user-btn'>
            <FontAwesomeIcon icon={faPhone} className="" />
          </Link>
        </div>
      </footer>


    </div>
  )
}

export default HomePage