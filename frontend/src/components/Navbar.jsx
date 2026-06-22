import {
  HiOutlineGlobeAlt,
  HiOutlineSearch,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi";
import happyDropsLogo from "../assets/logos/happy-drops-exact-logo-no-box.png";

const navLinks = [
  { href: "/knowledge", label: "Knowledge" },
  { href: "/workshops", label: "Workshops" },
  { href: "/therapists", label: "Therapists" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/shop", label: "Shop" },
  { href: "/about-us", label: "About Us" },
];

function isActiveLink(currentPath, link) {
  return currentPath === link.href || link.aliases?.includes(currentPath);
}

function Navbar({ currentPath = "/" }) {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      <a className="brand" href="/" aria-label="Happy Drops home">
        <img src={happyDropsLogo} alt="Happy Drops" />
      </a>

      <div className="nav-links">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            aria-current={isActiveLink(currentPath, link) ? "page" : undefined}
          >
            {link.label}
          </a>
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

          <a href="/login" className="nav-icon" aria-label="Log in or create an account">
            <HiOutlineUser />
          </a>

          <a href="/shop" className="nav-icon" aria-label="Shopping cart">
            <HiOutlineShoppingCart />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
