import "./WellnessAssessmentModal.css";
import { useState, useEffect } from "react";
import newlogo from "../assets/images/newlogo.jpeg";

function WellnessAssessmentModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Load saved progress from localStorage (hostname-agnostic key)
  useEffect(() => {
    const storageKey = 'wellnessAssessmentProgress';
    const savedProgress = localStorage.getItem(storageKey);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setCurrentStep(parsed.currentStep || 1);
        setSelectedAnswers(parsed.selectedAnswers || {});
        setIsComplete(parsed.isComplete || false);
      } catch (e) {
        console.error('Error loading saved progress:', e);
        localStorage.removeItem(storageKey);
      }
    }
  }, [isOpen]);

  // Save progress to localStorage whenever it changes (hostname-agnostic key)
  useEffect(() => {
    const progress = {
      currentStep,
      selectedAnswers,
      isComplete
    };
    localStorage.setItem('wellnessAssessmentProgress', JSON.stringify(progress));
  }, [currentStep, selectedAnswers, isComplete]);

  // Calculate answered questions per category
  const getCategoryProgress = (categoryId) => {
    const category = assessmentData.categories[categoryId - 1];
    const answeredCount = category.questions.filter((_, index) => 
      selectedAnswers[`${categoryId}-${index}`] !== undefined
    ).length;
    return {
      answered: answeredCount,
      total: category.questions.length,
      percentage: Math.round((answeredCount / category.questions.length) * 100)
    };
  };

  // Calculate overall progress based on answered questions
  const calculateOverallProgress = () => {
    let totalAnswered = 0;
    let totalQuestions = 0;
    
    assessmentData.categories.forEach((category) => {
      const progress = getCategoryProgress(category.id);
      totalAnswered += progress.answered;
      totalQuestions += progress.total;
    });
    
    return Math.round((totalAnswered / totalQuestions) * 100);
  };

  // Calculate score for a specific category (1-5 scale)
  const calculateCategoryScore = (categoryId) => {
    const category = assessmentData.categories[categoryId - 1];
    let totalScore = 0;
    let answeredCount = 0;
    
    category.questions.forEach((_, index) => {
      const answer = selectedAnswers[`${categoryId}-${index}`];
      if (answer !== undefined) {
        totalScore += answer;
        answeredCount++;
      }
    });
    
    if (answeredCount === 0) return 0;
    return Math.round((totalScore / answeredCount) * 10) / 10; // Return average with 1 decimal
  };

  // Determine wellness level based on score
  const getWellnessLevel = (score) => {
    if (score >= 4.5) return { level: "Excellent", color: "#6e8b57" };
    if (score >= 3.5) return { level: "Good", color: "#7a9d5f" };
    if (score >= 2.5) return { level: "Fair", color: "#c9a227" };
    return { level: "Needs Improvement", color: "#dc6464" };
  };

  // Calculate overall wellness score
  const calculateOverallScore = () => {
    let totalScore = 0;
    let completedCategories = 0;
    
    assessmentData.categories.forEach((category) => {
      const score = calculateCategoryScore(category.id);
      if (score > 0) {
        totalScore += score;
        completedCategories++;
      }
    });
    
    if (completedCategories === 0) return 0;
    return Math.round((totalScore / completedCategories) * 10) / 10;
  };

  // Generate actionable insights based on scores
  const generateInsights = () => {
    const insights = [];
    
    assessmentData.categories.forEach((category) => {
      const score = calculateCategoryScore(category.id);
      const wellnessLevel = getWellnessLevel(score);
      
      if (score > 0 && score < 3.5) {
        let recommendation = "";
        
        switch(category.id) {
          case 1: // Nutrition
            recommendation = "Focus on incorporating more whole foods and reducing processed items. Consider personalized nutrition supplements.";
            break;
          case 2: // Digestion
            recommendation = "Include probiotic-rich foods and support your gut health with targeted digestive enzymes.";
            break;
          case 3: // Movement
            recommendation = "Start with gentle activities and gradually increase intensity. Use recovery products to support muscle health.";
            break;
          case 4: // Metabolism
            recommendation = "Optimize your metabolic health through smart supplementation and balanced nutrition timing.";
            break;
          case 5: // Rest
            recommendation = "Improve sleep hygiene and consider natural sleep support supplements for better rest quality.";
            break;
          case 6: // Stress Management
            recommendation = "Incorporate stress-reducing practices and use relaxation-promoting essential oils.";
            break;
          case 7: // Toxic Burden
            recommendation = "Switch to non-toxic products and support your body's natural detoxification processes.";
            break;
          case 8: // Self-Care
            recommendation = "Build a consistent self-care routine with immune-supporting supplements.";
            break;
        }
        
        insights.push({
          category: category.name,
          icon: category.icon,
          score,
          level: wellnessLevel.level,
          recommendation
        });
      }
    });
    
    return insights;
  };

  const assessmentData = {
    introduction: {
      title: "Wellness Lifestyle Assessment",
      description:
        "Your wellness journey starts here. Your answers help us create personalized recommendations for you and your family.",
    },

    categories: [
      {
        id: 1,
        name: "Nutrition",
        icon: "🥗",
        questions: [
          "I eat a healthy, nutrient-rich diet that's high in whole foods and low in ultra-processed foods.",
          "I'm mindful of my portions. I eat when I'm hungry and stop when I'm full. I avoid snacking between meals.",
          "I use micronutrient and macronutrient supplements to ensure my nutritional needs are met.",
        ],
      },

      {
        id: 2,
        name: "Digestion",
        icon: "🌿",
        questions: [
          "I'm free from digestive discomfort.",
          "I don't struggle with food sensitivities.",
          "I make sure to include prebiotic and probiotic foods in my diet at least weekly.",
        ],
      },

      {
        id: 3,
        name: "Movement",
        icon: "🏃",
        questions: [
          "I'm physically active, getting at least two hours of moderately intense activity or an hour of vigorous activity per week.",
          "I do at least two days of muscle strengthening per week.",
          "I give myself time to rest and recover from activities, including gentle stretching and using wellness products to support recovery.",
        ],
      },

      {
        id: 4,
        name: "Metabolism",
        icon: "⚡",
        questions: [
          "I have good energy during the day.",
          "I use smart supplementation to complement targeted metabolic health effects.",
          "I stay satiated for hours after eating.",
        ],
      },

      {
        id: 5,
        name: "Rest",
        icon: "😴",
        questions: [
          "I'm getting enough sleep to feel rested and alert the next day.",
          "I have good sleep hygiene practices.",
          "I'm familiar with and use smart supplementation to help on days when sleep is challenging.",
        ],
      },

      {
        id: 6,
        name: "Manage Stress",
        icon: "🧘",
        questions: [
          "I know my main sources of stress and I have adequate resources to manage them.",
          "I have self-care strategies and use them.",
          "I'm familiar with products that help me relax and unwind.",
        ],
      },

      {
        id: 7,
        name: "Reduce Toxic Burden",
        icon: "🌱",
        questions: [
          "I'm familiar with environmental toxins and ways to avoid them.",
          "I use non-toxic eco-friendly products at home.",
          "I focus on supporting my body's natural detoxification process.",
        ],
      },

      {
        id: 8,
        name: "Informed Self-Care",
        icon: "💚",
        questions: [
          "I educate myself on proactive wellness habits.",
          "I continuously support my immune function.",
          "I use smart supplementation to complement self-care efforts.",
        ],
      },
    ],
  };

  const answerOptions = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" },
  ];

  const benefits = [
    { icon: "✨", title: "Personalized Recommendations" },
    { icon: "🎯", title: "Expert Guidance" },
    { icon: "🌿", title: "Natural Solutions" },
    { icon: "👨‍👩‍👧‍👦", title: "Family Wellness Support" },
  ];

  const statusBadges = [
    { icon: "🌱", text: "100% Pure & Tested" },
    { icon: "♻️", text: "Sustainable Sourcing" },
    { icon: "🤝", text: "Ethically Made" },
    { icon: "🔬", text: "Nature + Science" },
  ];

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationError(false);
    }
  };

  const validateCurrentStep = () => {
    const currentCategory = assessmentData.categories[currentStep - 1];
    const allAnswered = currentCategory.questions.every((_, index) => 
      selectedAnswers[`${currentStep}-${index}`] !== undefined
    );
    return allAnswered;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      setValidationError(true);
      return;
    }
    
    setValidationError(false);
    
    if (currentStep < assessmentData.categories.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show confirmation dialog on final step
      setShowConfirmation(true);
    }
  };

  const handleConfirmComplete = () => {
    setShowConfirmation(false);
    setIsComplete(true);
  };

  const handleCancelComplete = () => {
    setShowConfirmation(false);
  };

  const handleSidebarNavigation = (categoryId) => {
    // Only allow navigation to completed categories or current step
    if (categoryId <= currentStep) {
      setCurrentStep(categoryId);
      setValidationError(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedAnswers({});
    setIsComplete(false);
    setValidationError(false);
  };

  const currentCategory =
    assessmentData.categories[currentStep - 1];

  const progress = calculateOverallProgress();

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* HEADER */}

        <div className="modal-header">
          <div className="header-left">

            <div className="header-icon-container">
              <span className="header-icon">🌿</span>
            </div>

            <div className="header-text">
              <h1 className="header-title">
                {assessmentData.introduction.title}
              </h1>

              <p className="header-subtitle">
                {assessmentData.introduction.description}
              </p>
            </div>

          </div>

          <button
            className="close-button"
            onClick={onClose}
          >
            <span className="close-icon">✕</span>
          </button>

        </div>

        {/* COMPLETION PAGE */}

        {isComplete ? (

          <div className="completion-page">

            <div className="completion-icon">
              ✨
            </div>

            <h2>
              Wellness Assessment Complete
            </h2>

            <p>
              Thank you for completing your assessment.
              Based on your responses we can now
              create a personalized wellness journey
              including nutrition, lifestyle,
              sleep, recovery and self-care
              recommendations tailored to you.
            </p>

            <div className="overall-score">
              <div className="score-circle">
                <span className="score-value">{calculateOverallScore()}</span>
                <span className="score-label">/ 5.0</span>
              </div>
              <div className="score-level" style={{ color: getWellnessLevel(calculateOverallScore()).color }}>
                {getWellnessLevel(calculateOverallScore()).level}
              </div>
            </div>

            <div className="completion-stats">

              {assessmentData.categories.map((category) => {
                const categoryScore = calculateCategoryScore(category.id);
                const categoryProgress = getCategoryProgress(category.id);
                const wellnessLevel = getWellnessLevel(categoryScore);

                return (
                  <div
                    key={category.id}
                    className="completion-card"
                  >
                    <span>{category.icon}</span>

                    <h4>{category.name}</h4>

                    <div className="score-display">
                      <span className="score-number">{categoryScore}</span>
                      <span className="score-label">/ 5</span>
                    </div>

                    <div className="wellness-badge" style={{ 
                      background: `${wellnessLevel.color}20`,
                      color: wellnessLevel.color 
                    }}>
                      {wellnessLevel.level}
                    </div>

                    <div className="mini-progress">
                      <div
                        className="mini-progress-fill"
                        style={{
                          width: `${categoryProgress.percentage}%`,
                          backgroundColor: wellnessLevel.color
                        }}
                      />
                    </div>
                  </div>
                );
              })}

            </div>

            {generateInsights().length > 0 && (
              <div className="insights-section">
                <h3>Personalized Recommendations</h3>
                <div className="insights-list">
                  {generateInsights().map((insight, index) => (
                    <div key={index} className="insight-card">
                      <span className="insight-icon">{insight.icon}</span>
                      <div className="insight-content">
                        <h4>{insight.category}</h4>
                        <p>{insight.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="reset-btn"
              onClick={handleReset}
            >
              Restart Assessment
            </button>

          </div>

        ) : (

          <>
            {/* MAIN CONTENT */}

            <div className="modal-content">

              {/* SIDEBAR */}

              <div className="sidebar">

                <div className="sidebar-header">
                  <span className="step-indicator">
                    STEP {currentStep} OF{" "}
                    {assessmentData.categories.length}
                  </span>
                </div>

                <div className="sidebar-nav">

                  {assessmentData.categories.map(
                    (category) => {
                      const categoryProgress = getCategoryProgress(category.id);
                      const isCompleted = categoryProgress.percentage === 100;
                      const isCurrent = category.id === currentStep;
                      const canNavigate = category.id <= currentStep;
                      
                      return (
                        <div
                          key={category.id}
                          className={`sidebar-item ${
                            isCurrent ? "active" : ""
                          } ${
                            isCompleted ? "completed" : ""
                          } ${
                            !canNavigate ? "disabled" : ""
                          }`}
                          onClick={() =>
                            canNavigate && handleSidebarNavigation(category.id)
                          }
                        >
                          <span className="sidebar-icon">
                            {category.icon}
                          </span>

                          <span className="sidebar-text">
                            {category.name}
                          </span>

                          {isCompleted && (
                            <span className="checkmark">
                              ✓
                            </span>
                          )}

                          {!isCompleted && isCurrent && (
                            <span className="progress-indicator">
                              {categoryProgress.answered}/{categoryProgress.total}
                            </span>
                          )}
                        </div>
                      );
                    }
                  )}

                </div>

                <div className="privacy-card">
                  <span className="privacy-title">
                    Your Privacy Is Our Priority
                  </span>

                  <span className="privacy-subtitle">
                    Your data is confidential and
                    never shared.
                  </span>
                </div>

              </div>

              {/* QUESTION AREA */}

              <div className="question-area">

                <div className="question-header">

                  <span className="question-icon">
                    {currentCategory.icon}
                  </span>

                  <h2 className="question-title">
                    {currentCategory.name}
                  </h2>

                </div>

                <div className="questions-container">

                  {validationError && (
                    <div className="validation-error">
                      Please answer all questions before proceeding
                    </div>
                  )}

                  {currentCategory.questions.map(
                    (question, index) => (
                      <div
                        key={index}
                        className={`question-card ${
                          validationError && 
                          selectedAnswers[`${currentStep}-${index}`] === undefined
                            ? "error" 
                            : ""
                        }`}
                      >
                        <p className="question-text">
                          <span className="question-number">
                            {index + 1}.
                          </span>{" "}
                          {question}
                        </p>

                        <div className="answer-scale">

                          {answerOptions.map(
                            (option) => (
                              <button
                                key={option.value}
                                className={`answer-option ${
                                  selectedAnswers[
                                    `${currentStep}-${index}`
                                  ] === option.value
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  setSelectedAnswers({
                                    ...selectedAnswers,
                                    [`${currentStep}-${index}`]:
                                      option.value,
                                  })
                                }
                              >
                                <span className="answer-value">
                                  {option.value}
                                </span>

                                <span className="answer-label">
                                  {option.label}
                                </span>

                                {selectedAnswers[
                                  `${currentStep}-${index}`
                                ] === option.value && (
                                  <span className="answer-check">
                                    ✓
                                  </span>
                                )}
                              </button>
                            )
                          )}

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>
                            {/* RIGHT PANEL */}

              <div className="info-panel">

                <div className="info-circle">
                  <img
                    src={newlogo}
                    alt="Wellness Logo"
                    className="lavender-sphere-image"
                  />
                </div>

                <h3 className="info-title">
                  Why This Matters
                </h3>

                <p className="info-description">
                  Your responses help us understand
                  your current lifestyle and identify
                  opportunities to improve wellbeing,
                  longevity and daily vitality through
                  personalized wellness solutions.
                </p>

                <div className="benefits-list">

                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="benefit-item"
                    >
                      <span className="benefit-icon">
                        {benefit.icon}
                      </span>

                      <span className="benefit-text">
                        {benefit.title}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

            </div>

            {/* FOOTER */}

            <div className="modal-footer">

              <button
                className="nav-button previous"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </button>

              <div className="progress-container">

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <span className="progress-text">
                  {progress}% Complete
                </span>

              </div>

              <button
                className="nav-button next"
                onClick={handleNext}
              >
                {currentStep ===
                assessmentData.categories.length
                  ? "Complete Assessment"
                  : "Next"}

                {currentStep !==
                  assessmentData.categories.length && (
                  <span className="arrow-icon">
                    →
                  </span>
                )}
              </button>

              {/* Confirmation Dialog */}
              {showConfirmation && (
                <div className="confirmation-dialog">
                  <div className="confirmation-content">
                    <h3>Complete Assessment?</h3>
                    <p>
                      Are you sure you want to complete your wellness assessment? 
                      Once completed, you'll be able to view your personalized wellness recommendations.
                    </p>
                    <div className="confirmation-buttons">
                      <button 
                        className="confirm-cancel"
                        onClick={handleCancelComplete}
                      >
                        Go Back
                      </button>
                      <button 
                        className="confirm-submit"
                        onClick={handleConfirmComplete}
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* STATUS BAR */}

            <div className="status-row">

              {statusBadges.map((badge, index) => (
                <div
                  key={index}
                  className="status-badge"
                >
                  <span className="badge-icon">
                    {badge.icon}
                  </span>

                  <span className="badge-text">
                    {badge.text}
                  </span>
                </div>
              ))}

            </div>

          </>
        )}

      </div>
    </div>
  );
}

export default WellnessAssessmentModal;