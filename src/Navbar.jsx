import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-item">Fő oldal</Link>
        </li>
        <li>
          <Link to="/darts" className="navbar-item">Darts Lista</Link>
        </li>
        <li>
          <Link to="/create-darts" className="navbar-item">Új játékos felvétele</Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
