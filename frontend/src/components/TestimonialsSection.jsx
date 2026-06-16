import "./TestimonialsSection.css";
import { FaChevronLeft, FaChevronRight, FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaHeart } from "react-icons/fa";
import { useState } from "react";
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
  const [showPopup, setShowPopup] = useState(false);
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

  const handleProfileClick = (testimonial, event) => {
    event.stopPropagation();
    setSelectedProfile(testimonial);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedProfile(null);
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + testimonialsPerPage);

  return (
    <section className="testimonials">
      <img src={white2Decoration} alt="White2 decoration" className="white2-decoration" />
      <h2>Loved by Our Community</h2>

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

              <div className="user-info" onClick={(e) => handleProfileClick(item, e)}>
                <img src={item.image} alt={item.name} />

                <span className="profile-name">{item.name}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-btn" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>

      {showPopup && selectedProfile && (
        <div className="profile-popup-overlay" onClick={closePopup}>
          <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
            <div className="botanical-decoration top-left"></div>
            <div className="botanical-decoration top-right"></div>
            <div className="botanical-decoration bottom-left"></div>
            <div className="botanical-decoration bottom-right"></div>
            <button className="popup-close-btn" onClick={closePopup}>
              <FaTimes />
            </button>
            <div className="popup-header">
              <img src={selectedProfile.image} alt={selectedProfile.name} className="popup-profile-image" />
              <h3 className="popup-name">{selectedProfile.name}</h3>
              <div className="popup-rating">
                <div className="rating-stars">⭐⭐⭐⭐⭐</div>
                <span className="rating-text">4.9 Community Rating</span>
              </div>
            </div>
            <div className="popup-body">
              <div className="popup-quote">
                "{selectedProfile.review}"
              </div>
              <div className="popup-details">
                {selectedProfile.location && (
                  <div className="popup-detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>{selectedProfile.location}</span>
                  </div>
                )}
                {selectedProfile.memberSince && (
                  <div className="popup-detail-item">
                    <FaCalendarAlt className="detail-icon" />
                    <span>Member since {selectedProfile.memberSince}</span>
                  </div>
                )}
                {selectedProfile.workshopsAttended && (
                  <div className="popup-detail-item">
                    <FaHeart className="detail-icon" />
                    <span>{selectedProfile.workshopsAttended} workshops attended</span>
                  </div>
                )}
              </div>
              {selectedProfile.wellnessInterests && selectedProfile.wellnessInterests.length > 0 && (
                <div className="popup-interests">
                  <h4>Wellness Interests</h4>
                  <div className="interests-tags">
                    {selectedProfile.wellnessInterests.map((interest, idx) => (
                      <span key={idx} className="interest-tag">{interest}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default TestimonialsSection;