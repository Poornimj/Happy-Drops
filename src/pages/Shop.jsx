import { useState } from "react";
import { Link } from "react-router-dom";
import "./Shop.css";

import { HiOutlineShoppingCart } from "react-icons/hi";

import DriedLavenderHero from "../assets/images/Shop_DriedLavenderHero.jpeg?shopHero=1";
import SleepSupOil from "../assets/images/Shop_SleepSupOil.png";
 

import DewOil from "../assets/images/Shop_SkinMoistures.png";              
import TimelessOil from "../assets/images/Shop_AntiWrincles.png";         
import RadianceOil from "../assets/images/Shop_SkinTightnings.png";       
import ReleaseOil from "../assets/images/Shop_StressReliefs.png";         
import FlowOil from "../assets/images/Shop_WaistEasses.png";              
import StrideOil from "../assets/images/Shop_JointEasses.png";            
import PeaceOil from "../assets/images/Shop_SleepSupportOil.png";             
import BloomOil from "../assets/images/Shop_BoostHairGrowths.png";        
import ClarityOil from "../assets/images/Shop_TwilightDropss.png";        
import NourishOil from "../assets/images/Shop_SkinDrynesses.png";         
import CalmOil from "../assets/images/Shop_HeadacheReliefs.png";          
import FlexibilityOil from "../assets/images/Shop_JointMoves.png";       
import BalanceOil from "../assets/images/Shop_VitalGuards.png";           
import HarmonyOil from "../assets/images/Shop_Cherishmoods.png";          
import PassionOil from "../assets/images/Shop_MensEnergy.png";           
import GraceOil from "../assets/images/Shop_FeminieBalance.png";            
import JoyOil from "../assets/images/Shop_Joymoods.png";              
import PresenceOil from "../assets/images/Shop_SpiritualFocus.png";       
import VitalityOil from "../assets/images/Shop_EnergyGain.png"; 
         
// Season product images


import SummerOil from "../assets/images/Shop_MosquitoSpray.png";
import WinterOil from "../assets/images/Shop_SaunaRelaxation.png";




// Hover images 

import DewOilHover from "../assets/images/Shop_SkinMoisturesHover.png"; 
import TimelessOilHover from "../assets/images/Shop_AntiWrinclesHover.png";
import RadianceOilHover from "../assets/images/Shop_SkinTightningsHover.png";
import ReleaseOilHover from "../assets/images/Shop_StressReliefsHover.png";
import FlowOilHover from "../assets/images/Shop_WaistEassesHover.png";
import StrideOilHover from "../assets/images/Shop_JointEasesHover.png";
import PeaceOilHover from "../assets/images/Shop_SleepSupportOilHover.png";
import BloomOilHover from "../assets/images/Shop_BoostHairGrowthsHover.png";
import ClarityOilHover from "../assets/images/Shop_ConcentrationOilHover.png";
import NourishOilHover from "../assets/images/Shop_SkinCaresHover.png";
import CalmOilHover from "../assets/images/Shop_HeadacheReliefsHover.png";
import FlexibilityOilHover from "../assets/images/Shop_JointEasesHover.png";
import BalanceOilHover from "../assets/images/Shop_HealthylifeHover.png";
import HarmonyOilHover from "../assets/images/Shop_SleepSupportOilHover.png";
import PassionOilHover from "../assets/images/Shop_VitalityOilHover.png";
import GraceOilHover from "../assets/images/Shop_FeminineHover.png";
import JoyOilHover from "../assets/images/Shop_JoyMoodHover.png";
import PresenceOilHover from "../assets/images/Shop_MeditationHover.png";
import VitalityOilHover from "../assets/images/Shop_EnergyBoostHover.png";

// Season hover images


import SummerOilHover from "../assets/images/Shop_SummerOilHover.png";

import WinterOilHover from "../assets/images/Shop_WinterOilHover.png";

