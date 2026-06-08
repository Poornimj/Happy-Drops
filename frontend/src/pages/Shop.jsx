import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Shop.css";
import { HiOutlineSearch, HiOutlineUser, HiOutlineShoppingCart } from "react-icons/hi";


import logo from "../assets/logos/happy-drops-exact-logo-no-box.png";
import lavenderHero from "../assets/images/SkinDryness.png";
import immunityOil from "../assets/images/Immunityoil.png";
import painReliefOil from "../assets/images/Painreliefoil.png";
import sleepOil from "../assets/images/Sleepoil.png";
import sleepSupportOil from "../assets/images/Sleepsupportoil.png";
import stressOil from "../assets/images/Stressoil.png";
import hairOil from "../assets/images/Hairoil.png";


const products = [
  { id: 1, name: "Skin and Beauty", desc: "Radiant skin care", price: "24.90", badge: "Best Seller", reviews: 120 ,image: lavenderHero },
  { id: 2, name: "Sleep and Relaxation", desc: "Calm mind and reduce stress", price: "29.90", badge: "Popular", reviews: 98, image: sleepOil},
  { id: 3, name: "Hair Care", desc: "Nourishing hair care", price: "24.90", reviews: 76, image: hairOil},
  { id: 4, name: "Sleep Support Blend", desc: "Relaxation and better sleep", price: "24.90", reviews: 120, image: sleepSupportOil },
  { id: 5, name: "Pain and relief", desc: "Soothing body relief", price: "24.90", reviews: 120, image: painReliefOil },
  { id: 6, name: "Boost Immunity", desc: "Immune defense support", price: "24.90", reviews: 120, image:immunityOil},
  { id: 7, name: "Stress and Mood", desc: "Calm mood balance", price: "24.90", reviews: 120, image: stressOil },
 
];

function Shop() {
  const [language, setLanguage] = useState("EN");

  const addToCart = (event, product) => {
    event.preventDefault();
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="shop-page">
      <header className="navbar">
        <Link to="/" className="logo">
          <img src={logo} alt="Happy Drops" />
          <div>
            <h2>Happy</h2>
            <span>Drops</span>
          </div>
        </Link>

        <nav className="nav-links">
          <Link to="/knowledge">Knowledge</Link>
          <Link to="/workshops">Workshops</Link>
          <Link to="/therapists">Therapists</Link>
          <Link to="/suppliers">Suppliers</Link>
          <Link to="/" className="active">Shop</Link>
          <Link to="/about">About Us</Link>
        </nav>
        <div className="nav-icons">
  <a href="#" className="nav-icon">
    <HiOutlineSearch />
  </a>

  <a href="#" className="nav-icon">
    <HiOutlineUser />
  </a>

  <a href="#" className="nav-icon">
    <HiOutlineShoppingCart />
  </a>
</div>

        <div className="nav-actions">
          <span className="globe">◎</span>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>EN</option>
            <option>SI</option>
            <option>FI</option>
          </select>
          
        </div>
      </header>

      <section
  className="hero"
  style={{ backgroundImage: `url(${lavenderHero})` }}
>
  <div className="hero-text">
    <h1> Discover Natural Products for Wellness and Longevity</h1>
    <p>
      Essential oils, wellness tools,
      <br />
      nutrition support and relaxation products.
    </p>

    <a href="#featured" className="best-btn">
      Shop Best Sellers
    </a>
  </div>
</section>

      <section className="categories">
        <h2>Browse Categories</h2>
        <div className="category-list">
          <Link to="/category/all-products" className="category active">All Products</Link>
          <Link to="/category/ready-made-oils" className="category">Ready-Made Oils</Link>
          <Link to="/category/doterra-oils" className="category">doTERRA Oils</Link>
          <Link to="/category/tools" className="category">Tools</Link>
          <Link to="/category/food-supplements" className="category">Food Supplements</Link>
        </div>
      </section>

      <section className="featured-products" id="featured">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
              {product.badge && (
                <span className={`product-badge ${product.badge === "Popular" ? "purple" : "dark"}`}>
                  {product.badge}
                </span>
              )}

              <img src={product.image} alt={product.name} />

              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <div className="rating">
                  <span>★★★★★</span>
                  <small>({product.reviews})</small>
                </div>
                <h4>€ {product.price}</h4>
                <button className="cart-btn" onClick={(event) => addToCart(event, product)}>
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bundle">
        <img src={sleepSupportOil} alt="Sleep bundle" />
        <div>
          <h2>Sleep & Relaxation Bundle</h2>
          <p>Everything you need for deeper sleep and total relaxation</p>
          <div className="bundle-items">
            <span>Lavender Essential Oil</span>
            <span>Sleep Pillow</span>
            <span>Chamomile Essential Oil</span>
            <span>Relaxing Sleep Sound Pack</span>
          </div>
        </div>
        <div className="bundle-price">
          <h3>€ 79.90</h3>
          <p>€ 104.80</p>
          <span>Save 24%</span>
          <Link to="/product/bundle" className="bundle-btn">View Bundle</Link>
        </div>
      </section>

      <footer className="footer">
        <div>
          <img src={logo} alt="Nature Power" />
          <h3>NATURE POWER</h3>
          <p>Empowering people to live happier, healthier lives through the healing power of nature.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/category/all-products">Products</Link>
          <Link to="/workshops">Workshops</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div>
          <h4>Customer Care</h4>
          <p>FAQs</p>
          <p>Shipping & Delivery</p>
          <p>Returns</p>
          <p>Privacy Policy</p>
        </div>

        <div>
          <h4>Get in Touch</h4>
          <p>hello@naturepower.app</p>
          <p>+358 41 311 9098</p>
          <p>Hämeentie 135 A</p>
          <p>00560 Helsinki, Finland</p>
        </div>
      </footer>
    </div>
  );
}

export default Shop;