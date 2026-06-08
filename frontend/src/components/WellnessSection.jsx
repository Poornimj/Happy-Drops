import "./WellnessSection.css";
import "../styles/ScrollReveal.css";
import lavenderbranch from "../assets/images/lavenderbranch.png";
import useScrollReveal from "../hooks/useScrollReveal";
import { useState, useEffect, useRef } from "react";

function WellnessSection() {
  const [titleRef, titleVisible] = useScrollReveal();
  const [subtitleRef, subtitleVisible] = useScrollReveal();
  const [buttonRef, buttonVisible] = useScrollReveal();
  const allCards = [
    {
      title: "Sleep & Relaxation",
      description: "Better sleep, calm mind",
    },
    {
      title: "Skin & Beauty",
      description: "Healthy, glowing skin",
    },
    {
      title: "Boost Immunity",
      description: "Stronger immunity, better health",
    },
    {
      title: "Hair Growth & Scalp Care",
      description:
        "Healthy hair growth",
    },
    {
      title: "Stress & Mood",
      description: "Balance mood, reduce stress",
    },
    {
      title: "Pain & Relief",
      description: "Natural relief from pain",
    },
    {
      title: "Hair Care",
      description: "Stronger, healthier hair",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkCenterCard = () => {
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      const cards = container.querySelectorAll('.wellness-card');
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(centerX - cardCenterX);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index % allCards.length;
        }
      });

      setActiveIndex(closestIndex);
    };

    const interval = setInterval(checkCenterCard, 100);

    return () => clearInterval(interval);
  }, [allCards.length]);

  // Duplicate cards for infinite scroll effect
  const duplicatedCards = [...allCards, ...allCards, ...allCards];

  return (
    <section className="wellness-section">
      <img src={lavenderbranch} alt="Lavender branch decoration" className="lavender-decoration-left" />
      <img src={lavenderbranch} alt="Lavender branch decoration" className="lavender-decoration-right" />
      
      <h2 className="scroll-reveal" ref={titleRef} style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(40px)' }}>Wellness & Self-Care, Tailored to You</h2>

      <p className="wellness-subtitle scroll-reveal" ref={subtitleRef} style={{ opacity: subtitleVisible ? 1 : 0, transform: subtitleVisible ? 'translateY(0)' : 'translateY(40px)' }}>
        Discover personalized wellness solutions designed to support long-term health, vitality, and prevention through natural ingredients, lifestyle medicine, and holistic wellbeing practices.
      </p>

      <div className="divider">
        <span></span>
        🌿
        <span></span>
      </div>

      <div className="wellness-container">
        <div className="wellness-cards-container" ref={containerRef}>
          <div className="wellness-cards-wrapper">
            {duplicatedCards.map((card, index) => (
              <div
                className={`wellness-card ${index % allCards.length === activeIndex ? "active" : ""}`}
                key={index}
              >
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="concerns-btn scroll-reveal" ref={buttonRef} style={{ opacity: buttonVisible ? 1 : 0, transform: buttonVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          View All Concerns
        </button>
      </div>
    </section>
  );
}

export default WellnessSection;