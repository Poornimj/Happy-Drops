import { useCallback, useEffect, useState } from "react";
import {
  HiOutlineBadgeCheck,
  HiOutlineHeart,
  HiOutlineLightBulb,
  HiOutlineMail,
  HiOutlineUserGroup,
} from "react-icons/hi";

import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import "./Therapists.css";

const benefits = [
  {
    icon: <HiOutlineUserGroup />,
    title: "Meet more customers",
    text: "Become visible to people looking for thoughtful, qualified wellness support.",
  },
  {
    icon: <HiOutlineLightBulb />,
    title: "Grow together",
    text: "Take part in workshops, shared learning, and meaningful service collaborations.",
  },
  {
    icon: <HiOutlineHeart />,
    title: "Create lasting value",
    text: "Help families build safe, practical wellness habits while developing your own practice.",
  },
];

const reviewSteps = [
  ["01", "Tell us about yourself", "Share your experience, qualifications, and the work you care about."],
  ["02", "Qualification review", "Our team checks your certificate and professional background."],
  ["03", "Meet the Happy Drops team", "Suitable applicants are invited to discuss values, services, and partnership opportunities."],
  ["04", "Build a trusted partnership", "Together we agree on the right way to support customers and grow responsibly."],
];

async function fileToDocument(file) {
  if (!file?.size) throw new Error("Please upload your aromatherapist certificate.");
  if (file.size > 3 * 1024 * 1024) throw new Error("The certificate must be smaller than 3 MB.");
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("The certificate could not be read."));
    reader.readAsDataURL(file);
  });
  return { type: "aromatherapist-certificate", name: file.name, dataUrl };
}

