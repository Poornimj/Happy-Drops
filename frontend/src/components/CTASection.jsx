import "./CTASection.css";
import ctaImage from "../assets/images/CTAbanner.jpg";
import { useState } from "react";
import WellnessAssessmentModal from "./WellnessAssessmentModal";

function CTASection() {
  const [showAssessment, setShowAssessment] = useState(false);

  const handleAssessmentClick = () => {
    setShowAssessment(true);
  };

  return (
    <>
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

      {showAssessment && (
        <WellnessAssessmentModal
          isOpen={showAssessment}
          onClose={() => setShowAssessment(false)}
        />
      )}
    </>
  );
}

export default CTASection;