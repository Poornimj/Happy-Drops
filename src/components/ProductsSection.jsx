import "./ProductsSection.css";
import "../styles/ScrollReveal.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

import essentialOil from "../assets/images/essential-oils.png";
import nutrition from "../assets/images/nutritions.jpg";
import sleepSounds from "../assets/images/sleep-sounds.png";
import wellnessAccessories from "../assets/images/Accessories.png";
import leafOnly from "../assets/images/leaveonly.png";

function ProductsSection() {
  const [titleRef, titleVisible] = useScrollReveal();
  const [gridRef, gridVisible] = useScrollReveal();
  const [buttonRef, buttonVisible] = useScrollReveal();
  const products = [
    {
      image: essentialOil,
      title: "Essential Oils",
      description: "Personalized blends",
      price: 49,
    },
    {
      image: nutrition,
      title: "Nutritions",
      description: "Whole-body support",
      price: 39,
    },
    {
      image: sleepSounds,
      title: "Sleep Sounds",
      description: "Therapeutic audio",
      price: 18,
    },
    {
      image: wellnessAccessories,
      title: "Wellness Tools & Accessories",
      description: "Massage tools, sleep aids & care products",
      price: 32,
    },
  ];

  return (
    <section className="products-section">
      <h2 className="scroll-reveal" ref={titleRef} style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(40px)' }}>Explore Our Products</h2>

      <div className="products-grid scroll-reveal" ref={gridRef} style={{ opacity: gridVisible ? 1 : 0, transform: gridVisible ? 'translateY(0)' : 'translateY(40px)' }}>
        {products.map((product, index) => (
          <Link
            to="/shop"
            className="product-card"
            key={index}
          >
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />

            <h3>{product.title}</h3>

            <p>{product.description}</p>
            <span className="product-price">From €{product.price.toFixed(2)}</span>
            <span className="product-buy-action">Buy now</span>
          </Link>
        ))}
      </div>

      <Link to="/shop" className="products-btn scroll-reveal" ref={buttonRef} style={{ opacity: buttonVisible ? 1 : 0, transform: buttonVisible ? 'translateY(0)' : 'translateY(40px)' }}>
        View All Products
      </Link>

      <img src={leafOnly} alt="Leaf decoration" className="leaf-decoration" />
    </section>
  );
}

export default ProductsSection;
