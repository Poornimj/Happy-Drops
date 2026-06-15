import footerLogo from "../assets/logos/happy-drops-exact-logo-no-box.png";

function Footer() {
  return (
    <footer className="shared-footer">
      <div className="footer-brand">
        <img src={footerLogo} alt="Happy Drops" />
        <p>
          Empowering people to live happier, healthier lives and achieve
          longevity through the healing power of nature.
        </p>
      </div>

      <div className="footer-column">
        <h3>Quick Links</h3>
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/workshops">Workshops</a>
        <a href="/about-us">About Us</a>
        <a href="/therapists">Therapists</a>
        <a href="/suppliers">Suppliers</a>
      </div>

      <div className="footer-column">
        <h3>Customer Care</h3>
        <a href="/shipping-delivery">Shipping &amp; Delivery</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-conditions">Terms &amp; Conditions</a>
      </div>

      <div className="footer-column">
        <h3>My Account</h3>
        <a href="/signup">Login / Register</a>
        <a href="/signup">My Profile</a>
        <a href="/wishlist">Wishlist</a>
        <a href="/track-order">Track Order</a>
      </div>

      <div className="footer-column">
        <h3>Get in Touch</h3>
        <a href="mailto:info@happydrops.com">info@happydrops.com</a>
        <span>Helsinki XR Center</span>
        <span>Hameentie 135 A</span>
        <span>00560 Helsinki</span>
        <span>Finland</span>
      </div>
    </footer>
  );
}

export default Footer;
