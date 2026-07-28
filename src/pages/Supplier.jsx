import { useCallback, useEffect, useState } from "react";
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
import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";

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
    title: "Accessories Partner",
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

async function fileToDocument(file, type) {
  if (!file) return null;
  if (file.size > 3 * 1024 * 1024) throw new Error("Each uploaded file must be smaller than 3 MB.");
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("An uploaded file could not be read."));
    reader.readAsDataURL(file);
  });
  return { type, name: file.name, dataUrl };
}

function Supplier() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [supplierType, setSupplierType] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationReference, setApplicationReference] = useState("");
  const [adminApplications, setAdminApplications] = useState([]);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminStatus, setAdminStatus] = useState("");
  const [expandedApplicationId, setExpandedApplicationId] = useState(null);
  const [adminMessage, setAdminMessage] = useState("");

  const loadAdminApplications = useCallback(async () => {
    if (user?.role !== "ADMIN") return;
    const params = new URLSearchParams();
    if (adminSearch.trim()) params.set("search", adminSearch.trim());
    if (adminStatus) params.set("status", adminStatus);
    try {
      const result = await apiRequest(`/api/admin/suppliers?${params}`, { auth: true });
      setAdminApplications(result.applications);
    } catch (error) {
      setAdminMessage(error.message);
    }
  }, [adminSearch, adminStatus, user]);

  useEffect(() => {
    loadAdminApplications();
  }, [loadAdminApplications]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    const form = new FormData(event.currentTarget);
    const formElement = event.currentTarget;
    setIsSubmitting(true);
    try {
      const documents = (await Promise.all([
        fileToDocument(form.get("spacePicture")?.size ? form.get("spacePicture") : null, "space-picture"),
        fileToDocument(form.get("qualityCertificate")?.size ? form.get("qualityCertificate") : null, "quality-certificate"),
      ])).filter(Boolean);
      const result = await apiRequest("/api/suppliers", {
        method: "POST",
        body: JSON.stringify({
          companyName: form.get("company"),
          contactName: form.get("contact"),
          email: form.get("email"),
          address: form.get("address"),
          website: form.get("website"),
          supplierType: form.get("supplierType"),
          spaceLocation: form.get("spaceLocation"),
          dailyCustomers: form.get("dailyCustomers") || null,
          averageCustomerSpend: form.get("averageCustomerSpend") || null,
          hourlyPrice: form.get("hourlyPrice") || null,
          partnershipStyle: form.get("partnershipStyle"),
          availableTimes: form.get("availableTimes"),
          offering: form.get("offering"),
          documents,
          consentGiven: true,
        }),
      });
      setSubmitted(true);
      setApplicationReference(result.application.id);
      formElement.reset();
      setSupplierType("");
      await loadAdminApplications();
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateApplication = async (application, status, adminNotes) => {
    setAdminMessage("");
    try {
      const result = await apiRequest(`/api/admin/suppliers/${application.id}`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({ status, adminNotes }),
      });
      setAdminApplications((current) => current.map((item) => item.id === application.id ? { ...item, ...result.application } : item));
      setAdminMessage("Supplier application updated.");
    } catch (error) {
      setAdminMessage(error.message);
    }
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
              Business address <strong>*</strong>
              <input
                name="address"
                required
                autoComplete="street-address"
                placeholder="Street address, city, and postal code"
              />
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
                <option value="accessories-partner">Accessories Partner</option>
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
                      placeholder="Street address, city, and postal code"
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
                    Average customer spend
                    <input
                      name="averageCustomerSpend"
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
            {(supplierType === "nutrition-supplier" ||
              supplierType === "essential-oil-supplier") && (
              <label className="supplier-full-field">
                Quality certificate <strong>*</strong>
                <input
                  name="qualityCertificate"
                  type="file"
                  accept=".pdf,.doc,.docx,image/png,image/jpeg,image/webp"
                  required
                />
              </label>
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
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting…" : "Submit supplier application"}</button>
          {submitted && (
            <p className="supplier-success" role="status">
              Thank you. Your supplier introduction is ready for review.
              {applicationReference && <span> Reference: {applicationReference}</span>}
            </p>
          )}
          {submitError && <p className="form-error" role="alert">{submitError}</p>}
        </form>
      </section>

      {user?.role === "ADMIN" && (
        <section className="supplier-admin-review">
          <div className="supplier-section-heading">
            <p className="supplier-kicker">Admin only</p>
            <h2>Supplier application review</h2>
          </div>
          <div className="supplier-admin-filters">
            <input type="search" value={adminSearch} onChange={(event) => setAdminSearch(event.target.value)} placeholder="Search company, contact, email, or type" />
            <select value={adminStatus} onChange={(event) => setAdminStatus(event.target.value)}>
              <option value="">All statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="WITHDRAWN">Withdrawn</option>
            </select>
          </div>
          {adminMessage && <p className="supplier-success">{adminMessage}</p>}
          <div className="supplier-admin-list">
            {adminApplications.length === 0 && <p>No supplier applications match these filters.</p>}
            {adminApplications.map((application) => {
              const isExpanded = expandedApplicationId === application.id;
              return (
                <article key={application.id}>
                  <button type="button" onClick={() => setExpandedApplicationId(isExpanded ? null : application.id)}>
                    <span><strong>{application.company_name}</strong><small>{application.email}</small></span>
                    <span>{application.supplier_type}</span>
                    <span>{application.status}</span>
                    <span>{isExpanded ? "Hide" : "Review"}</span>
                  </button>
                  {isExpanded && (
                    <SupplierAdminDetails application={application} onUpdate={updateApplication} />
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

function SupplierAdminDetails({ application, onUpdate }) {
  const [status, setStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.admin_notes || "");
  return (
    <div className="supplier-admin-details">
      <dl>
        <div><dt>Contact</dt><dd>{application.contact_name}</dd></div>
        <div><dt>Address</dt><dd>{application.address || "—"}</dd></div>
        <div><dt>Website</dt><dd>{application.website || "—"}</dd></div>
        <div><dt>Offering</dt><dd>{application.offering || "—"}</dd></div>
        {application.space_location && <div><dt>Space</dt><dd>{application.space_location}</dd></div>}
        {application.daily_customers != null && <div><dt>Daily customers</dt><dd>{application.daily_customers}</dd></div>}
        {application.hourly_price != null && <div><dt>Hourly price</dt><dd>{application.hourly_price}</dd></div>}
      </dl>
      {application.documents?.length > 0 && (
        <div className="supplier-admin-documents">
          {application.documents.map((document) => (
            <a key={document.id} href={document.file_url} target="_blank" rel="noreferrer">{document.original_name}</a>
          ))}
        </div>
      )}
      <label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}>
        <option value="SUBMITTED">Submitted</option><option value="UNDER_REVIEW">Under review</option>
        <option value="APPROVED">Approved</option><option value="REJECTED">Rejected</option><option value="WITHDRAWN">Withdrawn</option>
      </select></label>
      <label>Admin notes<textarea value={notes} onChange={(event) => setNotes(event.target.value)} /></label>
      <button type="button" onClick={() => onUpdate(application, status, notes)}>Save review</button>
    </div>
  );
}

export default Supplier;
