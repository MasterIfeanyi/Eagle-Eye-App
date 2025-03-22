import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"

const HomePage = () => {

    
  return (
    <div className='home-page'>
      {/* search bar */}
      <div className='p-4 py-2 search-bar-container'>
        <div className='search-bar'>
          <input type="text" placeholder='Search' className='search-input' />
          <FontAwesomeIcon icon={faSearch} className='search-icon' />
        </div>
      </div>

      {/* Main Content */}
      <div className="main flex-1 flex items-center justify-center p-4">
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