export default function Therapists() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
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
      const result = await apiRequest(`/api/admin/therapists?${params}`, { auth: true });
      setAdminApplications(result.applications);
    } catch (loadError) {
      setAdminMessage(loadError.message);
    }
  }, [adminSearch, adminStatus, user]);

  useEffect(() => {
    loadAdminApplications();
  }, [loadAdminApplications]);

  const updateApplication = async (application, status, adminNotes) => {
    setAdminMessage("");
    try {
      const result = await apiRequest(`/api/admin/therapists/${application.id}`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({ status, adminNotes }),
      });
      setAdminApplications((current) => current.map((item) => item.id === application.id ? { ...item, ...result.application } : item));
      setAdminMessage("Therapist application updated.");
    } catch (updateError) {
      setAdminMessage(updateError.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setReference("");
    setIsSubmitting(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      const certificate = await fileToDocument(form.get("certificate"));
      const result = await apiRequest("/api/therapists/applications", {
        method: "POST",
        body: JSON.stringify({
          fullName: form.get("fullName"),
          email: form.get("email"),
          phone: form.get("phone"),
          location: form.get("location"),
          qualifications: form.get("qualifications"),
          yearsExperience: form.get("yearsExperience"),
          customersServed: form.get("customersServed"),
          shortCv: form.get("shortCv"),
          passion: form.get("passion"),
          certificate,
          consentGiven: true,
        }),
      });
      setReference(result.application.id);
      formElement.reset();
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="therapist-page">
      <section className="therapist-hero">
        <div className="therapist-hero-copy">
          <p className="therapist-kicker">Partner with Happy Drops</p>
          <h1>Grow your practice. Support happier lives.</h1>
          <p>
            We are building a trusted network of qualified aromatherapists and
            wellness professionals who want to serve customers with care,
            integrity, and practical expertise.
          </p>
          <a href="#therapist-application" className="therapist-primary-action">Apply as a therapist</a>
        </div>
        <div className="therapist-hero-art" aria-hidden="true">
          <span className="therapist-art-ring"><HiOutlineHeart /></span>
          <span className="therapist-art-leaf">✦</span>
          <span className="therapist-art-card"><HiOutlineBadgeCheck /> Qualified care</span>
        </div>
      </section>

      <section className="therapist-intro">
        <div>
          <p className="therapist-kicker">A partnership with purpose</p>
          <h2>Good professionals deserve the right community</h2>
        </div>
        <p>
          Happy Drops connects skilled therapists with customers seeking
          responsible wellness guidance. We want to understand your experience,
          values, and passion before exploring how our services can benefit both
          your practice and the people we serve.
        </p>
      </section>

      <section className="therapist-benefits" aria-label="Therapist partnership benefits">
        {benefits.map((benefit) => (
          <article key={benefit.title}>
            <span>{benefit.icon}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </article>
        ))}
      </section>

      <section className="therapist-process">
        <div className="therapist-section-heading">
          <p className="therapist-kicker">How it works</p>
          <h2>A thoughtful path to partnership</h2>
          <p>Every application is reviewed before a therapist joins our partner network.</p>
        </div>
        <div className="therapist-process-grid">
          {reviewSteps.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="therapist-application" id="therapist-application">
        <div className="therapist-application-intro">
          <p className="therapist-kicker">Therapist application</p>
          <h2>Introduce your professional practice</h2>
          <p>
            Please provide enough information for an initial qualification
            review. Your certificate is used only for assessing this application.
          </p>
          <div><HiOutlineMail /><span>Questions?<a href="mailto:info@happydrops.fi">info@happydrops.fi</a></span></div>
        </div>

        <form className="therapist-form" onSubmit={handleSubmit}>
          <div className="therapist-form-grid">
            <label>Full name <strong>*</strong><input name="fullName" autoComplete="name" required placeholder="Your full name" /></label>
            <label>Email address <strong>*</strong><input name="email" type="email" autoComplete="email" required placeholder="name@example.com" /></label>
            <label>Phone number <strong>*</strong><input name="phone" type="tel" autoComplete="tel" required placeholder="Include country code" /></label>
            <label>City / area <strong>*</strong><input name="location" required placeholder="Where do you serve customers?" /></label>
            <label className="therapist-full-field">Professional qualifications <strong>*</strong><input name="qualifications" required placeholder="For example: Certified aromatherapist, massage therapist" /></label>
            <label>Years of professional experience <strong>*</strong><input name="yearsExperience" type="number" min="0" max="80" required placeholder="0" /></label>
            <label>Customers currently served <strong>*</strong><input name="customersServed" type="number" min="0" max="100000" required placeholder="Approximate total" /></label>
            <label className="therapist-full-field">Aromatherapist certificate <strong>*</strong><input name="certificate" type="file" accept=".pdf,.doc,.docx,image/png,image/jpeg,image/webp" required /><small>PDF, Word, PNG, JPEG, or WebP; maximum 3 MB.</small></label>
            <label className="therapist-full-field">Short CV <strong>*</strong><textarea name="shortCv" required placeholder="Summarize your education, professional experience, specialist areas, and current practice." /></label>
            <label className="therapist-full-field">Your passion and partnership goals <strong>*</strong><textarea name="passion" required placeholder="Tell us why this work matters to you and how you hope to support the Happy Drops community." /></label>
          </div>
          <label className="therapist-consent"><input type="checkbox" required /><span>I confirm that this information is accurate and agree that Happy Drops may review my qualification documents and contact me about this application.</span></label>
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting…" : "Submit therapist application"}</button>
          {reference && <p className="therapist-success" role="status">Thank you. Your application has been received for review. <span>Reference: {reference}</span></p>}
          {error && <p className="form-error" role="alert">{error}</p>}
        </form>
      </section>

      {user?.role === "ADMIN" && (
        <section className="therapist-admin-review">
          <div className="therapist-section-heading">
            <p className="therapist-kicker">Admin only</p>
            <h2>Therapist partner applications</h2>
          </div>
          <div className="therapist-admin-filters">
            <input type="search" value={adminSearch} onChange={(event) => setAdminSearch(event.target.value)} placeholder="Search name, email, location, or qualification" />
            <select value={adminStatus} onChange={(event) => setAdminStatus(event.target.value)}>
              <option value="">All statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="WITHDRAWN">Withdrawn</option>
            </select>
          </div>
          {adminMessage && <p className="therapist-success">{adminMessage}</p>}
          <div className="therapist-admin-list">
            {adminApplications.length === 0 && <p>No therapist applications match these filters.</p>}
            {adminApplications.map((application) => {
              const isExpanded = expandedApplicationId === application.id;
              return (
                <article key={application.id}>
                  <button type="button" onClick={() => setExpandedApplicationId(isExpanded ? null : application.id)}>
                    <span><strong>{application.full_name}</strong><small>{application.email}</small></span>
                    <span>{application.location}</span><span>{application.status}</span><span>{isExpanded ? "Hide" : "Review"}</span>
                  </button>
                  {isExpanded && <TherapistAdminDetails application={application} onUpdate={updateApplication} />}
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

function TherapistAdminDetails({ application, onUpdate }) {
  const [status, setStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.admin_notes || "");
  return (
    <div className="therapist-admin-details">
      <dl>
        <div><dt>Phone</dt><dd>{application.phone}</dd></div>
        <div><dt>Qualifications</dt><dd>{application.qualifications}</dd></div>
        <div><dt>Experience</dt><dd>{application.years_experience} years</dd></div>
        <div><dt>Customers served</dt><dd>{application.customers_served}</dd></div>
        <div><dt>Short CV</dt><dd>{application.short_cv}</dd></div>
        <div><dt>Passion</dt><dd>{application.passion}</dd></div>
      </dl>
      <div className="therapist-admin-documents">
        {application.documents?.map((document) => <a key={document.id} href={document.file_url} target="_blank" rel="noreferrer">View {document.original_name}</a>)}
      </div>
      <label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="SUBMITTED">Submitted</option><option value="UNDER_REVIEW">Under review</option><option value="APPROVED">Approved</option><option value="REJECTED">Rejected</option><option value="WITHDRAWN">Withdrawn</option></select></label>
      <label>Admin notes<textarea value={notes} onChange={(event) => setNotes(event.target.value)} /></label>
      <button type="button" onClick={() => onUpdate(application, status, notes)}>Save review</button>
    </div>
  );
}
