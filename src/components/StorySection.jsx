import "./StorySection.css";
import "../styles/ScrollReveal.css";
import storyBg from "../assets/images/welcomebackground.png.png";
import useScrollReveal from "../hooks/useScrollReveal";

import {
  FaLeaf,
  FaSpa,
  FaHeart,
  FaUsers,
} from "react-icons/fa";

function StorySection() {
  const [titleRef, titleVisible] = useScrollReveal();
  const [centerRef, centerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal();
  return (
    <section className="story-section">
      <h2 className="scroll-reveal" ref={titleRef} style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(40px)' }}>
        Rooted in <span className="nature">Nature</span>,
        <br />
        Growing <span className="wellness">Wellness</span> Together
      </h2>

      <div className="story-center scroll-reveal" ref={centerRef} style={{ opacity: centerVisible ? 1 : 0 }}>
        <p>
          Happy Drops helps individuals and families improve their wellbeing
          through personalized essential oils, nutrition guidance, lifestyle
          rituals, and holistic wellness solutions that combine Eastern
          wisdom and Western science.
        </p>
      </div>

      <div
        className="story-content"
        style={{ backgroundImage: `url(${storyBg})` }}
      >
        {/* Left Top */}
        <div className="story-card natural-card scroll-reveal" ref={cardsRef} style={{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          <div className="icon-circle green">
            <FaLeaf />
          </div>
          <h3>Natural Daily Care</h3>
        </div>

        {/* Left Bottom */}
        <div className="story-card sustainability-card scroll-reveal" ref={cardsRef} style={{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          <div className="icon-circle green">
            <FaSpa />
          </div>
          <h3>Guided Wellness Workshops</h3>
        </div>

        {/* Right Top */}
        <div className="story-card family-card scroll-reveal" ref={cardsRef} style={{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          <div className="icon-circle purple">
            <FaHeart />
          </div>
          <h3>Family <span className="break-line">Well-being</span></h3>
        </div>

        {/* Right Bottom */}
        <div className="story-card community-card scroll-reveal" ref={cardsRef} style={{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          <div className="icon-circle purple">
            <FaUsers />
          </div>
          <h3>Trusted Community</h3>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
