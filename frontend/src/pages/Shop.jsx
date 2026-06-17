import { useState } from "react";
import { Link } from "react-router-dom";
import "../shared.css"
import "./Shop.css";


import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import { HiOutlineShoppingCart } from "react-icons/hi";

import DriedLavenderHero from "../assets/images/DriedLavenderHero.jpeg";


import SkinCare from "../assets/images/SkinDrynesses.png";
import immunityOil from "../assets/images/VitalGuards.png";
import painReliefOil from "../assets/images/JointEasses.png";
import sleepOil from "../assets/images/TwilightDropss.png";
import sleepSupportOil from "../assets/images/Cherishmoods.png";
import stressOil from "../assets/images/HeadacheReliefs.png";
import hairOil from "../assets/images/BoostHairGrowths.png";
import SleepSupOil from "../assets/images/SleepSupOil.png";
import SkinTightOil from "../assets/images/SkinTightnings.png";
import SkinMoisture from "../assets/images/SkinMoistures.png";
import AntiWrincle from "../assets/images/AntiWrincles.png";
import StressRelief from "../assets/images/StressReliefs.png";

// import Hover images

import SkinCareHover from "../assets/images/SkinCaresHover.png";
import immunityOilHover from "../assets/images/ImmunityOilHover.png";
import painReliefOilHover from "../assets/images/JointEasesHover.png";
import sleepOilHover from "../assets/images/TwilightDropssHover.png";
import sleepSupportOilHover from "../assets/images/CherishmoodHover.png";
import stressOilHover from "../assets/images/HeadacheReliefsHover.png";
import hairOilHover from "../assets/images/BoostHairGrowthsHover.png";
import SleepSupOilHover from "../assets/images/SleepSupOilHover.jpg";
import SkinTightOilHover from "../assets/images/SkinTightningsHover.png";
import SkinMoistureHover from "../assets/images/SkinMoisturesHover.png";
import AntiWrincleHover from "../assets/images/AntiWrinclesHover.png";
import StressReliefHover from "../assets/images/StressReliefsHover.png";
import healthyhairHover from "../assets/images/healthyhairsHover.png";


const products = [
  { id: 1, name: "Skin and Beauty", desc: "Radiant skin care", price: "24.90", badge: "Best Seller", reviews: 120 ,image: SkinCare ,hoverImage: SkinCareHover },
  { id: 2, name: "Sleep and Relaxation", desc: "Calm mind and reduce stress", price: "29.90", badge: "Popular", reviews: 98, image: sleepOil , hoverImage: sleepOilHover },
  { id: 3, name: "Hair Care", desc: "Nourishing hair care", price: "26.90", reviews: 76, image: hairOil , hoverImage: hairOilHover },
  { id: 4, name: "Sleep Support", desc: "Deep restful sleep", price: "27.90", reviews: 120, image: sleepSupportOil , hoverImage: sleepSupportOilHover },
  { id: 5, name: "Pain and relief", desc: "Soothing body relief", price: "22.00", reviews: 120, image: painReliefOil , hoverImage: painReliefOilHover },
  { id: 6, name: "Boost Immunity", desc: "Immune defense support", price: "19.90", reviews: 120, image:immunityOil , hoverImage: immunityOilHover },
  { id: 7, name: "Stress and Mood", desc: "Calm mood balance", price: "21.90", reviews: 120, image: stressOil , hoverImage: stressOilHover },
  { id: 8, name: "Skin Tightening", desc: "Firm and youthful skin", price: "27.90", reviews: 120, image: SkinTightOil , hoverImage: SkinTightOilHover },
  { id: 9, name: "Skin and Beauty", desc: "Soft skin glow", price: "22.90", reviews: 120, image: SkinMoisture , hoverImage: SkinMoistureHover },
  { id: 10, name: "Anti Wrinkle Oil", desc: "Smooths skin", price: "25.90", reviews: 98, image: AntiWrincle , hoverImage: AntiWrincleHover },
  { id: 11, name: "Hair Strength Oil", desc: "Strong healthy hair", price: "27.90", reviews: 76, image: hairOil , hoverImage: healthyhairHover },
  { id: 12, name: "Mood Harmony", desc: "Calm positivity", price: "24.90", reviews: 120, image: StressRelief , hoverImage: StressReliefHover },

];

function Shop() {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  

  const addToCart = (event, product) => {
    event.preventDefault();
    alert(`${product.name} added to cart`);
  };

  return (
     <>
     
      <Navbar />
  

    <main className="page-shell shop-page">
      {/* hero */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${DriedLavenderHero})` }}
      >
        <div className="hero-text">
          <h1>
            Discover Natural Products
            <br />
            for Wellness and Longevity
          </h1>
          <p>
            Essential oils, wellness tools,nutrition support and relaxation products.
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
          <button type="button" className="category active">
            Ready-Made Oils
          </button>

          <Link to="/category/doterra-oils" className="category">
            doTERRA Oils
          </Link>

          <Link to="/category/tools" className="category">
            Tools
          </Link>

           <Link to="/category/food-supplements" className="category">
             Food Related
           </Link>
        </div>
        
      </section>
 

       {/* featured products */}

      <section className="featured-products" id="featured">
        <div className="featured-header">
           <h2>Featured Products</h2>


        </div>


        <div className="product-grid">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
              {product.badge && (
                <span className={`product-badge ${product.badge === "Popular" ? "purple" : "dark"}`}>
                  {product.badge}
                </span>
              )}

              <img
                 src={
                   hoveredProductId === product.id && product.hoverImage
                     ? product.hoverImage
                     : product.image
                }
                alt={product.name}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
             />

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