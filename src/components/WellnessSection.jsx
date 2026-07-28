import "./WellnessSection.css";
import "../styles/ScrollReveal.css";
import useScrollReveal from "../hooks/useScrollReveal";
import { useState, useEffect, useRef } from "react";
import {
  LuHeartHandshake,
  LuHeartPulse,
  LuLeaf,
  LuMoon,
  LuShieldPlus,
  LuSparkles,
} from "react-icons/lu";
import sleep from "../assets/images/sleep.png";
import skin from "../assets/images/skin.png";
import boost from "../assets/images/boost.png";
import hairgrowth from "../assets/images/hairgrowth.png";
import stress from "../assets/images/stress.png";
import painrelief from "../assets/images/painrelief.png";
import { Link } from "react-router-dom";

function WellnessSection() {
  const [titleRef, titleVisible] = useScrollReveal();
  const [subtitleRef, subtitleVisible] = useScrollReveal();
  const [buttonRef, buttonVisible] = useScrollReveal();

  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const allCards = [
  {
    icon: <LuMoon size={40} strokeWidth={1.8} />,
    title: "Sleep & Relaxation",
    description: "Better sleep, calm mind",
    color: "card-1",
    image: sleep,
    hasBackgroundImage: true,
  },
  {
    icon: <LuSparkles size={40} strokeWidth={1.8} />,
    title: "Skin & Beauty",
    description: "Healthy, glowing skin",
    color: "card-2",
    image: skin,
    hasBackgroundImage: true,
  },
  {
    icon: <LuShieldPlus size={40} strokeWidth={1.8} />,
    title: "Boost Immunity",
    description: "Stronger immunity, better health",
    color: "card-3",
    image: boost,
    hasBackgroundImage: true,
  },
  {
    icon: <LuLeaf size={40} strokeWidth={1.8} />,
    title: "Hair Growth",
    description: "Healthy hair growth & scalp care",
    color: "card-4",
    image: hairgrowth,
    hasBackgroundImage: true,
  },
  {
    icon: <LuHeartHandshake size={40} strokeWidth={1.8} />,
    title: "Stress & Mood",
    description: "Balance mood, reduce stress",
    color: "card-5",
    image: stress,
    hasBackgroundImage: true,
  },
  {
    icon: <LuHeartPulse size={40} strokeWidth={1.8} />,
    title: "Pain Relief",
    description: "Natural relief from pain",
    color: "card-6",
    image: painrelief,
    hasBackgroundImage: true,
  },
];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allCards.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [allCards.length]);

  return (
    <section className="wellness-section" ref={sectionRef}>
      <h2
        className="scroll-reveal"
        ref={titleRef}
        style={{
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible
            ? "translateY(0)"
            : "translateY(40px)",
        }}
      >
        Wellness & Self-Care, Tailored to You
      </h2>

      <p
        className="wellness-subtitle scroll-reveal"
        ref={subtitleRef}
        style={{
          opacity: subtitleVisible ? 1 : 0,
          transform: subtitleVisible
            ? "translateY(0)"
            : "translateY(40px)",
        }}
      >
        Discover personalized wellness solutions designed to support
        long-term health, vitality, and prevention through natural
        ingredients, lifestyle medicine, and holistic wellbeing
        practices.
      </p>

      <div className="wellness-container">
        <div className="premium-carousel">
          {allCards.map((card, index) => {
            let position = index - activeIndex;

            if (position < -3) position += allCards.length;
            if (position > 3) position -= allCards.length;

            return (
              <div
                key={index}
                className={`premium-card ${card.color} ${card.hasBackgroundImage ? 'has-background' : ''} pos-${position}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="card-icon">
                {card.icon}
              </div>

              <div className="card-content">
                <h3>{card.title}</h3>

                <div className="card-divider"></div>

                <p>{card.description}</p>
              </div>

                {!card.hasBackgroundImage && (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-bottom-image"
                  />
                )}
              </div>
            );
          })}
        </div>

        <Link
          to="/knowledge"
          className="concerns-btn scroll-reveal"
          ref={buttonRef}
          style={{
            opacity: buttonVisible ? 1 : 0,
            transform: buttonVisible
              ? "translateY(0)"
              : "translateY(40px)",
          }}
        >
          View All Concerns
        </Link>
      </div>
    </section>
  );
}

export default WellnessSection;
