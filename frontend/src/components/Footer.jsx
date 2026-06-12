import logo from "../assets/images/newlogo.jpeg";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <img src={logo} alt="Happy Drops" className="footer-logo" />
          <p className="brand-description">
            Empowering people to live happier,
            healthier lives and achieve longevity
            through the healing power of nature.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Workshops</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Therapists</a></li>
            <li><a href="#">Suppliers</a></li>
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

        {/* Get in Touch */}
        <div className="footer-column">
          <h4>Get in Touch</h4>
          <ul>
            <li>info@happydrops.com</li>
            <li>Helsinki XR Center</li>
            <li>Ilmarentie 135 A</li>
            <li>00560 Helsinki</li>
            <li>Finland</li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default Footer;