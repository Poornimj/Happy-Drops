import "./Hero.css";
import "../styles/ScrollReveal.css";
import useScrollReveal from "../hooks/useScrollReveal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LavenderParticles from "./LavenderParticles";

function Hero() {
  const navigate = useNavigate();
  const [taglineRef, taglineVisible] = useScrollReveal();
  const [titleRef, titleVisible] = useScrollReveal();
  const [descriptionRef, descriptionVisible] = useScrollReveal();
  const [buttonsRef, buttonsVisible] = useScrollReveal();
  const [particlesActive, setParticlesActive] = useState(true);

  const handleAssessmentClick = () => {
    // TODO: Implement actual authentication check
    const isLoggedIn = true; // Replace with actual auth check
    
    if (isLoggedIn) {
      navigate('/wellness-assessment');
    } else {
      navigate('/signin');
    }
  };

  return (
    <section className="hero">

      <LavenderParticles active={particlesActive} />
      <div className="leaf-decoration-left"></div>
      <div className="leaf-decoration-right"></div>

      <div className="hero-left">

        <p className="hero-tagline scroll-reveal" ref={taglineRef} style={{ opacity: taglineVisible ? 1 : 0, transform: taglineVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          EMPOWERING WELLNESS NATURALLY
        </p>

        <h1 className="hero-title scroll-reveal" ref={titleRef} style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          Personalized Wellness,
          <br />
          Designed for
          <br />
          Longevity
        </h1>

        <p className="hero-description scroll-reveal" ref={descriptionRef} style={{ opacity: descriptionVisible ? 1 : 0, transform: descriptionVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          Discover tailored essential oil recipes,
          nutrition guidance, and wellness tools
          for a happier, healthier you and your family.
        </p>

        <div className="hero-buttons scroll-reveal" ref={buttonsRef} style={{ opacity: buttonsVisible ? 1 : 0, transform: buttonsVisible ? 'translateY(0)' : 'translateY(40px)' }}>

          <button className="primary-btn" onClick={handleAssessmentClick}>
            🌿 Free Health Assessment
          </button>

          <button className="secondary-btn">
            👜 Book a Workshop
          </button>

          <button className="secondary-btn">
            🛍️ Explore Products
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;