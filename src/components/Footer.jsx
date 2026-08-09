import footerLogo from "../assets/logos/happy-drops-exact-logo-no-box.png";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="shared-footer">
      <div className="footer-brand">
        <img src={footerLogo} alt="Happy Drops" />
      </div>

      <div className="footer-column">
        <h3>Quick Links</h3>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/workshops">Workshops</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/therapists">Therapists</Link>
        <Link to="/suppliers">Suppliers</Link>
      </div>

      <div className="footer-column">
        <h3>Customer Care</h3>
        <Link to="/shipping-delivery">Shipping &amp; Delivery</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-conditions">Terms &amp; Conditions</Link>
      </div>

      <div className="footer-column">
        <h3>My Account</h3>
        <Link to="/login">Login / Register</Link>
        <Link to="/my-profile">My Profile</Link>
        <Link to="/wishlist">Happy Wishes</Link>
        <Link to="/track-order">Track Order</Link>
      </div>

      <div className="footer-column">
        <h3>Get in Touch</h3>
        <a href="mailto:info@happydrops.fi">info@happydrops.fi</a>
        <span>Helsinki XR Center</span>
        <span>Hameentie 135 A</span>
        <span>00560 Helsinki</span>
        <span>Finland</span>
      </div>
    </footer>
  );
}

export default Footer;
