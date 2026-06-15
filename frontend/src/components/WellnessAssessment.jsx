import "./WellnessAssessment.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const assessmentData = {
  nutrition: {
    title: "NUTRITION",
    icon: "🥗",
    questions: [
      "I eat a healthy, nutrient-rich diet that's high in whole foods and low in ultra-processed foods.",
      "I'm mindful of my portions. I eat when I'm hungry and stop when I'm full. I avoid snacking between meals.",
      "I use micronutrient and macronutrient supplements to ensure my nutritional needs are met."
    ]
  },
  digestion: {
    title: "DIGESTION",
    icon: "🌿",
    questions: [
      "I'm free from digestive discomfort.",
      "I don't struggle with food sensitivities.",
      "I make sure to include prebiotic and probiotic foods in my diet at least weekly."
    ]
  },
  movement: {
    title: "MOVEMENT",
    icon: "🏃",
    questions: [
      "I'm physically active, getting at least two hours of moderately intense activity or an hour of vigorous activity per week.",
      "I do at least two days of muscle strengthening per week.",
      "I give myself time to rest and recover from activities, including gentle stretching and using wellness products to support the recovery process."
    ]
  },
  metabolism: {
    title: "METABOLISM",
    icon: "⚡",
    questions: [
      "I have good energy during the day. I don't suffer from brain fog, sugar cravings, or need caffeine or energy drinks.",
      "I use smart supplementation to complement targeted metabolic health effects.",
      "I stay satiated for hours after eating."
    ]
  },
  rest: {
    title: "REST",
    icon: "😴",
    questions: [
      "I'm getting enough sleep to feel rested and alert the next day.",
      "I have good sleep hygiene practices.",
      "I'm familiar with and use smart supplementation to help on days when sleep is challenging."
    ]
  },
  stressManagement: {
    title: "STRESS MANAGEMENT",
    icon: "🧘",
    questions: [
      "I know my main sources of stress and I have and use adequate resources to manage them.",
      "I have self-care strategies and use them to help manage my stress.",
      "I'm familiar with and use supplements and products that help as I relax and unwind."
    ]
  },
  reduceToxicLoad: {
    title: "REDUCE TOXIC LOAD",
    icon: "🌱",
    questions: [
      "I'm familiar with the most common environmental toxins and ways to avoid them.",
      "I use nontoxic, eco-friendly products at home and advocate for them with friends and family.",
      "I focus on supporting my body's natural detoxification process, such as by limiting alcohol intake."
    ]
  },
  informedSelfCare: {
    title: "INFORMED SELF-CARE",
    icon: "💚",
    questions: [
      "I educate myself on proactive wellness lifestyle habits.",
      "I work hard to continuously support my immune function.",
      "I use smart supplementation to complement self-care efforts."
    ]
  }
};

