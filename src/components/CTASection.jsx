import "./CTASection.css";
import ctaImage from "../assets/images/CTAbanner.jpg";
import { useState } from "react";
import WellnessAssessmentModal from "./WellnessAssessmentModal";
import { HeartPulse, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

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
            <span className="icon-wrapper"><HeartPulse size={16} /></span>
            Free Health Assessment
          </button>

          <Link className="workshop-btn" to="/workshops">
            <span className="icon-wrapper"><CalendarDays size={16} /></span>
            Book a Workshop
          </Link>
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
