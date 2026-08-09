import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineBuildingOffice2, HiOutlineUser } from "react-icons/hi2";
import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import workshopHeader from "../assets/images/workshop-header.png";
import "./Signup.css";
import "./WorkshopSignup.css";

export default function WorkshopSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const workshopTitle = location.state?.workshopTitle || "Tailor-Made Workshop";
  const [accountType, setAccountType] = useState("INDIVIDUAL");
  const [form, setForm] = useState({ firstName: "", familyName: "", email: "", phone: "", address: "", dateOfBirth: "", password: "", companyName: "", businessId: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const age = form.dateOfBirth ? (() => { const birth = new Date(`${form.dateOfBirth}T00:00:00`); const today = new Date(); let years = today.getFullYear() - birth.getFullYear(); if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) years -= 1; return years; })() : null;
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const session = await apiRequest("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ ...form, accountType, preferredLanguage: "English" }),
      });
      login(session, true);
      navigate("/workshops", { replace: true, state: { openWorkshopRequestTitle: workshopTitle } });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="workshop-signup-page">
      <section className="workshop-signup-hero">
        <img src={workshopHeader} alt="Happy Drops workshop experience" />
        <div><span>Workshop Registration</span><h1>Create Your Booking Account</h1><p>Register once, then continue directly to request <strong>{workshopTitle}</strong>.</p></div>
      </section>
      <section className="workshop-signup-layout">
        <form className="profile-form workshop-signup-form" onSubmit={submit}>
          <h2>Who is requesting the workshop?</h2>
          <div className="workshop-account-types">
            <button className={accountType === "INDIVIDUAL" ? "active" : ""} type="button" onClick={() => setAccountType("INDIVIDUAL")}><HiOutlineUser /><strong>Individual</strong><span>For yourself, family, or a private group</span></button>
            <button className={accountType === "COMPANY" ? "active" : ""} type="button" onClick={() => setAccountType("COMPANY")}><HiOutlineBuildingOffice2 /><strong>Company / Organization</strong><span>For a workplace, team, or organization</span></button>
          </div>
          {accountType === "COMPANY" && <div className="form-grid workshop-company-fields">
            <label className="full-width">Company or Organization Name <strong>*</strong><input name="companyName" value={form.companyName} onChange={update} required placeholder="Enter the registered or organization name" /></label>
            <label>Business ID (Optional)<input name="businessId" value={form.businessId} onChange={update} placeholder="Enter Business ID" /></label>
            <label>Company Address (Optional)<input name="address" value={form.address} onChange={update} placeholder="Enter company address" /></label>
          </div>}
          <h2>{accountType === "COMPANY" ? "Contact Person" : "Your Details"}</h2>
          <div className="form-grid">
            <label>First Name <strong>*</strong><input name="firstName" value={form.firstName} onChange={update} required /></label>
            <label>Family Name <strong>*</strong><input name="familyName" value={form.familyName} onChange={update} required /></label>
            <label>{accountType === "COMPANY" ? "Work Email" : "Email Address"} <strong>*</strong><input name="email" type="email" value={form.email} onChange={update} required /></label>
            <label>Phone Number <strong>*</strong><input name="phone" type="tel" value={form.phone} onChange={update} required /></label>
            {accountType === "INDIVIDUAL" && <label>Date of Birth <strong>*</strong><input name="dateOfBirth" type="date" max={new Date().toISOString().slice(0, 10)} value={form.dateOfBirth} onChange={update} required />{age !== null && <small>Your current age: {age}</small>}</label>}
            {accountType === "INDIVIDUAL" && <label className="full-width">Address (Optional)<input name="address" value={form.address} onChange={update} /></label>}
            <label className="full-width">Create Password <strong>*</strong><input name="password" type="password" minLength="8" value={form.password} onChange={update} required placeholder="At least 8 characters" /></label>
          </div>
          <p className="workshop-signup-privacy">By registering, you agree that your details may be used to manage your workshop request according to our <Link to="/privacy-policy" target="_blank">Privacy Policy</Link>.</p>
          {error && <p className="profile-error" role="alert">{error}</p>}
          <button className="profile-submit" type="submit" disabled={submitting}>{submitting ? "Creating account…" : "Register & Continue to Workshop"}</button>
          <p className="profile-login-link">Already registered? <Link to="/login" state={{ from: "/workshops", workshopTitle, message: "Log in to continue your workshop request." }}>Log in and continue</Link></p>
        </form>
        <aside className="workshop-signup-benefits"><h2>What happens next?</h2><ol><li><strong>Your account is created</strong><span>Your contact details are saved securely.</span></li><li><strong>You return to the workshop</strong><span>The request application opens automatically.</span></li><li><strong>Your details are prefilled</strong><span>You only complete the workshop preferences.</span></li><li><strong>Track your request</strong><span>Your submitted booking stays available in your profile.</span></li></ol></aside>
      </section>
    </main>
  );
}
