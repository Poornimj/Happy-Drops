import { Link, NavLink } from "react-router-dom";
import {
  HiOutlineGlobeAlt,
  HiOutlineSearch,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi";
import happyDropsLogo from "../assets/logos/happy-drops-exact-logo-no-box.png";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { href: "/knowledge", label: "Knowledge" },
  { href: "/workshops", label: "Workshops" },
  { href: "/therapists", label: "Therapists" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/shop", label: "Shop" },
  { href: "/about-us", label: "About Us" },
];

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <Link className="brand" to="/" aria-label="Happy Drops home">
        <img src={happyDropsLogo} alt="Happy Drops" />
      </Link>

      <div className="nav-links">
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.href}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="nav-actions">
        <div className="language-switcher" aria-label="Language selector">
          <HiOutlineGlobeAlt />
          <a href="#">EN</a>
          <span aria-hidden="true"></span>
          <a href="#">FI</a>
          <span aria-hidden="true"></span>
          <a href="#">中文</a>
        </div>

        <div className="nav-icons">
          <a href="#" className="nav-icon" aria-label="Search">
            <HiOutlineSearch />
          </a>

          {user ? (
            <button
              type="button"
              className="nav-icon nav-logout"
              aria-label={`Log out ${user.firstName}`}
              title={`Log out ${user.firstName}`}
              onClick={logout}
            >
              <HiOutlineUser />
            </button>
          ) : (
            <Link to="/login" className="nav-icon" aria-label="Log in or create an account">
              <HiOutlineUser />
            </Link>
          )}

          <Link to="/shop" className="nav-icon" aria-label="Shopping cart">
            <HiOutlineShoppingCart />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