const products = [
  { id: 1, name: "Dew", function: "Skin Moisture", desc: "Fresh, soft, glowing,silky smooth, hydrated skin", price: "24.90", badge: "Best Seller", reviews: 120, image: DewOil, hoverImage: DewOilHover },
  { id: 2, name: "Timeless", function: "Anti-Wrinkle", desc: "Beauty that stays graceful with no limits of age", price: "19.90", badge: "Popular", reviews: 98, image: TimelessOil, hoverImage: TimelessOilHover },
  { id: 3, name: "Radiance", function: "Skin Tightening", desc: "Firm, young-looking, glowing radiant skin", price: "16.90", reviews: 76, image: RadianceOil, hoverImage: RadianceOilHover },
  { id: 4, name: "Release", function: "Neck & Shoulder Comfort", desc: "Let go of tension, stiffness, and stress", price: "17.90", reviews: 120, image: ReleaseOil, hoverImage: ReleaseOilHover },
  { id: 5, name: "Flow", function: "Waist Comfort", desc: "Easy movement quickly and body comfort", price: "22.00", reviews: 120, image: FlowOil, hoverImage: FlowOilHover },
  { id: 6, name: "Stride", function: "Joint & Knee Support", desc: "Walk and move with confidence everywhere", price: "19.90", reviews: 120, image: StrideOil, hoverImage: StrideOilHover },
  { id: 7, name: "Peace", function: "Sleep Like a Baby", desc: "Deep sleep in sweeet dreams, rest, and calm feeling", price: "21.90", reviews: 120, image: PeaceOil, hoverImage: PeaceOilHover },
  { id: 8, name: "Bloom", function: "Hair Growth", desc: "Hair growth, health, strong and vitality", price: "21.90", reviews: 120, image: BloomOil, hoverImage: BloomOilHover },
  { id: 9, name: "Clarity", function: "Concentration", desc: "Clear mind, focus, and sharp thinking", price: "22.90", reviews: 120, image: ClarityOil, hoverImage: ClarityOilHover },
  { id: 10, name: "Nourish", function: "Dry Skin Relief", desc: "Deep care for dry, cracked, and sensitive skin", price: "21.90", reviews: 98, image: NourishOil, hoverImage: NourishOilHover },
  { id: 11, name: "Calm", function: "Headache Comfort", desc: "Relaxation, balance, easy and  comfort", price: "23.90", reviews: 76, image: CalmOil, hoverImage: CalmOilHover },
  { id: 12, name: "Flexibility", function: "Joint Comfort", desc: "Better movement and joint comfort forever young", price: "24.90", reviews: 120, image: FlexibilityOil, hoverImage: FlexibilityOilHover },
  { id: 13, name: "Balance", function: "Weight Management", desc: "Support for a healthyand balanced lifestyle", price: "24.90", reviews: 120, image: BalanceOil, hoverImage: BalanceOilHover },
  { id: 14, name: "Harmony", function: "Digestive Wellness", desc: "Stomach comfort and inner balance like never before", price: "21.90", reviews: 120, image: HarmonyOil, hoverImage: HarmonyOilHover },
  { id: 15, name: "Passion", function: "Men’s Vitality", desc: "Confidence, energy, and connection with your inner self", price: "22.50", reviews: 120, image: PassionOil, hoverImage: PassionOilHover },
  { id: 16, name: "Grace", function: "Women’s Wellness", desc: "Feminine balance and self-care rituals", price: "24.00", reviews: 120, image: GraceOil, hoverImage: GraceOilHover },
  { id: 17, name: "Joy", function: "Mood Enhancement", desc: "Happiness, positivity, good mood in every moment", price: "16.90", reviews: 120, image: JoyOil, hoverImage: JoyOilHover },
  { id: 18, name: "Presence", function: "Meditation & Spirituality", desc: "Mindfulness, inner peace, spiritual focus", price: "24.90", reviews: 120, image: PresenceOil, hoverImage: PresenceOilHover },
  { id: 19, name: "Vitality", function: "Energy Boost", desc: "Natural energy and motivation boost for a vibrant life", price: "23.50", reviews: 120, image: VitalityOil, hoverImage: VitalityOilHover },
];

const seasonProducts = [

  { ...products.find((product) => product.id === 1), badge: "Spring" },
  { ...products.find((product) => product.id === 10), badge: "Spring" },

  { id: 20, name: "Mosquito Spray", function: "Summer Protection", desc: "Fresh outdoor comfort and mosquito protection", price: "18.90", badge: "Summer", reviews: 120, image: SummerOil, hoverImage: SummerOilHover },

  { ...products.find((product) => product.id === 17), badge: "Autumn" },

  { id: 21, name: "Sauna Relaxation", function: "Winter Relaxation", desc: "Warm sauna comfort, deep calm, and relaxation", price: "22.90", badge: "Winter", reviews: 120, image: WinterOil, hoverImage: WinterOilHover },

];

function Shop() {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  

  const addToCart = (event, product) => {
    event.preventDefault();
    alert(`${product.name} added to cart`);
  };

  return (
    <main className="page-shell shop-page">
      {/* hero */}
      <section
        className="hero"
      >
        <img
          className="hero-image"
          src={DriedLavenderHero}
          alt="Dried lavender hero background"
        />
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

          <a href="#seasons" className="category">
              Seasonal Oils
          </a>

          <a
            href="https://www.doterra.com/US/en/shop"
            className="category"
            target="_blank"
            rel="noopener noreferrer"
          >
            doTERRA Oils
          </a>

          <Link to="/shop/category/tools" className="category">
            Tools
          </Link>

           <Link to="/shop/food-related" className="category">
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
            <Link to={`/shop/product/${product.id}`} className="product-card" key={product.id}>
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
                
                <small className="product-function">
                  {product.function}
                </small>
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

      <section className="featured-products" id="seasons">
  <div className="featured-header">
    <h2>Seasonal Oils</h2>
  </div>

  <div className="product-grid">
    {seasonProducts.map((product) => (
      <Link to={`/shop/product/${product.id}`} className="product-card" key={product.id}>
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

          <small className="product-function">
            {product.function}
          </small>

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
    <a href="#featured" className="bundle-btn">View Bundle</a>
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
);
}

export default Shop;
