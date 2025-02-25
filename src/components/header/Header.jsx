import React from 'react';
import './header.css';

// default export qilamiz
export default function Header() {  // export const Header emas
  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">
            <a href="/">Manage</a>
          </div>
          <ul className="nav-links">
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#product">Product</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#community">Community</a></li>
          </ul>
          <button className="btn">Get Started</button>
        </nav>
      </div>
    </header>
  );
} 