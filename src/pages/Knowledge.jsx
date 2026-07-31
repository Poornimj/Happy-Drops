import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import knowledgeHeader from "../assets/images/knowledge-header.png";
import knowledgeReady from "../assets/images/knowledg-ready.png";
import knowledgeWellnessImage from "../assets/images/knowledge-wellness-image.png";
import knowledgeWellnessImageTwo from "../assets/images/knowledge-wellness-image-two.png";
import knowledgeWellnessImageThree from "../assets/images/knowledge-wellness-image-three.png";
import knowledgeRecipe from "../assets/images/knowledge-recipe.png";
import knowledgeUplevel from "../assets/images/knowledge-uplevel.png";
import knowledgeRest from "../assets/images/knowledge-rest.png";
import knowledgeCellularHealth from "../assets/images/knowledge-cellular-health.png";
import knowledgeNutrition from "../assets/images/knowledge-nutrition.png";
import knowledgeSeasonalSupport from "../assets/images/knowledge-seasonal-support.png";
import knowledgeImmuneHealth from "../assets/images/knowledge-immune-health.png";
import knowledgeDigestiveSupport from "../assets/images/knowledge-digestive-support.png";
import knowledgeMetabolicHealth from "../assets/images/knowledge-metabolic-health.png";
import knowledgeCleanEnergy from "../assets/images/knowledge-clean-enery.png";
import knowledgeMovement from "../assets/images/knowledge-movement.png";
import knowledgeManagingStress from "../assets/images/knowledge-managing-stress.png";
import knowledgeSkinCare from "../assets/images/knowledge-skin-care.png";
import knowledgeHairCare from "../assets/images/knowledge-hair-care.png";
import {
  LuCircleCheck,
  LuCircleHelp,
  LuClipboardCheck,
  LuClipboardList,
  LuClock,
  LuCreditCard,
  LuHeart,
  LuMessageCircle,
  LuLeaf,
  LuMapPin,
  LuPackageCheck,
  LuPillBottle,
  LuShoppingBag,
  LuSparkles,
  LuTag,
  LuUser,
} from "react-icons/lu";

const steps = [
  ["question", "Ask Your Question", "Submit your question."],
  ["user", "Aromatherapist Review", "Your question is sent to our aromatherapist for expert review."],
  ["leaf", "Personalized Recipe", "Receive a custom recipe and oil recommendation with pricing."],
  ["card", "Payment", "Complete your payment securely."],
  ["bottle", "Oil Creation", "We create your custom essential oil blend with care."],
  ["bag", "Ready for Pickup", "Your essential oil is ready. You can pick it up at Nature Power Happiness Academy."],
];

