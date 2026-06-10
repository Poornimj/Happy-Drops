import {
  HiOutlineGlobeAlt,
  HiOutlineSearch,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi";
import happyDropsLogo from "../assets/logos/happy-drops-exact-logo-no-box.png";

function Navbar() {
  return (
    <nav className="navbar">
      <a className="brand" href="#" aria-label="Happy Drops home">
        <img src={happyDropsLogo} alt="Happy Drops" className="logo" />
      </a>

      <div className="nav-links">
        <a href="#">Knowledge</a>
        <a href="#">Workshops</a>
        <a href="#">Therapists</a>
        <a href="#">Suppliers</a>
        <a href="#">Shop</a>
        <a href="#">About Us</a>
      </div>

      <div className="nav-actions">
        <div className="language-switcher" aria-label="Language selector">
          <HiOutlineGlobeAlt />
          <a href="#">EN</a>
          <span></span>
          <a href="#">FI</a>
          <span></span>
          <a href="#">中文</a>
        </div>

        <div className="nav-icons">
          <a href="#" className="nav-icon" aria-label="Search">
            <HiOutlineSearch />
          </a>
          <a href="#" className="nav-icon" aria-label="Account">
            <HiOutlineUser />
          </a>
          <a href="#" className="nav-icon" aria-label="Shopping cart">
            <HiOutlineShoppingCart />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;