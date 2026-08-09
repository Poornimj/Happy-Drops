import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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

const concernSearches = [
  { concern: "skin-care", terms: ["skin", "skin care", "skincare", "wrinkle", "moisture"] },
  { concern: "sleep", terms: ["sleep", "rest", "relaxation"] },
  { concern: "stress", terms: ["stress", "comfort", "headache", "mood"] },
  { concern: "hair-care", terms: ["hair", "hair care", "hair growth"] },
  { concern: "movement", terms: ["movement", "joint", "flexibility"] },
  { concern: "focus", terms: ["focus", "concentration", "meditation"] },
  { concern: "digestion", terms: ["digestion", "digestive"] },
  { concern: "energy", terms: ["energy", "vitality"] },
  { concern: "wellness", terms: ["daily wellness", "wellness"] },
];

const foodSearchTerms = [
  "food", "food related", "sauce", "biotin", "supplement",
  "olive oil", "hemp seed", "culinary",
  "kombucha", "kompucha", "kefir", "cafffeir", "fermented drink",
];

const sectionSearches = [
  { path: "/knowledge", terms: ["knowledge", "article", "articles", "wellness information"] },
  { path: "/workshops", terms: ["workshop", "workshops", "booking", "book workshop"] },
  { path: "/suppliers", terms: ["supplier", "suppliers"] },
  { path: "/therapists", terms: ["therapist", "therapists", "therapy"] },
  { path: "/about-us", terms: ["about", "about us", "our story"] },
  { path: "/cart", terms: ["cart", "shopping cart"] },
];

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const searchProducts = () => {
    const currentSearch = new URLSearchParams(location.search).get("q") || "";
    const query = window.prompt("Search products or website sections", currentSearch);
    if (query === null) return;

    const trimmedQuery = query.trim();
    const normalizedQuery = trimmedQuery.toLowerCase().replace(/\s+/g, " ");

    if (!normalizedQuery) {
      navigate("/shop");
      return;
    }

    const concernMatch = concernSearches.find(({ terms }) => (
      terms.some((term) => normalizedQuery === term || normalizedQuery.includes(`${term} products`))
    ));
    if (concernMatch) {
      navigate(`/shop?concern=${concernMatch.concern}`);
      return;
    }

    if (foodSearchTerms.some((term) => normalizedQuery.includes(term))) {
      navigate(`/shop/food-related?q=${encodeURIComponent(trimmedQuery)}`);
      return;
    }

    const sectionMatch = sectionSearches.find(({ terms }) => terms.includes(normalizedQuery));
    if (sectionMatch) {
      navigate(sectionMatch.path);
      return;
    }

    navigate(`/shop?q=${encodeURIComponent(trimmedQuery)}`);
  };

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
          <button
            type="button"
            className="nav-icon"
            aria-label="Search products"
            title="Search products"
            onClick={searchProducts}
          >
            <HiOutlineSearch />
          </button>

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

          <Link to="/cart" className="nav-icon" aria-label="Shopping cart">
            <HiOutlineShoppingCart />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
