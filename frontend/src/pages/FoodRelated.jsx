import { useState } from "react";
import { Link } from "react-router-dom";
import "./Shop.css";

import foodHero from "../assets/images/FoodHero.png";

import magicSauce from "../assets/images/magicSauce.png";
import biotinSupplement from "../assets/images/BiotinSupplement.png";
import oliveOil from "../assets/images/OliveOil.png";
import hempSeedOil from "../assets/images/HempSeedOil.png";

const foodProducts = [
  {
    id: 101,
    name: "Magic Sauce",
    description:
      "A fresh herb sauce made with rapeseed oil, parsley, dill, lemon, and mild Nordic seasonings. Suitable for salads, roasted vegetables, and everyday meals.",
    amount: "250 ml",
    price: "18.90",
    image: magicSauce,
  },
  {
    id: 102,
    name: "Biotin Beauty Supplement",
    description:
      "A daily food supplement containing biotin. Designed to complement a varied and balanced diet. Follow the recommended daily serving shown on the packaging.",
    amount: "60 capsules",
    price: "19.90",
    image: biotinSupplement,
  },
  {
    id: 103,
    name: "Extra Virgin Olive Oil",
    description:
      "A cold-extracted extra virgin olive oil with a mild, fruity flavour. Suitable for salads, dressings, dipping, and low-to-medium heat cooking.",
    amount: "500 ml",
    price: "24.90",
    image: oliveOil,
  },
  {
    id: 104,
    name: "Hemp Seed Oil",
    description:
      "A cold-pressed culinary hemp seed oil with a mild, nutty flavour. Suitable for salads, smoothies, dressings, and finishing prepared meals. Not intended for high-heat frying.",
    amount: "250 ml",
    price: "22.90",
    image: hempSeedOil,
  },
];


function FoodRelated() {
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (productId, quantity) => {
    setQuantities((current) => ({
      ...current,
      [productId]: Number(quantity),
    }));
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    alert(`${quantity} × ${product.name} added to cart`);
  };

  return (
    <main className="page-shell food-page">
         <section className="food-hero">
           <div className="food-hero-content">
              <h1>Food Related Products</h1>

              <p>
                Explore carefully selected culinary oils, supplements, and natural
                products designed to complement a balanced everyday lifestyle.
              </p>

            <Link to="/shop" className="back-link">
             Back to Shop
            </Link>
         </div>

         <div className="food-hero-image-wrap">
           <img
            className="food-hero-image"
            src={foodHero}
            alt="Natural food and wellness products"
           />
         </div>
        </section>

         

        <div className="food-product-list">
          {foodProducts.map((product) => {
            const quantity = quantities[product.id] || 1;

            return (
              <section className="food-product" key={product.id}>
                <div className="food-product-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="food-product-info">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>

                  <p className="food-amount">
                    <strong>Amount:</strong> {product.amount}
                  </p>

                  <h3>€ {product.price}</h3>

                  <label>
                    Quantity
                    <select
                      value={quantity}
                      onChange={(event) =>
                        updateQuantity(product.id, event.target.value)
                      }
                    >
                      {Array.from({ length: 20 }, (_, index) => {
                        const value = index + 1;

                        return (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  </label>

                  <button
                    type="button"
                    className="detail-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </section>
            );
          })}
        </div>
    </main>
  );
}

export default FoodRelated;
