import aboutHero from "../assets/images/about-hero.png";
import aboutStory from "../assets/images/about-story.png";
import aboutMission from "../assets/images/about-mission.png";
import aboutBottle from "../assets/images/about-bottle.png";

const values = [
  {
    title: "Natural Ingredients",
    text: "Plant-inspired care using lavender, eucalyptus, oils, herbs, and gentle wellness practices.",
  },
  {
    title: "Family Wellness",
    text: "Support for individuals and families, from daily balance to calmer sleep and healthier routines.",
  },
  {
    title: "Expert Guidance",
    text: "Wellness recommendations shaped by holistic knowledge, customer needs, and thoughtful review.",
  },
  {
    title: "Sustainable Care",
    text: "Responsible choices that respect people, nature, and the future of natural wellness.",
  },
];

const steps = [
  "Create your wellness profile",
  "Share your concerns and goals",
  "Receive personalized guidance",
  "Shop products or book workshops",
];

function AboutUs() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="section-kicker">Empowering wellness naturally</p>
          <h1>About Happy Drops</h1>
          <p>
            Happy Drops brings together nature-powered products, family wellness
            support, and personalized recommendations to help people feel
            healthier, calmer, and more confident in their daily care.
          </p>
          <div className="about-hero-actions">
            <a href="#mission" className="primary-action">Our Mission</a>
            <a href="#values" className="secondary-action">Our Values</a>
          </div>
        </div>
        <img src={aboutHero} alt="Happy Drops lavender essential oil bottle" />
      </section>

      <section className="about-intro">
        <p className="section-kicker">Rooted in nature</p>
        <h2>Growing Wellness Together</h2>
        <p>
          We believe wellness should feel simple, personal, and trustworthy.
          Our platform helps customers discover essential oils, nutrition
          guidance, workshops, and practical wellness tools matched to their
          needs.
        </p>
      </section>

      <section className="about-story">
        <img src={aboutStory} alt="Happy Drops wellness tray with lavender oil" />
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
            Every experience is designed to feel warm, calm, and useful, from
            creating a wellness profile to receiving recommendations and booking
            a workshop.
          </p>
        </div>
      </section>

      <section className="about-values" id="values">
        <p className="section-kicker">What we believe in</p>
        <h2>Our Values</h2>
        <div className="value-grid">
          {values.map((value) => (
            <article key={value.title}>
              <span aria-hidden="true"></span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-mission" id="mission">
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
        <img src={aboutMission} alt="Happy Drops lavender bottle and candle" />
      </section>

      <section className="about-process">
        <p className="section-kicker">How it works</p>
        <h2>Your path to better everyday wellness</h2>
        <div className="process-row">
          {steps.map((step, index) => (
            <article key={step}>
              <strong>{index + 1}</strong>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <img src={aboutBottle} alt="Happy Drops lavender essential oil product" />
        <div>
          <p className="section-kicker">Happy Drops</p>
          <h2>Start your natural wellness journey today</h2>
          <p>
            Discover personalized wellness support, calming lavender products,
            and workshops created for healthier, happier families.
          </p>
          <div className="about-hero-actions">
            <a href="#" className="primary-action">Get My Recommendation</a>
            <a href="#" className="secondary-action">Book a Workshop</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
