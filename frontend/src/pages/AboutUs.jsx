import aboutMission from "../assets/images/mission.png";
import footerLogo from "../assets/logos/happy-drops-exact-logo-no-box.png";
import confirmedBottle from "../assets/images/mission.png";
import heroCalmImage from "../assets/images/happy-drops-hero-calm.jpeg";
import growingHarvestImage from "../assets/images/happy-drops-growing-harvest.jpeg";
import ourStoryHomeWellnessImage from "../assets/images/happy-drops-our-story-home-wellness.png";
import happyDropsLogo from "../assets/images/happy-drops-logo.jpeg";

import Footer from "../components/Footer";
import "./AboutUs.css";
function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.6 3.4C13.2 3.6 6.4 7.4 4.2 13.1c-1.1 2.9-.3 5.3 1.6 6.7 1.8 1.3 4.4 1.3 6.8-.2 4.9-3 7.7-9.4 8-16.2Z" />
      <path d="M4.8 19.4c3.3-4.7 7.6-8.1 13.1-10.2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20.4S4.2 15.5 3.1 9.7C2.5 6.5 4.5 4 7.4 4c1.8 0 3.4 1 4.6 2.6C13.2 5 14.6 4 16.6 4c2.9 0 4.9 2.5 4.3 5.7C19.8 15.5 12 20.4 12 20.4Z" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.2 14.2 5l2.8-.1 1 2.7 2.3 1.6-.8 2.8.8 2.8-2.3 1.6-1 2.7-2.8-.1-2.2 1.8-2.2-1.8-2.8.1-1-2.7-2.3-1.6.8-2.8-.8-2.8L6 7.6l1-2.7 2.8.1L12 3.2Z" />
      <path d="m8.6 12 2.3 2.3 4.7-5" />
    </svg>
  );
}

function SproutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21V10" />
      <path d="M12 10C9.3 6.8 6.3 5.4 3.5 5.4 4.1 9.5 6.6 12 12 12" />
      <path d="M12 10c2.7-3.2 5.7-4.6 8.5-4.6-.6 4.1-3.1 6.6-8.5 6.6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4.5 20.5c1.4-4 4.1-6 7.5-6s6.1 2 7.5 6" />
    </svg>
  );
}

function FormIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3.8h10a2 2 0 0 1 2 2v15H5v-15a2 2 0 0 1 2-2Z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  );
}

function LightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M8.2 14.8a6 6 0 1 1 7.6 0c-.9.7-1.3 1.4-1.3 2.2h-5c0-.8-.4-1.5-1.3-2.2Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8h12l-1 13H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

const values = [
  {
    icon: <LeafIcon />,
    title: "Natural Ingredients",
    text: "Plant-inspired care using lavender, eucalyptus, oils, herbs, and gentle wellness practices.",
  },
  {
    icon: <HeartIcon />,
    title: "Family Wellness",
    text: "Support for individuals and families, from daily balance to calmer sleep and healthier routines.",
  },
  {
    icon: <BadgeIcon />,
    title: "Expert Guidance",
    text: "Wellness recommendations shaped by holistic knowledge, customer needs, and thoughtful review.",
  },
  {
    icon: <SproutIcon />,
    title: "Sustainable Care",
    text: "Responsible choices that respect people, nature, and the future of natural wellness.",
  },
];

const fourRealValues = [
  {
    key: "health",
    eyebrow: "The First Real",
    title: "Real",
    emphasis: "Health",
    text: "Plant ancient knowledge combined from East and West. Proven by hundreds of thousands of cases — a visible result of wisdom and trust.",
    textLines: [
      "Plant ancient knowledge",
      "combined from East and West.",
      "Proven by hundreds of",
      "thousands of cases — a visible",
      "result of wisdom and trust.",
    ],
  },
  {
    key: "wealth",
    eyebrow: "The Second Real",
    title: "Real",
    emphasis: "Wealth",
    text: "Investing in longevity with quality of life, where your body and mind have the best energy to live fulfilled moments.",
    textLines: [
      "Investing in longevity with",
      "quality of life, where your body",
      "and mind have the best energy",
      "to live fulfilled moments.",
    ],
    wealthMeans: [
      "Physical wealth",
      "Financial wealth",
      "Emotional wealth",
      "Social wealth",
      "Intellectual wealth",
      "Spiritual wealth",
    ],
  },
  {
    key: "happiness",
    eyebrow: "The Third Real",
    title: "Real",
    emphasis: "Happiness",
    text: "With a trusted community, we learn together how to manage our mind, body, heart and time, to reach 'Happier me, Happier us.' With the knowledge of nature's power, we spread Finnish lifestyle wisdom for happiness.",
    textLines: [
      "With a trusted community, we",
      "learn together how to manage",
      "our mind, body, heart and time,",
      "to reach 'Happier me, Happier",
      "us.' With the knowledge of",
      "nature's power, we spread",
      "Finnish lifestyle wisdom for",
      "happiness.",
    ],
  },
  {
    key: "sustainability",
    eyebrow: "The Fourth Real",
    title: "Real",
    emphasis: "Sustainability",
    text: "Caring for the plants, the people and the land behind every drop — so the source and the wisdom regenerate, never run out.",
    textLines: [
      "Caring for the plants, the people",
      "and the land behind every drop",
      "— so the source and the",
      "wisdom regenerate, never run",
      "out.",
    ],
  },
];

