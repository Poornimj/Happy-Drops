import "./TestimonialsSection.css";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import white2Decoration from "../assets/images/white2.png";

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Emma L.",
      image: "https://i.pravatar.cc/50?img=32",
      review:
        "The personalized oil blend helped me sleep better and feel more relaxed every day.",
      bio: "Yoga instructor and wellness enthusiast passionate about natural remedies.",
      location: "San Francisco, CA",
      wellnessInterests: ["Aromatherapy", "Yoga", "Meditation"],
      workshopsAttended: 12,
      memberSince: "March 2023"
    },
    {
      name: "Sophie M.",
      image: "https://i.pravatar.cc/50?img=47",
      review:
        "Amazing workshops! Learned so much about natural wellness with my friends.",
      bio: "Holistic nutrition coach helping families achieve balanced lifestyles.",
      location: "New York, NY",
      wellnessInterests: ["Nutrition", "Herbal Medicine", "Family Wellness"],
      workshopsAttended: 8,
      memberSince: "January 2024"
    },
    {
      name: "Daniel K.",
      image: "https://i.pravatar.cc/50?img=15",
      review:
        "Finally, a wellness platform that understands my family's needs.",
      bio: "Father of three focused on creating healthy home environments.",
      location: "Austin, TX",
      wellnessInterests: ["Essential Oils", "Sleep Health", "Family Care"],
      workshopsAttended: 5,
      memberSince: "June 2024"
    },
    {
      name: "Maria R.",
      image: "https://i.pravatar.cc/50?img=23",
      review:
        "The nutrition guidance has transformed my energy levels and overall wellbeing.",
      bio: "Corporate wellness advocate bringing balance to busy professionals.",
      location: "Chicago, IL",
      wellnessInterests: ["Stress Management", "Energy Healing", "Workplace Wellness"],
      workshopsAttended: 15,
      memberSince: "September 2022"
    },
    {
      name: "James T.",
      image: "https://i.pravatar.cc/50?img=12",
      review:
        "Incredible results with the sleep sounds and relaxation techniques. Highly recommend!",
      bio: "Sleep specialist dedicated to helping people achieve restful nights.",
      location: "Seattle, WA",
      wellnessInterests: ["Sleep Science", "Sound Therapy", "Relaxation Techniques"],
      workshopsAttended: 20,
      memberSince: "November 2021"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [hoveredReviewKey, setHoveredReviewKey] = useState(null);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });
  const hoverTimerRef = useRef(null);
  const sectionRef = useRef(null);
  const testimonialsPerPage = 3;

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const closeProfileCard = () => {
    setShowCard(false);
    setSelectedProfile(null);
    setHoveredReviewKey(null);
  };

  const scheduleCloseProfileCard = () => {
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(closeProfileCard, 120);
  };

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

  const handleProfileEnter = (testimonial, reviewKey, event) => {
    clearHoverTimer();
    setSelectedProfile(testimonial);
    setHoveredReviewKey(reviewKey);

    const triggerRect = event.currentTarget.getBoundingClientRect();
    const sectionRect = sectionRef.current?.getBoundingClientRect();
    const cardWidth = 320;
    const cardHeight = 280;
    const spacing = 12;

    if (sectionRect) {
      const availableBelow = sectionRect.bottom - triggerRect.bottom;
      const availableAbove = triggerRect.top - sectionRect.top;
      const placement = availableBelow >= cardHeight + spacing
        ? "below"
        : availableAbove >= cardHeight + spacing
          ? "above"
          : availableBelow >= availableAbove
            ? "below"
            : "above";

      const triggerLeft = triggerRect.left - sectionRect.left;
      const triggerRight = triggerRect.right - sectionRect.left;
      const spaceRight = sectionRect.width - triggerLeft;
      const spaceLeft = triggerRight;
      const alignRight = spaceRight < cardWidth && spaceLeft >= cardWidth;

      const top = placement === "below"
        ? Math.min(sectionRect.height - cardHeight - spacing, triggerRect.bottom - sectionRect.top + spacing)
        : Math.max(spacing, triggerRect.top - sectionRect.top - cardHeight - spacing);

      const left = alignRight
        ? Math.max(0, Math.min(sectionRect.width - cardWidth, triggerRight - cardWidth))
        : Math.max(0, Math.min(sectionRect.width - cardWidth, triggerLeft));

      setCardPosition({ top, left });
    }

    setShowCard(true);
  };

  const handleProfileLeave = () => {
    scheduleCloseProfileCard();
  };

  const handleCardEnter = () => {
    clearHoverTimer();
    setShowCard(true);
  };

  const handleCardLeave = () => {
    scheduleCloseProfileCard();
  };

  useEffect(() => {
    return () => {
      clearHoverTimer();
    };
  }, []);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + testimonialsPerPage);

  return (
    <section className="testimonials" ref={sectionRef}>
      <img src={white2Decoration} alt="White2 decoration" className="white2-decoration" />
      <h2>Loved by Our Community</h2>

      <div className="testimonial-wrapper">
        <button className="nav-btn" onClick={handlePrev}>
          <FaChevronLeft />
        </button>

        <div className="testimonial-grid">
          {visibleTestimonials.map((item, index) => {
            const reviewKey = `${currentIndex}-${index}`;
            return (
              <div
                className={`testimonial-card ${direction === 'next' ? 'slide-fade-left' : 'slide-fade-right'}`}
                key={reviewKey}
                onAnimationEnd={() => setIsAnimating(false)}
              >
                <div className="stars">★★★★★</div>

                <p>{item.review}</p>

                <div
                  className="user-info"
                  onMouseEnter={(e) => handleProfileEnter(item, reviewKey, e)}
                  onMouseLeave={handleProfileLeave}
                >
                  <img src={item.image} alt={item.name} />
                  <span className="profile-name">{item.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button className="nav-btn" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>

      {showCard && selectedProfile && (
        <div
          className="profile-card"
          style={{
            top: cardPosition.top,
            left: cardPosition.left
          }}
          onMouseEnter={handleCardEnter}
          onMouseLeave={handleCardLeave}
        >
          <div className="card-header">
            <img src={selectedProfile.image} alt={selectedProfile.name} className="card-profile-image" />
            <div className="card-info">
              <h3 className="card-name">{selectedProfile.name}</h3>
              <div className="card-rating">
                <span className="card-stars">⭐</span>
                <span className="card-rating-text">4.9</span>
              </div>
            </div>
          </div>
          <div className="card-body">
            <p className="card-review">"{selectedProfile.review}"</p>
          </div>
          <div className="card-footer">
            <div className="card-likes">
              <FaHeart />
              <span>24</span>
            </div>
            <button className="card-cta">View Profile</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default TestimonialsSection;