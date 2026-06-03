function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <span className="brand-icon">HD</span>
        <div>
          <strong>Happy</strong>
          <span>Drops</span>
        </div>
      </div>

      <div className="nav-links">
        <a href="#">Knowledge</a>
        <a href="#">Workshops</a>
        <a href="#">Therapists</a>
        <a href="#">Suppliers</a>
        <a href="#">Shop</a>
        <a href="#">About Us</a>
      </div>

      <button className="login-button">Login / Sign Up</button>
    </nav>
  );
}

export default Navbar;
