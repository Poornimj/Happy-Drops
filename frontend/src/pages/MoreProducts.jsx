import { Link } from "react-router-dom";
import "../shared.css";
import "./Shop.css";
import "./MoreProducts.css";

import { HiOutlineShoppingCart } from "react-icons/hi";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import SkinMoisture from "../assets/images/SkinMoistures.png";
import AntiWrincle from "../assets/images/AntiWrincles.png";
import hairOil from "../assets/images/BoostHairGrowths.png";
import StressRelief from "../assets/images/StressReliefs.png";
import moreHero from "../assets/images/FamilyApplying.png";

const moreProducts = [
  { id: 8, name: "Skin and Beauty", desc: "Soft skin glow", price: "22.90", reviews: 120, image: SkinMoisture },
  { id: 9, name: "Anti Wrinkle Oil", desc: "Smooths skin", price: "25.90", reviews: 98, image: AntiWrincle },
  { id: 10, name: "Hair Strength Oil", desc: "Strong healthy hair", price: "27.90", reviews: 76, image: hairOil },
  { id: 11, name: "Mood Harmony", desc: "Calm positivity", price: "24.90", reviews: 120, image: StressRelief },
];

function MoreProducts() {
  const addToCart = (event, product) => {
    event.preventDefault();
    alert(`${product.name} added to cart`);
  };

  return (
    <>
      <Navbar />
      <main className="page-shell shop-page">
        <section
          className="hero more-products-hero"
          
>
          <div className="hero-text">
            <h1>Explore More Natural Wellness Picks</h1>
            <p>
              Discover extra oils and blends for skin, hair,
              <br />
              mood, and everyday care.
           </p>

           <a href="#more-products" className="best-btn">
               Browse Products
           </a>
         </div>
         <img className="more-hero-img" src={moreHero} alt="Natural wellness products" />
       </section>

       <section className="featured-products" id="more-products">
         <div className="featured-header">
           <h2>More Products</h2>
            <Link to="/" className="see-more-btn">
            Back to Shop
            </Link>
             </div>
             <div className="product-grid">
  
            {moreProducts.map((product) => (
              <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
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
      </main>

      <Footer />
    </>
  );
}

export default MoreProducts;