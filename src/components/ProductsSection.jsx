import "./ProductsSection.css";
import "../styles/ScrollReveal.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

import essentialOil from "../assets/images/essential-oils.png";
import nutrition from "../assets/images/nutritions.png";
import sleepSounds from "../assets/images/sleep-sounds-new.png";
import wellnessAccessories from "../assets/images/Accessories.png";
import leafOnly from "../assets/images/leaveonly.png";

function ProductsSection() {
  const [titleRef, titleVisible] = useScrollReveal();
  const [gridRef, gridVisible] = useScrollReveal();
  const [buttonRef, buttonVisible] = useScrollReveal();
  const carouselRef = useRef(null);
  const [activeProduct, setActiveProduct] = useState(0);
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

  const scrollToProduct = (index) => {
    const card = carouselRef.current?.children[index];
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setActiveProduct(index);
  };

  const handleProductScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    const closestIndex = Array.from(carousel.children).reduce(
      (closest, card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        return Math.abs(cardCenter - carouselCenter) < closest.distance
          ? { index, distance: Math.abs(cardCenter - carouselCenter) }
          : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    ).index;

    setActiveProduct(closestIndex);
  };

  return (
    <section className="products-section">
      <h2 className="scroll-reveal" ref={titleRef} style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(40px)' }}>Explore Our Products</h2>

      <div
        className="products-grid scroll-reveal"
        ref={(node) => {
          gridRef.current = node;
          carouselRef.current = node;
        }}
        onScroll={handleProductScroll}
        style={{ opacity: gridVisible ? 1 : 0, transform: gridVisible ? 'translateY(0)' : 'translateY(40px)' }}
      >
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
          </Link>
        ))}
      </div>

      <div className="products-carousel-dots" aria-label="Choose a product category">
        {products.map((product, index) => (
          <button
            type="button"
            className={activeProduct === index ? "active" : ""}
            aria-label={`Show ${product.title}`}
            aria-current={activeProduct === index ? "true" : undefined}
            onClick={() => scrollToProduct(index)}
            key={product.title}
          />
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
