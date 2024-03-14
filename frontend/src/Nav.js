import React from 'react';
import { Link } from 'react-router-dom';
import "./css/Nav.css";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>TWITTER</h1>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Nav;