import "./TestimonialsSection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import white2Decoration from "../assets/images/white2.png";

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Emma L.",
      image: "https://i.pravatar.cc/50?img=32",
      review:
        "The personalized oil blend helped me sleep better and feel more relaxed every day.",
    },
    {
      name: "Sophie M.",
      image: "https://i.pravatar.cc/50?img=47",
      review:
        "Amazing workshops! Learned so much about natural wellness with my friends.",
    },
    {
      name: "Daniel K.",
      image: "https://i.pravatar.cc/50?img=15",
      review:
        "Finally, a wellness platform that understands my family's needs.",
    },
    {
      name: "Maria R.",
      image: "https://i.pravatar.cc/50?img=23",
      review:
        "The nutrition guidance has transformed my energy levels and overall wellbeing.",
    },
    {
      name: "James T.",
      image: "https://i.pravatar.cc/50?img=12",
      review:
        "Incredible results with the sleep sounds and relaxation techniques. Highly recommend!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialsPerPage = 3;

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("prev");
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? testimonials.length - testimonialsPerPage : newIndex;
    });
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("next");
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex > testimonials.length - testimonialsPerPage ? 0 : newIndex;
    });
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + testimonialsPerPage);

  return (
    <section className="testimonials">
      <img src={white2Decoration} alt="White2 decoration" className="white2-decoration" />
      <h2>Loved by Our Community</h2>

      <div className="leaf-divider">
        ───── 🌿 ─────
      </div>

      <div className="testimonial-wrapper">
        <button className="nav-btn" onClick={handlePrev}>
          <FaChevronLeft />
        </button>

        <div className="testimonial-grid">
          {visibleTestimonials.map((item, index) => (
            <div 
              className={`testimonial-card ${direction === 'next' ? 'slide-fade-left' : 'slide-fade-right'}`} 
              key={`${currentIndex}-${index}`}
              onAnimationEnd={() => setIsAnimating(false)}
            >
              <div className="stars">★★★★★</div>

              <p>{item.review}</p>

              <div className="user-info">
                <img src={item.image} alt={item.name} />

                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-btn" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default TestimonialsSection;