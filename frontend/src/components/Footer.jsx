import happyDropsLogo from "../assets/logos/happy-drops-exact-logo-no-box.png";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={happyDropsLogo} alt="Happy Drops" className="footer-logo" />
          <p>
            Empowering people to live happier, healthier lives through the
            healing power of nature.
          </p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Workshops</a>
          <a href="#">About Us</a>
          <a href="#">Therapists</a>
          <a href="#">Suppliers</a>
        </div>

        <div className="footer-column">
          <h4>Customer Care</h4>
          <a href="#">Shipping & Delivery</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

        <div className="footer-column">
          <h4>My Account</h4>
          <a href="#">Login / Register</a>
          <a href="#">My Profile</a>
          <a href="#">Wishlist</a>
          <a href="#">Track Order</a>
        </div>

        <div className="footer-column">
          <h4>Get in Touch</h4>
          <p>info@happydrops.com</p>
          <p>Helsinki XR Center</p>
          <p>{"H\u00E4meentie 135 A"}</p>
          <p>00560 Helsinki</p>
          <p>Finland</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;