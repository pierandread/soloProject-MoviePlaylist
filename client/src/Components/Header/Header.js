import React from 'react';
import logo from '../../images/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';

function Header() {

  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <img alt="" src={logo} width="40" height="30"
            className="d-inline-block align-top"
          />{' '}
          Movie Playlist Generator
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Header;