const educationCategories = [
  { icon: "leaf", title: "Essential Oil Basics", summary: "Understand what essential oils are and how they are commonly used.", guide: "Essential oils are concentrated aromatic extracts from plants. They are commonly enjoyed through carefully controlled diffusion or properly diluted topical use. A small amount goes a long way, and the label directions should always be followed." },
  { icon: "check", title: "Safe Use & Dilution", summary: "Learn responsible dilution, patch testing and important precautions.", guide: "Never apply an essential oil undiluted unless its label and a qualified professional specifically support that use. Dilute with a suitable carrier oil, patch test first, avoid eyes and sensitive areas, and keep oils away from children and pets." },
  { icon: "bottle", title: "Aromatherapy", summary: "Explore how aroma can support a calm and pleasant environment.", guide: "Aromatherapy uses plant aromas as part of a wellbeing routine. Follow diffuser instructions, use good ventilation, begin with short sessions, and stop if anyone experiences headache, irritation, nausea or breathing discomfort." },
  { icon: "user", title: "Skin & Beauty", summary: "Discover gentle ways to include oils in skin-care routines.", guide: "For skin use, choose skin-appropriate oils, dilute them correctly and test a small area first. Some citrus oils can increase sensitivity to sunlight. Avoid broken or irritated skin and seek professional advice for persistent skin concerns." },
  { icon: "bag", title: "Sleep & Relaxation", summary: "Build calming evening rituals that encourage better rest.", guide: "A quiet bedtime routine, reduced evening screen time and a comfortable sleep environment are the foundation. Some people enjoy gently diffused lavender as part of relaxation, provided it is used according to its directions." },
  { icon: "question", title: "Stress & Mood", summary: "Combine mindful habits with uplifting or calming aromas.", guide: "Slow breathing, movement, regular meals and restorative sleep can support emotional wellbeing. A personally pleasant aroma may complement these habits, but it should not replace professional support for persistent or severe anxiety or low mood." },
  { icon: "card", title: "Seasonal Wellness", summary: "Use oils responsibly throughout changing seasons.", guide: "Seasonal routines should focus on sleep, hydration, nutrition, fresh air and good hygiene. Aromatic products may make the environment feel refreshing, but they do not prevent or cure infections or allergies." },
  { icon: "check", title: "Storage & Quality", summary: "Protect oil quality with correct storage and careful selection.", guide: "Keep bottles tightly closed in a cool, dark place and follow their expiry guidance. Choose clearly labelled products from reputable suppliers, and check the botanical name, usage directions, batch information and safety warnings." },
];

const wellnessTopics = [
  {
    title: "Uplevel",
    text: "Elevate your wellness, energy, and digestion with foundational wellness.",
    image: knowledgeUplevel,
    signupPath: "/signup",
  },
  {
    title: "Rest",
    text: "Achieve deep, restful sleep to allow your body to heal and regenerate.",
    image: knowledgeRest,
    signupPath: "/signup",
  },
  {
    title: "Cellular Health",
    text: "Protect your body from the inside out, starting at the cellular level.",
    image: knowledgeCellularHealth,
    signupPath: "/signup",
  },
  {
    title: "Nutrition",
    text: "Lay a vital, nutrient-dense foundation to keep you and your family feeling your best.",
    image: knowledgeNutrition,
    signupPath: "/signup",
  },
  {
    title: "Seasonal Support",
    text: "Find ways to support your body in managing seasonal threats.",
    image: knowledgeSeasonalSupport,
    signupPath: "/signup",
  },
  {
    title: "Immune Health",
    text: "Naturally support immune function for optimal health and vitality.",
    image: knowledgeImmuneHealth,
    signupPath: "/signup",
  },
  {
    title: "Digestive Support",
    text: "Build a healthy gut to ensure nutrient absorption, support immunity, and maintain energy.",
    image: knowledgeDigestiveSupport,
    signupPath: "/signup",
  },
  {
    title: "Metabolic Health",
    text: "Support a healthy metabolism for steady energy, hormonal balance, weight management, and mood.",
    image: knowledgeMetabolicHealth,
    signupPath: "/signup",
  },
  {
    title: "Clean Energy",
    text: "Naturally increase your energy with a healthy lifestyle to feel vibrant and productive all day.",
    image: knowledgeCleanEnergy,
  },
  {
    title: "Movement",
    text: "Focus on effective solutions for flexibility and ease of movement.",
    image: knowledgeMovement,
  },
  {
    title: "Managing Stress",
    text: "Manage stress effectively to significantly improve your overall health and well-being.",
    image: knowledgeManagingStress,
    signupPath: "/signup",
  },
  {
    title: "Skin Care",
    text: "Achieve a clear, glowing complexion by protecting and nourishing your skin barrier from the inside out.",
    image: knowledgeSkinCare,
  },
  {
    title: "Hair Care",
    text: "Support strong, vibrant hair growth by maintaining optimal scalp health and nourishment.",
    image: knowledgeHairCare,
  },
];

const customerQuestion = "What essential oil can help with stress and better sleep?";

const stageRank = {
  question_saved: 1,
  sent_to_aromatherapist: 2,
  recipe_sent: 3,
  paid: 4,
  oil_sent: 5,
};

