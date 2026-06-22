import "./Hero.css";
import { useState } from "react";

import WellnessAssessmentModal from "./WellnessAssessmentModal";
import LavenderParticles from "./LavenderParticles";
import { HeartPulse, CalendarDays, ShoppingBag } from "lucide-react";

function Hero() {
  const [particlesActive] = useState(true);
  const [showAssessment, setShowAssessment] = useState(false);

  const handleAssessmentClick = () => {
    setShowAssessment(true);
  };

  return (
    <>
      <section className="hero">

        <LavenderParticles active={particlesActive} />

        <div className="leaf-decoration-left"></div>
        <div className="leaf-decoration-right"></div>

        <div className="hero-left">

          <p className="hero-tagline">
            EMPOWERING WELLNESS NATURALLY
          </p>

          <h1 className="hero-title">
            Personalized Wellness,
            <br />
            Designed for
            <br />
            Longevity
          </h1>

          <p className="hero-description">
            Discover tailored essential oil recipes,
            nutrition guidance, and wellness tools
            for a happier, healthier you and your family.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={handleAssessmentClick}
            >
              <HeartPulse size={18} />
              Free Health Assessment
            </button>

            <button className="secondary-btn">
              <CalendarDays size={18} />
              Book a Workshop
            </button>

            <button className="secondary-btn">
              <ShoppingBag size={18} />
              Explore Products
            </button>

          </div>

        </div>

      </section>

      {showAssessment && (
        <WellnessAssessmentModal
          isOpen={showAssessment}
          onClose={() => setShowAssessment(false)}
        />
      )}
    </>
  );
}

export default Hero;