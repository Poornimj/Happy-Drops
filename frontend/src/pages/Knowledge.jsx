import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import knowledgeHeader from "../assets/images/knowledge-header.png";
import knowledgeReady from "../assets/images/knowledg-ready.png";
import knowledgeWellnessList from "../assets/images/knowledge-wellness-list.png";
import knowledgeWellnessImage from "../assets/images/knowledge-wellness-image.png";
import knowledgeWellnessImageTwo from "../assets/images/knowledge-wellness-image-two.png";
import knowledgeRecipe from "../assets/images/knowledge-recipe.png";
import {
  LuCircleCheck,
  LuCircleHelp,
  LuClock,
  LuCreditCard,
  LuMessageCircle,
  LuLeaf,
  LuMapPin,
  LuPillBottle,
  LuShoppingBag,
  LuTag,
  LuUser,
} from "react-icons/lu";
import "../index.css";

const steps = [
  ["question", "Ask Your Question", "Submit your question."],
  ["user", "Aromatherapist Review", "Your question is sent to our aromatherapist for expert review."],
  ["leaf", "Personalized Recipe", "Receive a custom recipe and oil recommendation with pricing."],
  ["card", "Payment", "Complete your payment securely."],
  ["bottle", "Oil Creation", "We create your custom essential oil blend with care."],
  ["bag", "Ready for Pickup", "Your essential oil is ready. You can pick it up at Nature Power Happiness Academy."],
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

function getOrderSteps(stage) {
  const rank = stageRank[stage] || 1;

  return [
    {
      icon: "question",
      title: "You",
      text: customerQuestion,
      time: "25 Aug 2026 - 10:30 AM",
      status: rank >= 1 ? "done" : "processing",
    },
    {
      icon: "user",
      title: "Aromatherapist Review",
      text:
        rank >= 3
          ? "Our aromatherapist has reviewed your question."
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

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function StepIcon({ name }) {
  const icons = {
    question: <path d="M9.5 9a3 3 0 1 1 4.9 2.3c-.9.7-1.4 1.2-1.4 2.7M12 17h.01" />,
    user: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
      </>
    ),
    leaf: (
      <>
        <path d="M12 20V9" />
        <path d="M12 16c-4.5-1-7-4-7-9 4.5.2 7.5 2.7 7 9Z" />
        <path d="M12 16c4.5-1 7-4 7-9-4.5.2-7.5 2.7-7 9Z" />
      </>
    ),
    card: (
      <>
        <rect x="4" y="7" width="16" height="11" rx="2" />
        <path d="M4 11h16M7 15h4" />
      </>
    ),
    bottle: (
      <>
        <path d="M10 3h4v4h-4z" />
        <path d="M9 7h6l1 3v10H8V10z" />
        <path d="M11 13h2" />
      </>
    ),
    bag: (
      <>
        <path d="M6 9h12l-1 12H7L6 9Z" />
        <path d="M9 9a3 3 0 0 1 6 0" />
        <path d="M10 15l2 2 4-5" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.2 2.2 2.2 4.8-5" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

export default function Knowledge() {
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);
  const [isWellnessOpen, setIsWellnessOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeHistoryId, setActiveHistoryId] = useState(questionHistory[0].id);
  const [isPickupConfirmed, setIsPickupConfirmed] = useState(false);
  const [isPickupDateOpen, setIsPickupDateOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupError, setPickupError] = useState("");
  const orderSteps = getOrderSteps(orderStage);
  const readyEmailSent = true;

  return (
    <div className="knowledge-page">
      <Navbar />

      <main>
        <section className="knowledge-hero">
          <img src={knowledgeHeader} alt="" aria-hidden="true" />
          <div className="knowledge-hero-content">
            <h1>Knowledge Hub</h1>
            <p className="knowledge-hero-subtitle">Ask. Learn. Create with Nature.</p>
            <p>
              Ask questions about essential oils and nutrition, connect with our
              aromatherapists, and get personalized recommendations and recipes.
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

        <section className="access-banner">
          <div>
            <LockIcon />
            <span>Please register or login to access the Knowledge Hub and ask your questions.</span>
          </div>
        </section>

        <section className="ask-section">
          <section className="ask-card ask-card-wide">
            <div className="panel-heading">
              <h3>Ask Your Question</h3>
            </div>

            <textarea placeholder="Type your question here" />

            <div className="question-actions">
              <button className="primary-btn" type="button">Submit</button>
            </div>
          </section>

          <section className="history-prompt-card">
            <div>
              <h3>Looking for your previous details?</h3>
              <p>Your wellness journey is saved here.</p>
            </div>

            <button className="history-prompt-btn" type="button" onClick={() => setIsHistoryOpen(true)}>
              <LuShoppingBag aria-hidden="true" />
              <span>Click me</span>
            </button>
          </section>
        </section>

        <section className="hub-layout">
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
                      <a className="mini-btn" href="/payment">
                        Pay Now
                      </a>
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
              <p>
                <LuMapPin aria-hidden="true" />
                <span>
                  Your essential oil is ready for pickup at Helsinki XR Center,
                  Hämeentie 135 A, 00560 Helsinki.
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
            </div>
          </div>

          <div className="pickup-image-box">
            <img src={knowledgeReady} alt="Pickup order summary" />
          </div>
        </section>
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
              <span>Recipe details will display here.</span>
            </div>

            <div className="price-row">
              <span>Total Price</span>
              <strong className="price-placeholder">Price will display here</strong>
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
            <button className="modal-close" type="button" aria-label="Close wellness list" onClick={() => setIsWellnessOpen(false)}>
              x
            </button>

            <img
              id="wellness-title"
              className="wellness-list-image"
              src={knowledgeWellnessList}
              alt="Foundational wellness list"
            />
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
              <button className="active" type="button">
                <LuMessageCircle aria-hidden="true" />
                My Questions
              </button>
              <button type="button">
                <LuShoppingBag aria-hidden="true" />
                Purchase History
              </button>
            </div>

            <div className="history-list">
              {questionHistory.map((item) => (
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
                  type="text"
                  placeholder="Example: Friday 25 Aug 2026"
                  value={pickupDate}
                  readOnly={isPickupConfirmed}
                  onChange={(event) => setPickupDate(event.target.value)}
                />
              </label>

              <label>
                <span>Time</span>
                <input
                  className="pickup-date-input"
                  type="text"
                  placeholder="Example: 3:30 PM"
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
                onClick={() => {
                  if (!pickupDate.trim() || !pickupTime.trim()) {
                    setPickupError("Pickup date and time are required.");
                    return;
                  }

                  setPickupError("");
                  setIsPickupConfirmed(true);
                }}
              >
                {isPickupConfirmed ? "Pickup Confirmed" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