const orderStage = "recipe_sent";

const questionHistory = [
  {
    id: 1,
    question: "Do you have a blend that supports focus and mental clarity?",
    submittedDate: "18 Jul 2026",
    recipe: "Focus & Clarity Blend",
    price: "EUR 59.00",
    paymentDate: "19 Jul 2026",
    pickupLocation: "Helsinki XR Center, Hämeentie 135 A, 00560 Helsinki",
    purchasedDate: "19 Jul 2026",
  },
  {
    id: 2,
    question: "What essential oil can help with stress and better sleep?",
    submittedDate: "25 Aug 2026",
    recipe: "Calm Sleep Blend",
    price: "Price will display here",
    paymentDate: "Payment date will display here",
    pickupLocation: "Helsinki XR Center, Hämeentie 135 A, 00560 Helsinki",
    purchasedDate: "Purchased date will display here",
  },
];

function getOrderSteps(stage, questionText = "Submit a question to begin.", submittedAt = "", answerText = "") {
  const rank = stageRank[stage] || 1;

  return [
    {
      icon: "question",
      title: "You",
      text: questionText,
      time: submittedAt,
      status: rank >= 1 ? "done" : "processing",
    },
    {
      icon: "user",
      title: "Aromatherapist Review",
      text:
        rank >= 3
          ? answerText || "Our aromatherapist has reviewed your question."
          : "Your question has been sent to our aromatherapist by email.",
      time: "25 Aug 2026 - 11:15 AM",
      status: rank >= 3 ? "done" : "processing",
    },
    {
      icon: "leaf",
      title: "Personalized Recipe",
      text:
        rank >= 3
          ? "Here is your custom blend recipe and pricing."
          : "Your custom recipe will appear after aromatherapist review.",
      time: "25 Aug 2026 - 11:45 AM",
      status: rank >= 4 ? "done" : "processing",
      action: rank >= 3 ? "recipe" : null,
    },
    {
      icon: "card",
      title: "Payment",
      text:
        rank >= 4
          ? "Your payment has been received."
          : "Please complete your payment to continue.",
      time: "25 Aug 2026 - 12:10 PM",
      status: rank >= 4 ? "done" : "processing",
      action: rank >= 3 && rank < 4 ? "payment" : null,
    },
    {
      icon: "bottle",
      title: "Oil Creation Started",
      text:
        rank >= 5
          ? "Your essential oil has been created and sent to you."
          : "We will start creating your custom essential oil blend after payment.",
      time: "25 Aug 2026 - 01:00 PM",
      status: rank >= 5 ? "done" : "processing",
    },
  ];
}

function OrderIcon({ name }) {
  const icons = {
    question: LuCircleHelp,
    user: LuUser,
    leaf: LuLeaf,
    card: LuCreditCard,
    bottle: LuPillBottle,
  };
  const Icon = icons[name] || LuCircleHelp;

  return <Icon aria-hidden="true" />;
}

