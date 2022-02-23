import { Avatar } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import './HeaderInternal.scss'
const HeaderInternal = () => {
  return (
    <div className='header-internal'>
      <div className="header-content">
        <div className="header-item">
          <Link to="/">
            <span className="logo-item">
              <div className="logo-img">

                <img src="/star.png" alt='Onboarding icon' />
              </div>
              <span>Onboarding</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>
        <div className="header-item">
        <Link to="/">
            <span className="logo-item">
              <div className="logo-img">

                <img src="/document.png" alt='Onboarding icon' />
              </div>
              <span>Resources</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>

        <div className="header-item">
        <Link to="/">
            <span className="logo-item">
              <div className="logo-img">

                <img src="/contact.png" alt='Onboarding icon' />
              </div>
              <span>Contacts</span>
            </span>
          </Link>  
        </div>
        <div className="item-space"></div>

        <div className="header-item">
        <Link to="/">
            <span className="logo-item">
              <div className="logo-img">

                <img src="/more.png" alt='Onboarding icon' />
              </div>
              <span>More</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>

        <div className="header-item">
        <Link to="/">
            <span className="logo-item">
              {/* <div className="logo-img">

                <img src="/star.png" alt='Onboarding icon' />
              </div> */}
              <span>11105 points</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>

        <div className="header-item">
        <Link to="/">
            <span className="logo-item">
              <div className="logo-img">

                <img src="/crown.png" alt='Onboarding icon' />
              </div>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>

        <div className="header-item">
          <Avatar src="/man.png"/>
        </div>
      </div>
    </div>
  )
}

export default HeaderInternal