import { useState } from "react";
import Navbar from "../components/Navbar";
import knowledgeHeader from "../assets/images/knowledge-header.png";
import knowledgeReady from "../assets/images/knowledge-ready.png";
import knowledgeFooter from "../assets/images/knowledge-footer.png";
import "../index.css";

const steps = [
  ["question", "Ask Your Question", "Submit your question."],
  ["user", "Aromatherapist Review", "Your question is sent to our aromatherapist for expert review."],
  ["leaf", "Personalized Recipe", "Receive a custom recipe and oil recommendation with pricing."],
  ["card", "Payment", "Complete your payment securely."],
  ["bottle", "Oil Creation", "We create your custom essential oil blend with care."],
  ["bag", "Ready for Pickup", "Your essential oil is ready. You can pick it up at Nature Power Happiness Academy."],
];

const orderSteps = [
  {
    icon: "question",
    title: "You",
    text: "What essential oil can help with stress and better sleep?",
    time: "25 Aug 2026 - 10:30 AM",
    status: "done",
  },
  {
    icon: "user",
    title: "Aromatherapist Review",
    text: "Our aromatherapist has reviewed your question.",
    time: "25 Aug 2026 - 11:15 AM",
    status: "done",
  },
  {
    icon: "leaf",
    title: "Personalized Recipe",
    text: "Here is your custom blend recipe and pricing.",
    time: "25 Aug 2026 - 11:45 AM",
    status: "done",
    action: "recipe",
  },
  {
    icon: "card",
    title: "Payment",
    text: "Please complete your payment to continue.",
    time: "25 Aug 2026 - 12:10 PM",
    status: "processing",
    action: "payment",
  },
  {
    icon: "bottle",
    title: "Oil Creation Started",
    text: "We will start creating your custom essential oil blend after payment.",
    time: "25 Aug 2026 - 01:00 PM",
    status: "processing",
  },
];

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

        <section className="access-banner">
          <div>
            <LockIcon />
            <span>Please register or login to access the Knowledge Hub and ask your questions.</span>
          </div>
        </section>

        <section className="hub-layout">
          <aside className="how-card">
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
          </aside>

          <section className="question-panel">
            <section className="ask-card">
              <div className="panel-heading">
                <h3>Ask Your Question</h3>
                <a className="my-questions-link" href="/my-questions">
                  View My Questions <span aria-hidden="true">-&gt;</span>
                </a>
              </div>

              <textarea placeholder="Type your question here" />

              <div className="question-actions">
                <button className="primary-btn" type="button">Submit</button>
              </div>
            </section>

            <section className="order-tracker">
              <div className="tracker-heading">
                <h3>Track Your Order</h3>
              </div>

              <div className="status-timeline">
                {orderSteps.map((step) => (
                  <article className="status-card" key={step.title}>
                    <div className="avatar">
                      <StepIcon name={step.icon} />
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
                        <button className="mini-btn" type="button">Pay Now</button>
                      )}
                    </div>

                    <div className="status-side">
                      <time>{step.time}</time>
                      <span className={`status-pill ${step.status}`}>
                        {step.status === "done" && <StepIcon name="check" />}
                        {step.status === "done" ? "Done" : "Processing"}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </section>

        <section className="pickup-section">
          <div className="pickup-empty-box">
            <div className="pickup-card-heading">
              <div>
                <h3>Personalized Oil Blend</h3>
                <p>Made Just for You</p>
              </div>
              <span className="pickup-status">Ready for Pickup</span>
            </div>

            <div className="pickup-message">
              <p>Your essential oil is ready.</p>
              <p>You can pick it up at Helsinki XR Center, Hämeentie 135 A, 00560 Helsinki.</p>
            </div>

            <div className="pickup-time-box">
              <CalendarIcon />
              <div>
                <span>Pickup every Wednesday</span>
                <strong>between 3 PM - 6 PM</strong>
              </div>
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

            <h3 id="recipe-title">Recipe & Price</h3>
            <p className="modal-intro">Custom calming blend recommendation for stress relief and better sleep.</p>

            <div className="recipe-detail-list">
              <div><span>Lavender Essential Oil</span><strong>5 drops</strong></div>
              <div><span>Frankincense Essential Oil</span><strong>3 drops</strong></div>
              <div><span>Sweet Orange Essential Oil</span><strong>2 drops</strong></div>
              <div><span>Jojoba Carrier Oil</span><strong>15 ml</strong></div>
            </div>

            <div className="price-row">
              <span>Total Price</span>
              <strong>EUR 24.90</strong>
            </div>

            <button className="primary-btn modal-action" type="button">Continue to Payment</button>
          </div>
        </div>
      )}

      <footer className="site-footer" aria-label="Happy Drops footer">
        <img src={knowledgeFooter} alt="Happy Drops footer with quick links, customer care, account details, and contact information" />
      </footer>
    </div>
  );
}
