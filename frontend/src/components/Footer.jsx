import logo from "../assets/logos/logo.jpeg";

import "./Footer.css";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
} from "react-icons/hi2";

function Footer() {
  return (
    <footer className="footer">
      <div className="leaf-decoration-left"></div>
      <div className="leaf-decoration-right"></div>
      
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">

          <div className="brand-header">
            <img
              src={logo}
              alt="Nature Power"
              className="footer-logo"
            />

            <div className="brand-text">
              <h3><span>HAPPY DROPS</span></h3>
            </div>
          </div>

          <p className="brand-description">
            Empowering people to live happier,
            healthier lives through the healing
            power of nature.
          </p>

          <div className="social-icons">
            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaYoutube />
            </a>

            <a href="#">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>

          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Workshops</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer-column">
          <h4>Customer Care</h4>

          <ul>
            <li><a href="#">Shipping & Delivery</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* My Account */}
        <div className="footer-column">
          <h4>My Account</h4>

          <ul>
            <li><a href="#">Login / Register</a></li>
            <li><a href="#">My Profile</a></li>
            <li><a href="#">Wishlist</a></li>
            <li><a href="#">Track Order</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h4>Get in Touch</h4>

          <div className="contact-item">
            <HiOutlineEnvelope />
            <span>hello@naturepower.app</span>
          </div>

          <div className="contact-item">
            <HiOutlineMapPin />
            <span>
              Hämeentie 135 A
              <br />
              00560 Helsinki
              <br />
              Finland
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;