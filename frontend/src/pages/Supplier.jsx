import { useState } from "react";
import {
  HiOutlineBadgeCheck,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
  HiOutlineCube,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
  HiOutlineColorSwatch,
  HiOutlineMail,
  HiOutlineSparkles,
  HiOutlineTruck,
} from "react-icons/hi";

import supplierHero from "../assets/images/supplier-hero-premium-v2.png";

import "./Supplier.css";

const partnershipBenefits = [
  {
    icon: <HiOutlineGlobeAlt />,
    title: "Purpose-led growth",
    text: "Build long-term value with a wellness brand committed to people, nature, and responsible growth.",
  },
  {
    icon: <HiOutlineBadgeCheck />,
    title: "Quality first",
    text: "Work with clear specifications, thoughtful product development, and transparent quality standards.",
  },
  {
    icon: <HiOutlineSparkles />,
    title: "Meaningful products",
    text: "Help create natural products and daily rituals that support happier, healthier lives.",
  },
];

const sourcingCategories = [
  {
    icon: <HiOutlineGlobeAlt />,
    title: "Space partner",
    text: "Welcoming venues and community spaces for workshops, events, and wellness experiences.",
  },
  {
    icon: <HiOutlineCube />,
    title: "Tools seller",
    text: "Reliable tools, equipment, packaging, and practical supplies for wellness services.",
  },
  {
    icon: <HiOutlineBeaker />,
    title: "Nutrition supplier",
    text: "Thoughtful food, supplement, and nutrition products that support everyday wellbeing.",
  },
  {
    icon: <HiOutlineColorSwatch />,
    title: "Essential oil supplier",
    text: "Traceable essential oils, botanicals, blends, and responsibly sourced natural ingredients.",
  },
];

const standards = [
  "Clear origin and ingredient traceability",
  "Consistent quality and reliable supply",
  "Ethical labor and responsible business practices",
  "Relevant certificates and safety documentation",
  "Sustainable growing, production, and packaging",
  "Open communication and continuous improvement",
];

const processSteps = [
  {
    number: "01",
    title: "Introduce your company",
    text: "Tell us what you supply, where you operate, and what makes your work distinctive.",
  },
  {
    number: "02",
    title: "Documentation review",
    text: "We review specifications, certificates, traceability, capacity, and sustainability practices.",
  },
  {
    number: "03",
    title: "Samples & assessment",
    text: "Selected suppliers may be invited to share samples for quality and suitability assessment.",
  },
  {
    number: "04",
    title: "Build the partnership",
    text: "Together we agree on standards, timelines, commercial terms, and the path to launch.",
  },
];