function WellnessAssessment() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO: Implement actual auth check

  const categories = Object.keys(assessmentData);
  const totalQuestions = Object.values(assessmentData).reduce((acc, cat) => acc + cat.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  useEffect(() => {
    // Check if user is logged in
    // TODO: Implement actual authentication check
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn, navigate]);

  const handleResponse = (category, questionIndex, score) => {
    const key = `${category}-${questionIndex}`;
    setResponses(prev => ({ ...prev, [key]: score }));
  };

  const calculateScores = () => {
    const scores = {};
    categories.forEach(category => {
      const categoryQuestions = assessmentData[category].questions;
      let categoryScore = 0;
      categoryQuestions.forEach((_, index) => {
        const key = `${category}-${index}`;
        categoryScore += responses[key] || 0;
      });
      scores[category] = categoryScore;
    });
    return scores;
  };

  const handleSubmit = () => {
    if (answeredQuestions === totalQuestions) {
      setShowResults(true);
    }
  };

  const getRecommendations = (scores) => {
    const recommendations = [];
    const lowestScore = Math.min(...Object.values(scores));
    
    Object.entries(scores).forEach(([category, score]) => {
      if (score === lowestScore && score < 12) {
        const categoryTitle = assessmentData[category].title;
        recommendations.push({
          category: categoryTitle,
          message: `Focus on improving your ${categoryTitle.toLowerCase()} with targeted wellness products and lifestyle changes.`
        });
      }
    });

    if (recommendations.length === 0) {
      recommendations.push({
        category: "Overall Wellness",
        message: "Great job! You're maintaining excellent wellness habits. Continue with your current routine and explore our premium wellness products to enhance your journey."
      });
    }

    return recommendations;
  };

  const scores = calculateScores();
  const recommendations = getRecommendations(scores);

  if (!isLoggedIn) {
    return null;
  }

  if (showResults) {
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const maxScore = 120;
    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <div className="wellness-assessment">
        <div className="assessment-container">
          {/* Step 14 - Results Dashboard */}
          <div className="results-dashboard">
            <div className="hero-section">
              <div className="hero-left">
                <h1 className="hero-title">
                  Your Wellness<br />
                  <span className="assessment">Results</span>
                </h1>
                <div className="hero-description-card">
                  <span className="hero-description-icon">🎉</span>
                  <p className="hero-description-text">
                    Here's your personalized wellness profile based on your responses to the assessment.
                  </p>
                </div>
              </div>
              <div className="hero-right">
                <div className="overall-score">
                  <div className="score-circle">
                    <span className="score-number">{totalScore}</span>
                    <span className="score-total">/ {maxScore}</span>
                  </div>
                  <p className="score-label">{percentage}%</p>
                  <p className="score-status">
                    {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : percentage >= 40 ? 'Fair' : 'Needs Improvement'}
                  </p>
                </div>
              </div>
            </div>

            <div className="category-scores">
              {categories.map(category => {
                const categoryClass = {
                  nutrition: 'nutrition',
                  digestion: 'digestion',
                  movement: 'movement',
                  metabolism: 'metabolism',
                  rest: 'rest',
                  stressManagement: 'stress',
                  reduceToxicLoad: 'toxic',
                  informedSelfCare: 'selfcare'
                }[category];

                return (
                  <div key={category} className="category-score-card">
                    <div className="category-score-card-header">
                      <div className={`category-icon-container ${categoryClass}`} style={{ width: '50px', height: '50px', fontSize: '24px' }}>
                        {assessmentData[category].icon}
                      </div>
                      <h3>{assessmentData[category].title}</h3>
                    </div>
                    <div className="score-bar">
                      <div 
                        className="score-fill"
                        style={{ width: `${(scores[category] / 15) * 100}%` }}
                      ></div>
                    </div>
                    <p className="score-value">{scores[category]} / 15</p>
                  </div>
                );
              })}
            </div>

            <div className="recommendations-section">
              <h2>💡 Personalized Recommendations</h2>
              {recommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <h3>{rec.category}</h3>
                  <p>{rec.message}</p>
                </div>
              ))}
            </div>

            <div className="footer-actions">
              <button className="view-results-btn" onClick={() => {
                setResponses({});
                setShowResults(false);
                setCurrentCategory(0);
              }}>
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wellness-assessment">
      <div className="assessment-container">
        {/* Step 2 - Top Progress Bar */}
        <div className="progress-header">
          <div className="progress-info">
            <p className="progress-title">Assessment Progress</p>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="progress-percentage">{progress}% Complete</p>
          </div>
          {/* Step 3 - Save Button */}
          <button className="save-button">Save & Exit</button>
        </div>

        {/* Step 4 - Hero Section */}
        <div className="hero-section">
          <div className="hero-left">
            <h1 className="hero-title">
              Wellness Lifestyle<br />
              <span className="assessment">Assessment</span>
            </h1>
            <div className="hero-description-card">
              <span className="hero-description-icon">🌿</span>
              <p className="hero-description-text">
                Welcome to the Wellness Lifestyle Assessment! This form is designed to help you take control of your health and well-being by assessing aspects of your health through the dōTERRA® Wellness Pyramid framework.
              </p>
            </div>
          </div>
          <div className="hero-right">
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=400&fit=crop" 
              alt="Wellness Products" 
              className="hero-image"
            />
          </div>
        </div>

        {/* Step 5 - Scoring Guide */}
        <div className="scoring-guide">
          <h3 className="scoring-guide-title">Scoring Scale</h3>
          <div className="scoring-scale">
            <div className="scale-item">
              <div className="scale-circle scale-1">1</div>
              <span className="scale-label">Strongly Disagree</span>
            </div>
            <div className="scale-item">
              <div className="scale-circle scale-2">2</div>
              <span className="scale-label">Disagree</span>
            </div>
            <div className="scale-item">
              <div className="scale-circle scale-3">3</div>
              <span className="scale-label">Neutral</span>
            </div>
            <div className="scale-item">
              <div className="scale-circle scale-4">4</div>
              <span className="scale-label">Agree</span>
            </div>
            <div className="scale-item">
              <div className="scale-circle scale-5">5</div>
              <span className="scale-label">Strongly Agree</span>
            </div>
          </div>
        </div>

        {/* Step 6-10 - Assessment Category Cards */}
        <div className="assessment-categories">
          {categories.map((category) => {
            const categoryScore = scores[category] || 0;
            const categoryClass = {
              nutrition: 'nutrition',
              digestion: 'digestion',
              movement: 'movement',
              metabolism: 'metabolism',
              rest: 'rest',
              stressManagement: 'stress',
              reduceToxicLoad: 'toxic',
              informedSelfCare: 'selfcare'
            }[category];

            return (
              <div key={category} className="category-card">
                {/* Step 7 - Category Icon Area */}
                <div className="category-icon-area">
                  <div className={`category-icon-container ${categoryClass}`}>
                    {assessmentData[category].icon}
                  </div>
                  <span className="category-title">{assessmentData[category].title}</span>
                </div>

                {/* Step 8 - Questions Section */}
                <div className="category-questions">
                  {assessmentData[category].questions.map((question, questionIndex) => {
                    const key = `${category}-${questionIndex}`;
                    const selectedScore = responses[key];
                    
                    return (
                      <div key={questionIndex} className="question-item">
                        <span className="question-number">{questionIndex + 1}.</span>
                        <p className="question-text">{question}</p>
                        {/* Step 9 - Rating Buttons */}
                        <div className="rating-buttons">
                          {[1, 2, 3, 4, 5].map(score => (
                            <button
                              key={score}
                              className={`rating-btn ${selectedScore === score ? 'active' : ''}`}
                              onClick={() => handleResponse(category, questionIndex, score)}
                            >
                              {score}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Step 10 - Live Category Score */}
                <div className="category-score-area">
                  <div className="category-score-bar"></div>
                  <span className="category-score-number">{categoryScore}</span>
                  <span className="category-score-total">/ 15</span>
                  <span className="category-score-label">TOTAL SCORE</span>
                  <span className="category-score-status">
                    {categoryScore >= 12 ? 'Excellent' : categoryScore >= 9 ? 'Good' : categoryScore >= 6 ? 'Fair' : 'Needs Improvement'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step 11 - Footer Motivation Section */}
        <div className="footer-motivation">
          <span className="motivation-icon">🛡️</span>
          <p className="motivation-text">You're Doing Great!</p>
        </div>

        {/* Step 12 - View Results Button */}
        <div className="footer-actions">
          <button 
            className="view-results-btn"
            onClick={handleSubmit}
            disabled={answeredQuestions !== totalQuestions}
          >
            View My Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default WellnessAssessment;