function StepIcon({ name }) {
  const icons = {
    question: LuHeart,
    user: LuSparkles,
    leaf: LuClipboardList,
    card: LuCreditCard,
    bottle: LuPillBottle,
    bag: LuPackageCheck,
    check: LuClipboardCheck,
  };
  const Icon = icons[name] || LuHeart;

  return <Icon aria-hidden="true" />;
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

const showKnowledgeWorkflow = false;

export default function Knowledge() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);
  const [isWellnessOpen, setIsWellnessOpen] = useState(false);
  const [activeWellnessTopic, setActiveWellnessTopic] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeHistoryId, setActiveHistoryId] = useState(null);
  const [isPickupConfirmed, setIsPickupConfirmed] = useState(false);
  const [isPickupDateOpen, setIsPickupDateOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupError, setPickupError] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionError, setQuestionError] = useState("");
  const [questionSuccess, setQuestionSuccess] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [historyView, setHistoryView] = useState("questions");
  const [isSavingPickup, setIsSavingPickup] = useState(false);
  const [activeEducation, setActiveEducation] = useState(educationCategories[0].title);

  const loadQuestions = useCallback(async () => {
    if (!user) {
      setQuestions([]);
      return;
    }
    try {
      const result = await apiRequest("/api/knowledge/questions", { auth: true });
      setQuestions(result.questions);
      setActiveHistoryId((current) => current || result.questions[0]?.id || null);
    } catch (error) {
      setQuestionError(error.message);
    }
  }, [user]);

  useEffect(() => { loadQuestions(); }, [loadQuestions]);

  const activeQuestion = questions.find((item) => item.id === activeHistoryId) || questions[0] || null;
  const activeRecipe = activeQuestion?.recipe || null;
  const liveStage = !activeQuestion ? "question_saved"
    : activeRecipe?.preparation_status === "ready" || activeRecipe?.preparation_status === "collected" ? "oil_sent"
      : ["paid", "preparing"].includes(activeRecipe?.preparation_status) ? "paid"
        : activeRecipe ? "recipe_sent"
          : activeQuestion.status === "reviewing" || activeQuestion.status === "answered" ? "sent_to_aromatherapist"
            : "question_saved";
  const submittedAt = activeQuestion?.created_at
    ? new Date(activeQuestion.created_at).toLocaleString("en-FI", { dateStyle: "medium", timeStyle: "short" })
    : "";
  const latestAnswer = activeQuestion?.answers?.[activeQuestion.answers.length - 1]?.answer || "";
  const orderSteps = getOrderSteps(liveStage, activeQuestion?.question, submittedAt, latestAnswer);
  const readyEmailSent = ["ready", "collected"].includes(activeRecipe?.preparation_status);
  const historyItems = questions.map((item) => ({
    id: item.id,
    question: item.question,
    submittedDate: new Date(item.created_at).toLocaleDateString("en-FI", { dateStyle: "medium" }),
    recipe: item.recipe?.title || (item.status === "answered" ? "Recipe preparation pending" : "Under review"),
    price: item.recipe?.price ? `${item.recipe.currency?.trim() || "EUR"} ${Number(item.recipe.price).toFixed(2)}` : "Not available yet",
    paymentDate: item.recipe?.paid_at ? new Date(item.recipe.paid_at).toLocaleDateString("en-FI") : "Not paid",
    pickupLocation: item.recipe?.pickup_location || "Not assigned yet",
    purchasedDate: item.recipe?.paid_at ? new Date(item.recipe.paid_at).toLocaleDateString("en-FI") : "Not purchased",
  }));
  const visibleHistoryItems = historyView === "purchases"
    ? historyItems.filter((item) => item.purchasedDate !== "Not purchased")
    : historyItems;

  const savePickup = async () => {
    if (!activeRecipe || !pickupDate || !pickupTime) {
      setPickupError("Pickup date and time are required.");
      return;
    }
    setIsSavingPickup(true);
    setPickupError("");
    try {
      const result = await apiRequest(`/api/knowledge/recipes/${activeRecipe.id}/pickup`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({ pickupDate, pickupTime }),
      });
      setQuestions((current) => current.map((question) => (
        question.id === activeQuestion.id ? { ...question, recipe: result.recipe } : question
      )));
      setIsPickupConfirmed(true);
      setIsPickupDateOpen(false);
    } catch (error) {
      setPickupError(error.message);
    } finally {
      setIsSavingPickup(false);
    }
  };

  const submitQuestion = async () => {
    if (questionText.trim().length < 10) {
      setQuestionError("Please enter a question with at least 10 characters.");
      return;
    }
    setIsSubmittingQuestion(true);
    setQuestionError("");
    setQuestionSuccess("");
    setAiAnswer("");
    try {
      const result = await apiRequest("/api/knowledge/ai-answer", {
        method: "POST",
        body: JSON.stringify({ question: questionText }),
      });
      setAiAnswer(result.answer);
      setQuestionSuccess("");
    } catch (error) {
      setQuestionError(error.message);
    } finally {
      setIsSubmittingQuestion(false);
    }
  };

  return (
    <div className="knowledge-page">
      <main>
        <section className="knowledge-hero">
          <img src={knowledgeHeader} alt="" aria-hidden="true" />
          <div className="knowledge-hero-content">
            <h1>Knowledge Hub</h1>
            <p className="knowledge-hero-subtitle">Ask. Learn. Create with Nature.</p>
            <p>
              Grow your wellness knowledge with us — join our community to explore
              essential oils and nutrition. Ask questions, connect with our
              aromatherapists, and get personalized recommendations, wellness tips,
              and healthy recipes.
            </p>
          </div>
        </section>

        <section className="wellness-row">
          <button className="wellness-image-card" type="button" onClick={() => setIsWellnessOpen(true)}>
            <img src={knowledgeWellnessImage} alt="Foundational wellness preview" />
          </button>

          <section className="wellness-card">
            <div>
              <h3>Discover Your Foundational Wellness List</h3>
              <p>Simple natural wellness support for everyday wellbeing.</p>

              <button className="primary-btn wellness-view-btn" type="button" onClick={() => setIsWellnessOpen(true)}>
                View
              </button>
            </div>
          </section>

          <button className="wellness-image-card" type="button" onClick={() => setIsWellnessOpen(true)}>
            <img src={knowledgeWellnessImageTwo} alt="Foundational wellness preview" />
          </button>
        </section>

        <section className="knowledge-learning-section">
          <div className="knowledge-learning-heading">
            <p className="section-kicker">Knowledge for everyday wellbeing</p>
            <h2>Learn About Essential Oils</h2>
            <p>Explore practical guidance on common uses, safe dilution, application, storage and responsible everyday wellness routines.</p>
          </div>
          <div className="knowledge-learning-grid">
            {educationCategories.map((category) => (
              <button className={`knowledge-learning-card ${activeEducation === category.title ? "active" : ""}`} type="button" key={category.title} onClick={() => setActiveEducation(category.title)}>
                <span className="knowledge-learning-icon"><StepIcon name={category.icon} /></span>
                <strong>{category.title}</strong>
                <span>{category.summary}</span>
              </button>
            ))}
          </div>
          {educationCategories.filter((category) => category.title === activeEducation).map((category) => (
            <article className="knowledge-learning-guide" key={category.title}>
              <div><StepIcon name={category.icon} /></div>
              <section><h3>{category.title}</h3><p>{category.guide}</p></section>
            </article>
          ))}
          <p className="knowledge-learning-note">Essential-oil information is for general education. Consult a qualified professional when pregnant, breastfeeding, using medication, managing a health condition, or choosing products for children or pets.</p>
        </section>

        <section className="ask-section">
          <section className="ask-card ask-card-wide">
            <div className="panel-heading">
              <h3>Ask Your Question</h3>
            </div>

            <textarea
              placeholder="Type your question here"
              value={questionText}
              onChange={(event) => {
                setQuestionText(event.target.value);
                setQuestionError("");
                setQuestionSuccess("");
              }}
            />

            <div className="question-actions">
              <button className="primary-btn" type="button" disabled={isSubmittingQuestion} onClick={submitQuestion}>
                {isSubmittingQuestion ? "Submitting…" : "Submit"}
              </button>
            </div>
            {questionError && <p className="form-error" role="alert">{questionError}</p>}
            {questionSuccess && <p className="supplier-success" role="status">{questionSuccess}</p>}
            {aiAnswer && <div className="knowledge-ai-answer" aria-live="polite">
              <h4>Answer</h4>
              <p>{aiAnswer}</p>
              <div className="knowledge-profile-cta">
                <div>
                  <strong>Would you like a personalized oil blend?</strong>
                  <span>Register and complete your wellness profile with your current symptoms. Our team can then review your needs and prepare a personalized recommendation for you.</span>
                </div>
                <Link className="primary-btn knowledge-profile-cta-button" to={user ? "/my-profile" : "/signup"}>
                  {user ? "Update My Profile" : "Create My Profile"}
                </Link>
              </div>
            </div>}
          </section>

          <section className="history-prompt-card">
            <div>
              <h3>Looking for your previous details?</h3>
              <p>Your wellness journey is saved here.</p>
            </div>

            <button className="history-prompt-btn" type="button" onClick={() => user ? navigate("/my-profile") : navigate("/login", { state: { from: "/my-profile" } })}>
              <LuShoppingBag aria-hidden="true" />
              <span>Click me</span>
            </button>
          </section>
        </section>

        {showKnowledgeWorkflow && <><section className="hub-layout">
          <section className="how-card">
            <h3>How It Works</h3>

            <div className="steps-list">
              {steps.map(([icon, title, text], index) => (
                <div className="step-item" key={title}>
                  <div className="step-icon">
                    <StepIcon name={icon} />
                  </div>

                  <div className="step-body">
                    <span>{index + 1}</span>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="order-tracker">
            <div className="tracker-heading">
              <h3>Track Your Order</h3>
            </div>

            <div className="status-timeline">
              {orderSteps.map((step) => (
                <article className="status-card" key={step.title}>
                  <div className={`avatar order-avatar order-avatar-${step.icon}`}>
                    <OrderIcon name={step.icon} />
                  </div>

                  <div className="status-text">
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>

                    {step.action === "recipe" && (
                      <button className="mini-btn" type="button" onClick={() => setIsRecipeOpen(true)}>
                        View Recipe & Price
                      </button>
                    )}

                    {step.action === "payment" && (
                      <span className="mini-btn" title="Secure payment will be enabled when the payment provider is connected">
                        Payment Pending
                      </span>
                    )}
                  </div>

                  <div className="status-side">
                    <time>{step.time}</time>
                    <span className={`status-pill ${step.status}`}>
                      {step.status === "done" && <LuCircleCheck aria-hidden="true" />}
                      {step.status === "done" ? "Done" : "Processing"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="pickup-section">
          <div className="pickup-empty-box">
            <div className="pickup-card-heading">
              <div>
                <h3>Personalized Oil Blend</h3>
              </div>
              <span className={`pickup-status ${readyEmailSent ? "ready" : "processing"}`}>
                {readyEmailSent ? "Ready" : "Processing"}
              </span>
            </div>

            <div className="pickup-detail-content">
              {readyEmailSent ? <><p>
                <LuMapPin aria-hidden="true" />
                <span>
                  Your essential oil is ready for pickup at {activeRecipe.pickup_location || "Nature Power Happiness Academy"}.
                </span>
              </p>
              <p>
                <LuClock aria-hidden="true" />
                <span>Pickup available every Friday between 3 PM - 6 PM.</span>
              </p>

              <button
                className={`confirm-btn pickup-save-btn ${isPickupConfirmed ? "confirmed" : ""}`}
                type="button"
                onClick={() => setIsPickupDateOpen(true)}
              >
                {isPickupConfirmed ? "Pickup Confirmed" : "Save Pickup Date"}
              </button>
              </> : <p>
                <LuClock aria-hidden="true" />
                <span>
                  {activeRecipe
                    ? "Your personalized blend is being processed. Pickup scheduling will open when it is ready."
                    : "Submit a question to begin your personalized wellness journey."}
                </span>
              </p>}
            </div>
          </div>

          <div className="pickup-image-box">
            <img src={knowledgeReady} alt="Pickup order summary" />
          </div>
        </section></>}
      </main>

      {isRecipeOpen && (
        <div className="modal-backdrop" role="presentation">
          <div className="recipe-modal" role="dialog" aria-modal="true" aria-labelledby="recipe-title">
            <button className="modal-close" type="button" aria-label="Close recipe details" onClick={() => setIsRecipeOpen(false)}>
              x
            </button>

            <div className="recipe-modal-header">
              <img className="recipe-header-image" src={knowledgeRecipe} alt="" aria-hidden="true" />
              <h3 id="recipe-title">
                Custom Recipe &<br />
                Pricing
              </h3>
            </div>

            <div className="recipe-display-space">
              {activeRecipe ? (
                <div>
                  <strong>{activeRecipe.title}</strong>
                  <p>{activeRecipe.instructions || "Your aromatherapist will add preparation instructions."}</p>
                  {Array.isArray(activeRecipe.ingredients) && activeRecipe.ingredients.length > 0 && (
                    <ul>{activeRecipe.ingredients.map((ingredient) => <li key={String(ingredient)}>{String(ingredient)}</li>)}</ul>
                  )}
                  {activeRecipe.safety_notes && <p><strong>Safety:</strong> {activeRecipe.safety_notes}</p>}
                </div>
              ) : <span>No personalized recipe is available yet.</span>}
            </div>

            <div className="price-row">
              <span>Total Price</span>
              <strong className="price-placeholder">
                {activeRecipe?.price
                  ? `${activeRecipe.currency?.trim() || "EUR"} ${Number(activeRecipe.price).toFixed(2)}`
                  : "Not available yet"}
              </strong>
            </div>

            <p className="payment-note">
              Your personalized oil blend is ready to be created. Please complete your payment to begin the preparation process.
            </p>
          </div>
        </div>
      )}

      {isWellnessOpen && (
        <div className="modal-backdrop" role="presentation">
          <div className="wellness-modal" role="dialog" aria-modal="true" aria-labelledby="wellness-title">
            <button
              className="modal-close"
              type="button"
              aria-label="Close wellness list"
              onClick={() => {
                setIsWellnessOpen(false);
                setActiveWellnessTopic(null);
              }}
            >
              ×
            </button>

            <div
              className="wellness-list-header"
              style={{ backgroundImage: `url(${knowledgeWellnessImageThree})` }}
            >
              <div>
                <h3 id="wellness-title">The foundational wellness list</h3>
                <p>Elevate your wellness, energy, and digestion with foundational wellness.</p>
              </div>
            </div>

            <div className="wellness-topic-list">
              {wellnessTopics.map((topic, index) => {
                const isActive = activeWellnessTopic === topic.title;

                return (
                  <article className={`wellness-topic ${isActive ? "open" : ""}`} key={topic.title}>
                    <button
                      className="wellness-topic-toggle"
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => setActiveWellnessTopic(isActive ? null : topic.title)}
                    >
                      <span className="wellness-topic-number">{String(index + 1).padStart(2, "0")}</span>
                      <span className="wellness-topic-copy">
                        <strong>{topic.title}</strong>
                        <span>{topic.text}</span>
                      </span>
                    </button>

                    {isActive && (
                      <div className="wellness-topic-panel">
                        <div className="wellness-topic-poster">
                          <img src={topic.image} alt={`${topic.title} information`} />
                          {topic.signupPath && (
                            <Link
                              className="wellness-poster-join-link"
                              to={topic.signupPath}
                              aria-label={`Join us from ${topic.title}`}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {isHistoryOpen && (
        <div className="modal-backdrop" role="presentation">
          <div className="history-modal" role="dialog" aria-modal="true" aria-labelledby="history-title">
            <button className="modal-close" type="button" aria-label="Close question history" onClick={() => setIsHistoryOpen(false)}>
              x
            </button>

            <h3 id="history-title">My Questions and Purchase History</h3>
            <p className="history-intro">
              Review your previous questions, recipes, payments, and pickup details.
            </p>

            <div className="history-tabs" aria-label="History views">
              <button className={historyView === "questions" ? "active" : ""} type="button" onClick={() => setHistoryView("questions")}>
                <LuMessageCircle aria-hidden="true" />
                My Questions
              </button>
              <button className={historyView === "purchases" ? "active" : ""} type="button" onClick={() => setHistoryView("purchases")}>
                <LuShoppingBag aria-hidden="true" />
                Purchase History
              </button>
            </div>

            <div className="history-list">
              {visibleHistoryItems.length === 0 && (
                <p className="history-intro">
                  {historyView === "purchases" ? "No purchases yet." : "No questions yet. Submit your first question to begin."}
                </p>
              )}
              {visibleHistoryItems.map((item) => (
                <button
                  className={`history-card ${activeHistoryId === item.id ? "active" : ""}`}
                  type="button"
                  key={item.id}
                  onClick={() => setActiveHistoryId(item.id)}
                >
                  <div className="history-question">
                    <span className="history-icon">
                      <LuMessageCircle aria-hidden="true" />
                    </span>
                    <small>Question</small>
                    <div className="history-empty-space">
                      <strong>{item.question}</strong>
                    </div>
                    <small>Submitted Date</small>
                    <div className="history-empty-space history-date-space">
                      <span>{item.submittedDate}</span>
                    </div>
                  </div>

                  <div className="history-grid">
                    <div className="history-cell history-cell-recipe">
                      <LuLeaf aria-hidden="true" />
                      <span>Recipe</span>
                      <strong>{item.recipe}</strong>
                    </div>
                    <div className="history-cell history-cell-price">
                      <LuTag aria-hidden="true" />
                      <span>Price</span>
                      <strong>{item.price}</strong>
                    </div>
                    <div className="history-cell history-cell-payment">
                      <LuClock aria-hidden="true" />
                      <span>Payment Date</span>
                      <strong>{item.paymentDate}</strong>
                    </div>
                    <div className="history-cell history-cell-location">
                      <LuMapPin aria-hidden="true" />
                      <span>Pickup Location</span>
                      <strong>{item.pickupLocation}</strong>
                    </div>
                    <div className="history-cell history-cell-purchased">
                      <LuClock aria-hidden="true" />
                      <span>Purchased Date</span>
                      <strong>{item.purchasedDate}</strong>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isPickupDateOpen && (
        <div className="modal-backdrop" role="presentation">
          <div className="recipe-modal pickup-date-modal" role="dialog" aria-modal="true" aria-labelledby="pickup-date-title">
            <button className="modal-close" type="button" aria-label="Close pickup date window" onClick={() => setIsPickupDateOpen(false)}>
              x
            </button>

            <h3 id="pickup-date-title">Save Pickup Date</h3>
            <p className="modal-intro">Please enter your preferred pickup date and time.</p>

            <div className="pickup-date-fields">
              <label>
                <span>Date</span>
                <input
                  className="pickup-date-input"
                  type="date"
                  value={pickupDate}
                  readOnly={isPickupConfirmed}
                  onChange={(event) => setPickupDate(event.target.value)}
                />
              </label>

              <label>
                <span>Time</span>
                <input
                  className="pickup-date-input"
                  type="time"
                  value={pickupTime}
                  readOnly={isPickupConfirmed}
                  onChange={(event) => setPickupTime(event.target.value)}
                />
              </label>
            </div>

            {pickupError && <p className="form-error">{pickupError}</p>}

            <div className="pickup-modal-actions">
              <button
                className="secondary-btn"
                type="button"
                onClick={() => {
                  setIsPickupConfirmed(false);
                  setPickupError("");
                }}
              >
                Edit
              </button>

              <button
                className={`confirm-btn ${isPickupConfirmed ? "confirmed" : ""}`}
                type="button"
                disabled={isSavingPickup}
                onClick={savePickup}
              >
                {isSavingPickup ? "Saving…" : isPickupConfirmed ? "Pickup Confirmed" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
