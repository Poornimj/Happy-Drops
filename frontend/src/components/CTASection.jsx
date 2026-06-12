import "./CTASection.css";
import ctaImage from "../assets/images/CTAbanner.jpg";
import { useNavigate } from "react-router-dom";

function CTASection() {
  const navigate = useNavigate();

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
    <section className="cta-section">
      <div className="leaf-decoration-left"></div>
      <div className="leaf-decoration-right"></div>

      <img
        src={ctaImage}
        alt="Wellness Journey"
        className="cta-image"
      />

      <div className="cta-content">
        <h2>Start your natural wellness journey today!</h2>

        <p>
          Join thousands of happy customers living healthier lives.
        </p>
      </div>

      <div className="cta-buttons">
        <button className="recommend-btn" onClick={handleAssessmentClick}>
          🌿 Free Health Assessment
        </button>

        <button className="workshop-btn">
          👜 Book a Workshop
        </button>
      </div>
    </section>
  );
}

export default CTASection;