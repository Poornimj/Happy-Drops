import "./Navbar.css";
import logo from "../assets/logos/logo.jpeg";

import { HiOutlineGlobeAlt, HiOutlineSearch, HiOutlineUser, HiOutlineShoppingCart, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useState } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo (Home) */}
        <a href="/" className="navbar-logo">
          <img src={logo} alt="Happy Drops" />
        </a>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><a href="#knowledge">Knowledge</a></li>
          <li><a href="#workshops">Workshops</a></li>
          <li><a href="#therapists">Therapists</a></li>
          <li><a href="#suppliers">Suppliers</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#about">About Us</a></li>
        </ul>

        {/* Right Side */}
        <div className="navbar-right">

          <div className="language-selector">
            <HiOutlineGlobeAlt />

            <a href="#" className="active-language">
              EN
            </a>

            <span>|</span>

            <a href="#">FI</a>

            <span>|</span>

            <a href="#">中文</a>
          </div>

          <div className="nav-icons">
            <a href="#" className="nav-icon">
              <HiOutlineSearch />
            </a>

            <a href="#" className="nav-icon">
              <HiOutlineUser />
            </a>

            <a href="#" className="nav-icon">
              <HiOutlineShoppingCart />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#knowledge" onClick={toggleMobileMenu}>Knowledge</a></li>
          <li><a href="#workshops" onClick={toggleMobileMenu}>Workshops</a></li>
          <li><a href="#therapists" onClick={toggleMobileMenu}>Therapists</a></li>
          <li><a href="#suppliers" onClick={toggleMobileMenu}>Suppliers</a></li>
          <li><a href="#shop" onClick={toggleMobileMenu}>Shop</a></li>
          <li><a href="#about" onClick={toggleMobileMenu}>About Us</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;