import { Link } from "react-router-dom";
import "../shared.css"
import "./Shop.css";


import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import { HiOutlineShoppingCart } from "react-icons/hi";

import DriedLavenderHero from "../assets/images/DriedLavenderHero.jpeg";


import SkinCare from "../assets/images/SkinDryness.png";
import immunityOil from "../assets/images/BoostImmunity.png";
import painReliefOil from "../assets/images/JointEase.png";
import sleepOil from "../assets/images/TwilightDrops .png";
import sleepSupportOil from "../assets/images/Cherishmood.png";
import stressOil from "../assets/images/HeadacheReleif.png";
import hairOil from "../assets/images/BoostHairGrowth.png";
import SleepSupOil from "../assets/images/SleepSupOil.png";
import SkinTightOil from "../assets/images/SkinTightning.png";


const products = [
  { id: 1, name: "Skin and Beauty", desc: "Radiant skin care", price: "24.90", badge: "Best Seller", reviews: 120 ,image: SkinCare },
  { id: 2, name: "Sleep and Relaxation", desc: "Calm mind and reduce stress", price: "29.90", badge: "Popular", reviews: 98, image: sleepOil},
  { id: 3, name: "Hair Care", desc: "Nourishing hair care", price: "26.90", reviews: 76, image: hairOil},
  { id: 4, name: "Sleep Support Blend", desc: "Relaxation and better sleep", price: "23.00", reviews: 120, image: sleepSupportOil },
  { id: 5, name: "Pain and relief", desc: "Soothing body relief", price: "22.00", reviews: 120, image: painReliefOil },
  { id: 6, name: "Boost Immunity", desc: "Immune defense support", price: "19.90", reviews: 120, image:immunityOil},
  { id: 7, name: "Stress and Mood", desc: "Calm mood balance", price: "21.90", reviews: 120, image: stressOil },
  { id: 8, name: "Skin Tightening", desc: "Firm and youthful skin", price: "27.90", reviews: 120, image: SkinTightOil },


];

function Shop() {
  

  const addToCart = (event, product) => {
    event.preventDefault();
    alert(`${product.name} added to cart`);
  };

  return (
     <>
     <div className="shop-nav-adjust">
      <Navbar />
    </div>

    <main className="page-shell shop-page">
      {/* hero */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${DriedLavenderHero})` }}
      >
        <div className="hero-text">
          <h1>Discover Natural Products for Wellness and Longevity</h1>
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

      {/* categories */}

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


       {/* featured products */}

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
                  <HiOutlineShoppingCart />
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bundle">
  <div className="bundle-visual">
    <img src={SleepSupOil} alt="Sleep and relaxation bundle" />
  </div>

  <div className="bundle-content">
    <h2>Sleep & Relaxation Bundle</h2>
    <p>Everything you need for deeper sleep and total relaxation</p>

    <div className="bundle-items">
      <span><b>✓</b> Lavender Essential Oil</span>
      <span><b>✓</b> Sleep Pillow</span>
      <span><b>✓</b> Chamomile Essential Oil</span>
      <span><b>✓</b> Relaxing Sleep Sound Pack</span>
    </div>
  </div>

  <div className="bundle-price">
    <h3>€ 79.90</h3>
    <p>€ 104.80</p>
    <span>Save 24%</span>
    <Link to="/product/bundle" className="bundle-btn">View Bundle</Link>
  </div>
</section>

<section className="benefits-strip">
  <div className="benefit">
    <span>◉</span>
    <div>
      <h4>Deep Relaxation</h4>
      <p>Calm your mind</p>
    </div>
  </div>

  <div className="benefit">
    <span>✿</span>
    <div>
      <h4>Inner Balance</h4>
      <p>Restore harmony</p>
    </div>
  </div>

  <div className="benefit">
    <span>♡</span>
    <div>
      <h4>Emotional Release</h4>
      <p>Let go, heal</p>
    </div>
  </div>

  <div className="benefit">
    <span>▣</span>
    <div>
      <h4>Fast Delivery</h4>
      <p>2-4 business days</p>
    </div>
  </div>

  <div className="benefit">
    <span>▤</span>
    <div>
      <h4>Secure Payment</h4>
      <p>Safe & encrypted</p>
    </div>
  </div>
</section>
    </main>

    <Footer />
  </>
);
}

export default Shop;