const steps = [
  { icon: <UserIcon />, text: "Create your wellness profile" },
  { icon: <FormIcon />, text: "Share your concerns and goals" },
  { icon: <LightIcon />, text: "Receive personalized guidance" },
  { icon: <BagIcon />, text: "Shop products or book workshops" },
];

function AboutUs() {
  return (
    <main className="about-page">
                                                <section className="about-hero about-calm-image-hero">
        <img
          className="about-calm-hero-image"
          src={heroCalmImage}
          alt="Happy Drops wellness with two people and Anti Wrinkle bottle"
        />
        <div className="about-calm-hero-overlay"></div>
        <div className="about-hero-copy">
          <p className="section-kicker">Empowering wellness naturally</p>
          <h1>About Happy Drops</h1>
          <p className="hero-support-line">
            Personalized Wellness, Designed for Longevity
          </p>
          <p>
            Happy Drops brings together nature-powered products, family wellness
            support, and personalized recommendations to help people feel
            healthier and more confident in their daily care.
          </p>
        </div>
      </section>

                              <section className="about-intro about-intro-split">
        <div className="about-intro-copy">
          <p className="section-kicker">Rooted in nature</p>
          <h2>Growing Wellness Together</h2>
          <p>
            We believe wellness should feel simple, personal, and trustworthy.
            Our platform helps customers discover essential oils, nutrition
            guidance, workshops, and practical wellness tools matched to their
            needs.
          </p>
        </div>
        <img
          className="about-intro-image"
          src={growingHarvestImage}
          alt="Hands harvesting natural herbs in a garden"
        />
      </section>

                  <section className="about-story about-story-home">
        <div className="about-story-image-wrap about-candle-glow">
          <img
            src={ourStoryHomeWellnessImage}
            alt="Natural home wellness routine with herbs and guidance"
          />
        </div>
        <div>
          <p className="section-kicker">Our Story</p>
          <h2>Natural care made easier for every home</h2>
          <p>
            Happy Drops was created for people who want natural wellness without
            confusion. By combining holistic knowledge, expert-reviewed support,
            and easy digital tools, we help families choose products and
            workshops that fit real life.
          </p>
          <p>
            Every experience is designed to feel calm, connected, and useful, from
            creating a wellness profile to receiving recommendations and booking
            a workshop.
          </p>
        </div>
      </section>

                              <section className="about-values about-values-interactive" id="values" aria-label="Happy Drops Four Real values">
        <div className="about-values-branches" aria-hidden="true"></div>
        <div className="about-values-header">
          <h2>Four Real, One Purpose.</h2>
          <p>Rooted in wisdom. Powered by nature. Driven by you.</p>
        </div>

        <div className="about-values-card-grid">
          {fourRealValues.map((value, index) => (
            <article
              className={`about-real-card about-real-${value.key}`}
              key={value.key}
              style={{ "--value-delay": `${index * 0.12}s` }}
            >
              <span className="about-real-drop" aria-hidden="true"></span>
              <p className="about-real-eyebrow">{value.eyebrow}</p>
              <h3>
                {value.title} <em>{value.emphasis}</em>
              </h3>
              <span className="about-real-divider" aria-hidden="true"></span>
              <div className="about-real-body">
                <p>
                  {(value.textLines || [value.text]).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
                {value.wealthMeans && (
                  <div className="about-wealth-means">
                    <strong>Wealth means:</strong>
                    <ul>
                      {value.wealthMeans.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

            <section className="about-mission about-mission-confirmed" id="mission">
        <div>
          <p className="section-kicker">Our Mission</p>
          <h2>Personal wellness, guided by nature and care</h2>
          <p>
            Our mission is to make natural wellness more personal, accessible,
            and easy to follow. We help customers create wellness profiles,
            understand their needs, and discover products, workshops, and
            guidance that support their goals.
          </p>
          <a href="#" className="primary-action">Create Your Wellness Profile</a>
        </div>
        <img src={confirmedBottle} alt="Happy Drops Anti Wrinkle bottle" />
      </section>
    </main>
  );
}

export default AboutUs;
























