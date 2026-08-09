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
import knowledgeCleanEnergy from "../assets/images/knowledge-clean-energy.png";
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
  { icon: "leaf", title: "Why Use Essential Oils?", summary: "Discover the timeless relationship between aromatic plants, daily rituals and personal wellbeing.", details: [
    { title: "Nature's concentrated aromas", body: "Essential oils are highly concentrated aromatic extracts obtained from flowers, leaves, bark, roots, fruits, seeds and herbs. Unlike ordinary vegetable oils, their tiny volatile molecules evaporate easily, allowing us to experience each plant's distinctive aroma." },
    { title: "A tradition across cultures", body: "For thousands of years, aromatic plants have been valued in Egypt, Greece, Rome, India and China as part of bathing, massage, skincare, ceremonies and traditional wellbeing practices. Today they remain a simple way to bring mindful moments of nature into modern life." },
    { title: "Body, mind and everyday rituals", body: "When an aroma is inhaled, scent signals connect with brain regions involved in emotion, memory and stress responses. Correctly diluted oils may also be included in massage and skincare. People often choose lavender for a peaceful evening atmosphere, citrus for freshness, peppermint for an invigorating sensation, or frankincense for quiet reflection." },
    { title: "Wellbeing with perspective", body: "Essential oils can complement healthy routines such as sleep, movement, balanced nutrition and relaxation. They are not medicines and should not replace diagnosis, treatment or advice from a qualified healthcare professional." },
  ] },
  { icon: "bottle", title: "Aromatherapy", summary: "Learn how scent can become a mindful language of calm, connection and renewal.", details: [
    { title: "The healing language of nature", body: "Imagine the fresh scent of a Finnish pine forest after summer rain. That immediate feeling of calm and connection illustrates aromatherapy: the thoughtful use of natural plant aromas to support emotional, mental and physical wellbeing." },
    { title: "How aroma is experienced", body: "Aromatic molecules travel through the nose and create scent signals associated with memory, mood and stress responses. This is why a familiar fragrance can quickly bring back a memory or change the atmosphere of a room. When oils are properly diluted in a carrier oil, aromatherapy can also accompany gentle massage." },
    { title: "Simple ways to begin", body: "Create an evening ritual with lavender, enjoy a bright citrus aroma in the morning, or use a refreshing forest-inspired scent after sauna. Follow diffuser directions, ventilate the room, begin with short sessions and choose aromas that feel comfortable to everyone present." },
    { title: "Listen to your body", body: "Stop using an aroma if it causes headache, nausea, skin irritation or breathing discomfort. Persistent sleep, mood, breathing or pain concerns should always be discussed with a healthcare professional." },
  ] },
  { icon: "user", title: "Skin & Beauty", summary: "Find gentle ways to care for your skin in everyday routines.", details: [
    { title: "Start with gentle care", body: "Choose skin-appropriate oils and use them as part of a simple daily routine. A small amount, properly diluted, can help keep the experience comfortable and easy to enjoy." },
    { title: "Patch test first", body: "Before using a new product more widely, test a small area of skin first. This helps you notice whether the oil feels comfortable for your skin before you use it more often." },
    { title: "Be mindful with sensitive skin", body: "Keep essential oils away from broken or irritated skin, and use extra care with citrus oils that may increase sun sensitivity. If your skin is already sensitive, it is best to keep the routine simple and gentle." },
  ] },
  { icon: "bag", title: "Sleep & Relaxation", summary: "Create a calm evening routine that helps you unwind before bed.", details: [
    { title: "Build a calming rhythm", body: "A quiet bedtime routine, less evening screen time and a comfortable sleep space can help your nights feel more restful. Small habits repeated each evening can make winding down feel easier." },
    { title: "Use scent as part of the setting", body: "Some people enjoy a gently diffused lavender aroma as part of their evening routine. Follow the product directions and keep the atmosphere light, comfortable and relaxing." },
    { title: "Keep the experience comfortable", body: "If an aroma feels too strong, reduce the amount, improve ventilation or stop using it for the moment. The goal is a calm space that supports rest, not an overpowering scent." },
  ] },
  { icon: "question", title: "Stress & Mood", summary: "Support calmer days with simple habits and comforting aromas.", details: [
    { title: "Support everyday balance", body: "Slow breathing, movement, regular meals and good sleep can help you feel more balanced through the day. These small habits often work best when they are consistent and realistic." },
    { title: "Add a comforting aroma", body: "A pleasant aroma may complement those habits and help your routine feel more calming. Choose scents that feel pleasant and light rather than intense or distracting." },
    { title: "Know when to seek extra support", body: "Comforting routines are helpful, but they should not replace professional support for ongoing low mood or anxiety. If stress or mood concerns continue or affect daily life, speak with a qualified professional." },
  ] },
  { icon: "card", title: "Everyday Comfort", summary: "Build small daily rituals that help you feel more comfortable.", details: [
    { title: "Make comfort part of the day", body: "Rest, gentle movement and hydration can help everyday life feel easier. Simple routines often create the most dependable sense of comfort over time." },
    { title: "Use aromatic products as a small support", body: "Aromatic products may be part of a comforting self-care routine and can make the moment feel more pleasant. Keep the experience gentle and easy to maintain." },
    { title: "Stay mindful of your needs", body: "If you have ongoing discomfort or health concerns, get advice from a qualified healthcare professional. Everyday comfort should support your routine, not replace medical care." },
  ] },
  { icon: "check", title: "Safe Use & Dilution", summary: "Use concentrated plant extracts thoughtfully with label-first guidance and careful dilution.", details: [
    { title: "Read the product label first", body: "Every oil has a different chemistry and intended use. Follow the directions and warnings on its own label rather than applying one rule to every essential oil. Use the smallest practical amount and never assume that natural means risk-free." },
    { title: "Dilute for topical use", body: "Mix essential oil with a suitable carrier oil to reduce the chance of skin sensitivity and slow evaporation. doTERRA's general educational guidance suggests beginning around one drop of essential oil to five drops of carrier oil, and around one to ten for stronger oils, but the individual product label must take priority." },
    { title: "Protect sensitive areas", body: "Avoid the eyes, inner ears, nose, broken skin and other sensitive areas. Patch test a small area before wider use. Some citrus oils can increase sensitivity to sunlight, so check the label and avoid direct sunlight or UV exposure for the stated period after topical use." },
    { title: "Children and individual needs", body: "Keep oils out of children's reach and supervise any use around children. Seek professional advice during pregnancy or breastfeeding, when using medication, when managing a medical condition, and before using oils for infants, children or pets." },
    { title: "If a reaction occurs", body: "Stop use immediately. Leave the area and increase ventilation after an inhalation reaction; discontinue topical use after skin irritation. Seek urgent medical help for breathing difficulty or a severe or persistent reaction." },
  ] },
  { icon: "check", title: "Storage & Quality", summary: "Preserve each oil by protecting it from light, heat, air and uncertain sourcing.", details: [
    { title: "Store bottles correctly", body: "Keep essential oils in securely capped glass bottles at a stable room temperature. Protect them from direct sunlight, UV exposure, window sills, hot cars and other temperature extremes." },
    { title: "Limit air exposure", body: "Close the cap tightly after every use. Prolonged exposure to oxygen can contribute to oxidation, while an unsecured cap also allows aromatic compounds to evaporate." },
    { title: "Choose transparent quality", body: "Look for the botanical identity, clear usage instructions, warnings, a lot or batch number and an expiry or best-use date. Choose suppliers that explain where their plants come from, how oils are produced and how each batch is tested." },
    { title: "Purity and testing matter", body: "Quality testing can help verify botanical identity, chemical composition and the absence of contamination, synthetic fragrance or undisclosed fillers. Keep the original label and packaging so safety and traceability information remain available." },
  ] },
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
  const [activeEducation, setActiveEducation] = useState(null);

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

      {educationCategories.filter((category) => category.title === activeEducation).map((category) => (
        <div className="modal-backdrop" role="presentation" key={category.title} onClick={() => setActiveEducation(null)}>
          <article className="knowledge-education-modal" role="dialog" aria-modal="true" aria-labelledby="education-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close essential oil information" onClick={() => setActiveEducation(null)}>
              ×
            </button>
            <div className="knowledge-education-modal-icon"><StepIcon name={category.icon} /></div>
            <p className="section-kicker">Essential oil knowledge</p>
            <h3 id="education-modal-title">{category.title}</h3>
            <strong>{category.summary}</strong>
            {category.details ? <div className="knowledge-education-sections">{category.details.map((section) => <section key={section.title}><h4>{section.title}</h4><p>{section.body}</p></section>)}</div> : <p>{category.guide}</p>}
            <aside>
              Essential-oil information is for general education. Consult a qualified professional when pregnant, breastfeeding, using medication, managing a health condition, or choosing products for children or pets.
            </aside>
          </article>
        </div>
      ))}

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
