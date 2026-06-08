import React from "react";
import knowledgeLogo from "../assets/logos/knowledge-logo.png";
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineShoppingCart,
} from "react-icons/hi";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="/" className="brand">
          <img className="logo" src={knowledgeLogo} alt="Happy Drops" />
        </a>

        <nav className="navbar-menu" aria-label="Main navigation">
          <a href="/knowledge" className="active">Knowledge</a>
          <a href="/workshops">Workshops</a>
          <a href="/therapists">Therapists</a>
          <a href="/suppliers">Suppliers</a>
          <a href="/shop">Shop</a>
          <a href="/about-us">About Us</a>
        </nav>

        <div className="nav-icons">
          <a href="#" className="nav-icon" aria-label="Search">
            <HiOutlineSearch />
          </a>

          <a href="/signup" className="nav-icon" aria-label="Login or Sign Up">
            <HiOutlineUser />
          </a>

          <a href="#" className="nav-icon cart-icon" aria-label="Shopping cart">
            <HiOutlineShoppingCart />
            <span>0</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
