import "./StorySection.css";
import "../styles/ScrollReveal.css";
import storyBg from "../assets/images/welcomebackground.png.png";
import useScrollReveal from "../hooks/useScrollReveal";

import {
  FaLeaf,
  FaRecycle,
  FaHeart,
  FaUsers,
} from "react-icons/fa";

function StorySection() {
  const [subtitleRef, subtitleVisible] = useScrollReveal();
  const [titleRef, titleVisible] = useScrollReveal();
  const [centerRef, centerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal();
  return (
    <section className="story-section">
      <h4 className="scroll-reveal" ref={subtitleRef} style={{ opacity: subtitleVisible ? 1 : 0, transform: subtitleVisible ? 'translateY(0)' : 'translateY(40px)' }}>🌿 OUR STORY</h4>

      <h2 className="scroll-reveal" ref={titleRef} style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(40px)' }}>
        Rooted in <span className="nature">Nature</span>,
        <br />
        Growing <span className="wellness">Wellness</span> Together
      </h2>

      <div
        className="story-content"
        style={{ backgroundImage: `url(${storyBg})` }}
      >
        <div className="story-center scroll-reveal" ref={centerRef} style={{ opacity: centerVisible ? 1 : 0, transform: centerVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          <p>
            Happy Drops helps individuals and families improve their wellbeing
            through personalized essential oils, nutrition guidance, lifestyle
            medicine, and holistic wellness solutions that combine Eastern
            wisdom and Western science.
          </p>
        </div>

        {/* Left Top */}
        <div className="story-card natural-card scroll-reveal" ref={cardsRef} style={{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          <div className="icon-circle green">
            <FaLeaf />
          </div>

          <h3>Natural Ingredients</h3>

          <p>
            Beyond essential oils, we provide nutrition guidance and practical wellness solutions to help you understand what to eat and how to support your health naturally.
          </p>
        </div>

        {/* Left Bottom */}
        <div className="story-card sustainability-card scroll-reveal" ref={cardsRef} style={{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          <div className="icon-circle green">
            <FaRecycle />
          </div>

          <h3>Sustainability</h3>

          <p>
            Committed to responsible sourcing, eco-friendly practices, and creating a healthier future for people and the planet.
          </p>
        </div>

        {/* Right Top */}
        <div className="story-card family-card scroll-reveal" ref={cardsRef} style={{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          <div className="icon-circle purple">
            <FaHeart />
          </div>

          <h3>Family Wellness</h3>

          <p>
            Thoughtfully designed wellness solutions that support every family member, from children to grandparents.
          </p>
        </div>

        {/* Right Bottom */}
        <div className="story-card community-card scroll-reveal" ref={cardsRef} style={{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)' }}>
          <div className="icon-circle purple">
            <FaUsers />
          </div>

          <h3>Community</h3>

          <p>
            Building a supportive wellness community where people can learn, share experiences, and grow together.
          </p>
        </div>
      </div>
    </section>
  );
}

export default StorySection;