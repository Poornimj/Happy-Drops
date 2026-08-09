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
        "I learned how to moisturize my sensitive skin with essential oils, and the healing effect was clearly visible after only one week. The results were so impressive that I stopped using my usual commercial products and now follow the Happy Drops oil method.",
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
        "I attended the natural wellness workshops with my friends, and we learned so much together. The guidance was clear, practical, and easy to follow, giving us useful techniques that we can confidently include in our everyday routines.",
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
        "Happy Drops is finally a wellness platform that understands the different needs of my whole family. The personalized guidance has helped us make healthier choices and build simple wellness habits that are realistic and easy to maintain every day.",
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
        "The nutrition guidance workshop transformed my energy levels and helped me concentrate better. It also supported my weight loss, reduced water retention and swelling, and made my body feel much lighter. The experience has been amazing, and I highly recommend it.",
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
        "I had incredible results from the sound bath and breathing-based relaxation techniques. I can now sleep much longer and more deeply, wake up feeling better, and notice that my brain fog has cleared. I would definitely recommend the experience.",
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

                <div className="user-info">
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

    </section>
  );
}

export default TestimonialsSection;
