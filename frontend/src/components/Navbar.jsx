import happyDropsLogo from "../assets/images/happy-drops-logo.jpeg";

function Navbar() {
  return (
    <nav className="navbar">
      <a className="brand" href="#" aria-label="Happy Drops home">
        <img src={happyDropsLogo} alt="Happy Drops" />
      </a>

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
