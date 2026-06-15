import "./HowItWorks.css";
import "../styles/ScrollReveal.css";
import greenleaf from "../assets/images/greenleaf.png";
import useScrollReveal from "../hooks/useScrollReveal";

import {
  HiOutlineUser,
  HiOutlineClipboardDocumentList,
  HiOutlineLightBulb,
  HiOutlineShoppingBag,
} from "react-icons/hi2";

function HowItWorks() {
  const [titleRef, titleVisible] = useScrollReveal();
  const [timelineRef, timelineVisible] = useScrollReveal();
  const steps = [
    {
      icon: <HiOutlineUser />,
      title: "Create Your Profile",
      description:
        "Tell us about yourself and your wellness goals",
    },
    {
      icon: <HiOutlineClipboardDocumentList />,
      title: "Select Your Concerns",
      description:
        "Share your symptoms, preferences & allergies",
    },
    {
      icon: <HiOutlineLightBulb />,
      title: "Get AI Recommendation",
      description:
        "Receive personalized oil recipes and wellness plan",
    },
    {
      icon: <HiOutlineShoppingBag />,
      title: "Shop or Book",
      description:
        "Purchase products or book a workshop",
    },
  ];

  return (
    <section className="how-it-works">
      <img src={greenleaf} alt="Green leaf decoration" className="greenleaf-decoration-left" />
      <img src={greenleaf} alt="Green leaf decoration" className="greenleaf-decoration-right" />
      
      <h2 className="scroll-reveal" ref={titleRef} style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(40px)' }}>How It Works</h2>

      <div className="timeline scroll-reveal" ref={timelineRef} style={{ opacity: timelineVisible ? 1 : 0, transform: timelineVisible ? 'translateY(0)' : 'translateY(40px)' }}>
        {steps.map((step, index) => (
          <div className="step" key={index}>
            <div className="step-icon">
              {step.icon}
            </div>

            {index < steps.length - 1 && (
              <div className="connector"></div>
            )}

            <div className="step-info">
              <div className="step-text">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;