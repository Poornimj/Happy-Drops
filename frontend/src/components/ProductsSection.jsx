import "./ProductsSection.css";
import "../styles/ScrollReveal.css";
import FallingParticles from "./FallingParticles";
import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

import essentialOil from "../assets/images/essential-oils.png";
import nutrition from "../assets/images/nutritions.jpg";
import sleepSounds from "../assets/images/sleep-sounds.png";
import wellnessAccessories from "../assets/images/Accessories.png";
import leafOnly from "../assets/images/leaveonly.png";

function ProductsSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [titleRef, titleVisible] = useScrollReveal();
  const [dividerRef, dividerVisible] = useScrollReveal();
  const [gridRef, gridVisible] = useScrollReveal();
  const [buttonRef, buttonVisible] = useScrollReveal();
  const products = [
    {
      image: essentialOil,
      title: "Essential Oils",
      description: "Personalized blends",
    },
    {
      image: nutrition,
      title: "Nutritions",
      description: "Whole-body support",
    },
    {
      image: sleepSounds,
      title: "Sleep Sounds",
      description: "Therapeutic audio",
    },
    {
      image: wellnessAccessories,
      title: "Wellness Tools & Accessories",
      description: "Massage tools, sleep aids & care products",
    },
  ];

  return (
    <section
      className="products-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FallingParticles active={isHovered} />
      <h2 className="scroll-reveal" ref={titleRef} style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(40px)' }}>Explore Our Products</h2>

      <div className="leaf-divider scroll-reveal" ref={dividerRef} style={{ opacity: dividerVisible ? 1 : 0, transform: dividerVisible ? 'translateY(0)' : 'translateY(40px)' }}>
  ──── 🌿 ────
      </div>

      <div className="products-grid scroll-reveal" ref={gridRef} style={{ opacity: gridVisible ? 1 : 0, transform: gridVisible ? 'translateY(0)' : 'translateY(40px)' }}>
        {products.map((product, index) => (
          <a href={`/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`} className="product-card" key={index}>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />

            <h3>{product.title}</h3>

            <p>{product.description}</p>
          </a>
        ))}
      </div>

      <button className="products-btn scroll-reveal" ref={buttonRef} style={{ opacity: buttonVisible ? 1 : 0, transform: buttonVisible ? 'translateY(0)' : 'translateY(40px)' }}>
        View All Products
      </button>

      <img src={leafOnly} alt="Leaf decoration" className="leaf-decoration" />
    </section>
  );
}

export default ProductsSection;