function Supplier() {
  const [submitted, setSubmitted] = useState(false);
  const [supplierType, setSupplierType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="supplier-page">
      <section className="supplier-hero">
        <img
          src={supplierHero}
          alt="Botanical ingredients, amber bottles, and sustainable packaging in an artisan studio"
        />
        <div className="supplier-hero-shade"></div>
        <div className="supplier-hero-copy">
          <p className="supplier-kicker">Partner with Happy Drops</p>
          <h1>Grow something meaningful with us.</h1>
          <p>
            We partner with thoughtful growers, makers, manufacturers, and
            innovators who believe exceptional wellness begins at the source.
          </p>
          <a className="supplier-primary-action" href="#supplier-application">
            Become a supplier
          </a>
        </div>
      </section>

      <section className="supplier-intro">
        <div>
          <p className="supplier-kicker">Better, together</p>
          <h2>Partnerships shaped for the long term</h2>
        </div>
        <p>
          Every Happy Drops product begins with people who care deeply about
          their craft. We are building a trusted supplier community that values
          transparency, natural quality, practical innovation, and respect for
          the world behind every ingredient.
        </p>
      </section>

      <section className="supplier-benefits" aria-label="Why partner with Happy Drops">
        {partnershipBenefits.map((benefit) => (
          <article key={benefit.title}>
            <span>{benefit.icon}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </article>
        ))}
      </section>

      <section className="supplier-sourcing">
        <div className="supplier-section-heading">
          <p className="supplier-kicker">What we source</p>
          <h2>From nature’s raw materials to the final thoughtful detail</h2>
          <p>
            We welcome established suppliers and small specialist producers
            whose expertise can strengthen our products and customer experience.
          </p>
        </div>
        <div className="supplier-category-grid">
          {sourcingCategories.map((category, index) => (
            <article key={category.title}>
              <span className="supplier-category-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="supplier-category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="supplier-standards">
        <div className="supplier-standards-copy">
          <p className="supplier-kicker">Our standards</p>
          <h2>Good products require clear provenance</h2>
          <p>
            We look beyond the finished material. We want to understand how it
            was grown, made, handled, tested, and brought to us.
          </p>
          <div className="supplier-standard-list">
            {standards.map((standard) => (
              <div key={standard}>
                <HiOutlineClipboardCheck />
                <span>{standard}</span>
              </div>
            ))}
          </div>
        </div>
        <aside>
          <HiOutlineDocumentText />
          <p>Useful documents</p>
          <h3>Prepare these before applying</h3>
          <ul>
            <li>Company and product overview</li>
            <li>Technical specifications</li>
            <li>Certificates and test reports</li>
            <li>Origin and traceability information</li>
            <li>Capacity and lead-time details</li>
          </ul>
        </aside>
      </section>

      <section className="supplier-process">
        <div className="supplier-section-heading">
          <p className="supplier-kicker">How it works</p>
          <h2>A clear path from introduction to partnership</h2>
        </div>
        <div className="supplier-process-grid">
          {processSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="supplier-application" id="supplier-application">
        <div className="supplier-application-intro">
          <p className="supplier-kicker">Supplier application</p>
          <h2>Tell us what you bring to the table</h2>
          <p>
            Share a concise introduction to your company and offering. Our team
            will review the information and contact suitable partners.
          </p>
          <div>
            <HiOutlineMail />
            <span>
              Prefer email?
              <a href="mailto:info@happydrops.com">info@happydrops.com</a>
            </span>
          </div>
        </div>

        <form className="supplier-form" onSubmit={handleSubmit}>
          <div className="supplier-form-grid">
            <label>
              Company name <strong>*</strong>
              <input name="company" required placeholder="Your company name" />
            </label>
            <label>
              Contact person <strong>*</strong>
              <input name="contact" required placeholder="Full name" />
            </label>
            <label>
              Business email <strong>*</strong>
              <input name="email" type="email" required placeholder="name@company.com" />
            </label>
            <label>
              Country <strong>*</strong>
              <input name="country" required placeholder="Country of operation" />
            </label>
            <label>
              Website
              <input name="website" type="url" placeholder="https://" />
            </label>
            <label>
              Supplier type <strong>*</strong>
              <select
                name="supplierType"
                required
                value={supplierType}
                onChange={(event) => {
                  setSupplierType(event.target.value);
                  setSubmitted(false);
                }}
              >
                <option value="" disabled>Select a supplier type</option>
                <option value="space-partner">Space partner</option>
                <option value="tools-seller">Tools seller</option>
                <option value="nutrition-supplier">Nutrition supplier</option>
                <option value="essential-oil-supplier">Essential oil supplier</option>
              </select>
            </label>
            {supplierType === "space-partner" && (
              <fieldset className="supplier-space-fields supplier-full-field">
                <legend>Space partner details</legend>
                <p>
                  Tell us about the place, its audience, pricing, and when it is
                  available.
                </p>
                <div className="supplier-form-grid">
                  <label>
                    Picture of the space <strong>*</strong>
                    <input
                      name="spacePicture"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      required
                    />
                  </label>
                  <label>
                    Location of the space <strong>*</strong>
                    <input
                      name="spaceLocation"
                      required
                      placeholder="Address, city, and country"
                    />
                  </label>
                  <label>
                    Average customers per day <strong>*</strong>
                    <input
                      name="dailyCustomers"
                      type="number"
                      min="0"
                      required
                      placeholder="For example, 40"
                    />
                  </label>
                  <label>
                    Average nearby customer spend
                    <input
                      name="nearbyCustomerSpend"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Amount in your local currency"
                    />
                  </label>
                  <label>
                    Price per hour <strong>*</strong>
                    <input
                      name="hourlyPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      placeholder="Amount in your local currency"
                    />
                  </label>
                  <label>
                    Partnership style <strong>*</strong>
                    <select name="partnershipStyle" required defaultValue="">
                      <option value="" disabled>Select a partnership style</option>
                      <option>Hourly rental</option>
                      <option>Revenue share</option>
                      <option>Event collaboration</option>
                      <option>Long-term partnership</option>
                      <option>Open to discussion</option>
                    </select>
                  </label>
                  <label className="supplier-full-field">
                    Available times <strong>*</strong>
                    <textarea
                      name="availableTimes"
                      required
                      placeholder="For example: Monday–Friday after 5 PM, and weekends from 9 AM to 6 PM."
                    ></textarea>
                  </label>
                </div>
              </fieldset>
            )}
            <label className="supplier-full-field">
              What would you like to supply? <strong>*</strong>
              <textarea
                name="offering"
                required
                placeholder="Describe your products, capabilities, certifications, and minimum order quantities."
              ></textarea>
            </label>
          </div>
          <label className="supplier-consent">
            <input type="checkbox" required />
            <span>
              I confirm that the information provided is accurate and agree to
              be contacted about this supplier application.
            </span>
          </label>
          <button type="submit">Submit supplier application</button>
          {submitted && (
            <p className="supplier-success" role="status">
              Thank you. Your supplier introduction is ready for review.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default Supplier;
