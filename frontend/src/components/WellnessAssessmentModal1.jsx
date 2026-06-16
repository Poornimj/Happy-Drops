import "./WellnessAssessmentModal.css";
import { useState } from "react";
import lavenderSphere from "../assets/images/lavender-sphere.png";

function WellnessAssessmentModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const assessmentData = {
    introduction: {
      title: "Wellness Lifestyle Assessment",
      description: "Your wellness journey starts here. Your answers help us create personalized recommendations for you and your family.",
      scoring: "Give yourself a score in each area on a scale between 1–5:\n1: Strongly disagree\n2: Disagree\n3: Neither agree nor disagree\n4: Agree\n5: Strongly agree"
    },
    categories: [
      {
        id: 1,
        name: "Nutrition",
        icon: "🥗",
        questions: [
          "I eat a healthy, nutrient-rich diet that's high in whole foods and low in ultra-processed foods.",
          "I'm mindful of my portions. I eat when I'm hungry and stop when I'm full. I avoid snacking between meals.",
          "I use micronutrient and macronutrient supplements to ensure my nutritional needs are met."
        ]
      },
      {
        id: 2,
        name: "Digestion",
        icon: "🌿",
        questions: [
          "I'm free from digestive discomfort.",
          "I don't struggle with food sensitivities.",
          "I make sure to include prebiotic and probiotic foods in my diet at least weekly."
        ]
      },
      {
        id: 3,
        name: "Movement",
        icon: "🏃",
        questions: [
          "I'm physically active, getting at least two hours of moderately intense activity or an hour of vigorous activity per week.",
          "I do at least two days of muscle strengthening per week.",
          "I give myself time to rest and recover from activities, including gentle stretching and using dōTERRA products to support the recovery process."
        ]
      },
      {
        id: 4,
        name: "Metabolism",
        icon: "⚡",
        questions: [
          "I have good energy during the day. I don't suffer from brain fog or sugar cravings or need caffeine or energy drinks.",
          "I use smart supplementation to complement targeted metabolic health effects.",
          "I stay satiated for hours after eating."
        ]
      },
      {
        id: 5,
        name: "Rest",
        icon: "😴",
        questions: [
          "I'm getting enough sleep to feel rested and alert the next day.",
          "I have good sleep hygiene practices.",
          "I'm familiar with and use smart supplementation to help on days when sleep is challenging."
        ]
      },
      {
        id: 6,
        name: "Manage Stress",
        icon: "🧘",
        questions: [
          "I know my main sources of stress and I have and use adequate resources to manage them.",
          "I have self-care strategies and use them to help manage my stress.",
          "I'm familiar with and use supplements and products that help as I relax and unwind."
        ]
      },
      {
        id: 7,
        name: "Reduce Toxic Burden",
        icon: "🌱",
        questions: [
          "I'm familiar with the most common environmental toxins and ways to avoid them.",
          "I use nontoxic, eco-friendly products at home and advocate for them with friends and family.",
          "I focus on supporting my body's natural detoxification process, such as by limiting alcohol intake."
        ]
      },
      {
        id: 8,
        name: "Informed Self-Care",
        icon: "💚",
        questions: [
          "I educate myself on proactive wellness lifestyle habits.",
          "I work hard to continuously support my immune function.",
          "I use smart supplementation to complement self-care efforts."
        ]
      }
    ]
  };

  const answerOptions = [
    { value: 1, label: "Strongly disagree", color: "#FFB6C1" },
    { value: 2, label: "Disagree", color: "#FFA07A" },
    { value: 3, label: "Neither agree nor disagree", color: "#F5DEB3" },
    { value: 4, label: "Agree", color: "#808000" },
    { value: 5, label: "Strongly agree", color: "#8FBC8F" }
  ];

  const benefits = [
    { icon: "✨", title: "Personalized Recommendations" },
    { icon: "🎯", title: "Expert Guidance" },
    { icon: "🌿", title: "Natural Solutions" },
    { icon: "👨‍👩‍👧‍👦", title: "Family Wellness Support" }
  ];

  const statusBadges = [
    { icon: "🌱", text: "100% Pure & Tested" },
    { icon: "♻️", text: "Sustainable Sourcing" },
    { icon: "🤝", text: "Ethically Made" },
    { icon: "🔬", text: "Nature + Science" }
  ];

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < assessmentData.categories.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const currentCategory = assessmentData.categories[currentStep - 1];
  const progress = Math.round((currentStep / assessmentData.categories.length) * 100);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
      
        {/* Header Section */}
        <div className="modal-header">
          <div className="header-left">
            <div className="header-icon-container">
              <span className="header-icon">🌿</span>
            </div>
            <div className="header-text">
              <h1 className="header-title">{assessmentData.introduction.title}</h1>
              <p className="header-subtitle">
                {assessmentData.introduction.description}
              </p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <span className="close-icon">✕</span>
          </button>
          
        </div>

        {/* Main Content */}
        <div className="modal-content">
          {/* Left Sidebar */}
          <div className="sidebar">
            <div className="sidebar-header">
              <span className="step-indicator">STEP {currentStep} OF {assessmentData.categories.length}</span>
            </div>
            <div className="sidebar-nav">
              {assessmentData.categories.map((category) => (
                <div
                  key={category.id}
                  className={`sidebar-item ${category.id === currentStep ? 'active' : ''} ${category.id < currentStep ? 'completed' : ''}`}
                  onClick={() => setCurrentStep(category.id)}
                >
                  <span className="sidebar-icon">{category.icon}</span>
                  <span className="sidebar-text">{category.name}</span>
                  {category.id < currentStep && <span className="checkmark">✓</span>}
                </div>
              ))}
            </div>
            <div className="privacy-card">
              <span className="privacy-icon">🛡️</span>
              <div className="privacy-text">
                <span className="privacy-title">Your Privacy Is Our Priority</span>
                <span className="privacy-subtitle">Your data is confidential and never shared.</span>
              </div>
            </div>
          </div>

          {/* Main Question Area */}
          <div className="question-area">
            <div className="question-header">
              <span className="question-icon">{currentCategory.icon}</span>
              <h2 className="question-title">{currentCategory.name}</h2>
            </div>

            <div className="questions-container">
              {currentCategory.questions.map((question, index) => (
                <div key={index} className="question-card">
                  <p className="question-text"><span className="question-number">{index + 1}.</span> {question}</p>
                  <div className="answer-scale">
                    {answerOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`answer-option ${selectedAnswers[`${currentStep}-${index}`] === option.value ? 'selected' : ''}`}
                        style={{}}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [`${currentStep}-${index}`]: option.value })}
                      >
                        <span className="answer-value">{option.value}</span>
                        <span className="answer-label">{option.label}</span>
                        {selectedAnswers[`${currentStep}-${index}`] === option.value && <span className="answer-check">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Information Panel */}
          <div className="info-panel">
            {isComplete ? (
              <div className="assessment-summary">
                <div className="summary-circle">
                  <span className="summary-icon">✨</span>
                </div>
                <h3 className="summary-title">Assessment Complete!</h3>
                <p className="summary-description">
                  Thank you for completing your wellness assessment. Here's a summary of your responses.
                </p>
                <div className="summary-categories">
                  {assessmentData.categories.map((category, index) => {
                    const categoryAnswers = Object.keys(selectedAnswers).filter(
                    key => key.startsWith(`${category.id}-`)
                  );

                     const answeredCount = categoryAnswers.length;
                    const totalQuestions = category.questions.length;
                    const categoryProgress = Math.round((answeredCount / totalQuestions) * 100);
                    
                    return (
                      <div key={category.id} className="summary-category-item">
                        <div className="category-header">
                          <span className="category-icon">{category.icon}</span>
                          <span className="category-name">{category.name}</span>
                          <span className="category-score">{categoryProgress}%</span>
                        </div>
                        <div className="category-progress">
                          <div className="category-progress-fill" style={{ width: `${categoryProgress}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="summary-button" onClick={onClose}>
                  View Recommendations
                </button>
              </div>
            ) : (
              <>
                <div className="info-circle">
                <img
                  src={lavenderSphere}
                  alt="Lavender Wellness"
                  className="lavender-sphere-image"
                />
              </div>
                <h3 className="info-title">Why this matters</h3>
                <p className="info-description">
                  Your responses help us understand your current lifestyle and recommend natural solutions that work for you.
                </p>
                <div className="benefits-list">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="benefit-item">
                      <span className="benefit-icon">{benefit.icon}</span>
                      <span className="benefit-text">{benefit.title}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="modal-footer">
          <button className="nav-button previous" onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </button>
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">{progress}% Complete</span>
          </div>
          <button className="nav-button next" onClick={handleNext} disabled={isComplete}>
            {currentStep === assessmentData.categories.length ? 'Complete' : 'Next Question'}
            {currentStep < assessmentData.categories.length && <span className="arrow-icon">→</span>}
          </button>
        </div>

        {/* Bottom Status Row */}
        <div className="status-row">
          {statusBadges.map((badge, index) => (
            <div key={index} className="status-badge">
              <span className="badge-icon">{badge.icon}</span>
              <span className="badge-text">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WellnessAssessmentModal;
