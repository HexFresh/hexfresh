import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
const HeaderLandingPage = () => {
  return (<div className="home">
    <div className="header">
      <div className="container">
        <div >
          <Link to='/' className={'logo'}>
            <img src='/logo.svg' alt='Hex Fresh logo'></img>
            <span>HEXFRESH</span>
          </Link>
        </div>
        <div >
          <div className="menu">
            <ul className="navbar-nav">
              <li className="nav-item"><Link to='/' className="nav-link">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/pricing">Pricing</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/team">Team</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            </ul>
            <Button className='text-color-white mh-medium'>Sign In</Button>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default HeaderLandingPage;
