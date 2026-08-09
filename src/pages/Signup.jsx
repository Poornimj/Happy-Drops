import { useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineTrendingUp,
  HiOutlineUserGroup,
} from "react-icons/hi";

import profileHeroBanner from "../assets/images/wellness-profile-hero-banner.png";
import profileSideProduct from "../assets/images/wellness-profile-side-product.png";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";

import "./Signup.css";

const benefits = [
  {
    icon: <HiOutlineSparkles />,
    title: "Personalized wellness recommendations",
    text: "Get tailored suggestions created around your needs.",
  },
  {
    icon: <HiOutlineClipboardList />,
    title: "Save your wellness history",
    text: "Keep track of your journey and past recommendations.",
  },
  {
    icon: <HiOutlineTrendingUp />,
    title: "Track your progress",
    text: "Monitor improvements and achieve your wellness goals.",
  },
  {
    icon: <HiOutlineUserGroup />,
    title: "Manage family profiles",
    text: "Create and manage profiles for your loved ones.",
  },
  {
    icon: <HiOutlineCalendar />,
    title: "Book workshops faster",
    text: "Quick access to workshops that match your interests.",
  },
];

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    familyName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    preferredLanguage: "English",
    currentSymptoms: "",
    symptomsDuration: "",
    symptomsFrequency: "",
    takesMedication: "false",
    medicationDetails: "",
    ongoingConditions: "",
    familyMedicalHistory: "",
    treatmentsTried: "",
    chronicDiseases: "",
    wellnessGoals: "",
    consentGiven: true,
  });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdWithoutAssessment, setCreatedWithoutAssessment] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);

  const addFamilyMember = () => setFamilyMembers((current) => [...current, {
    id: crypto.randomUUID(), firstName: "", familyName: form.familyName, relationship: "", dateOfBirth: "", wellnessNotes: "", guardianConfirmed: false,
  }]);

  const updateFamilyMember = (id, field, value) => setFamilyMembers((current) => current.map((member) => member.id === id ? { ...member, [field]: value } : member));
  const removeFamilyMember = (id) => setFamilyMembers((current) => current.filter((member) => member.id !== id));

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const birthDate = new Date(`${dateOfBirth}T00:00:00`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age -= 1;
    return age;
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event, destination = "/wellness-assessment") => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const session = await apiRequest("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName: form.firstName,
          familyName: form.familyName,
          email: form.email,
          password: form.password,
          phone: form.phone,
          address: form.address,
          dateOfBirth: form.dateOfBirth,
          preferredLanguage: form.preferredLanguage,
          familyMembers: familyMembers.map((member) => ({
            firstName: member.firstName,
            familyName: member.familyName,
            relationship: member.relationship,
            dateOfBirth: member.dateOfBirth,
            wellnessNotes: member.wellnessNotes,
            guardianConfirmed: member.guardianConfirmed,
          })),
        }),
      });

      login(session, true);
      await apiRequest("/api/account/wellness-profile", {
        method: "PUT",
        auth: true,
        body: JSON.stringify({
          ...form,
          takesMedication: form.takesMedication === "true",
        }),
      });
      if (destination === "/") {
        setCreatedWithoutAssessment(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(destination);
      }
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (createdWithoutAssessment) {
    return (
      <main className="profile-page">
        <section className="profile-hero profile-hero-with-image">
          <img src={profileHeroBanner} alt="Happy Drops lavender wellness profile banner" />
          <div className="profile-hero-copy">
            <h1>Profile Created Successfully</h1>
            <p>
              Welcome to Happy Drops, {form.firstName}. Your account has been saved
              and you are now logged in.
            </p>
          </div>
        </section>
        <section className="profile-layout">
          <div className="profile-form">
            <div className="form-section-title">
              <span><HiOutlineHeart /></span>
              <h2>Your wellness profile is ready</h2>
            </div>
            <p>
              You can continue to the website now or complete your wellness
              assessment whenever you are ready.
            </p>
            <div className="profile-actions">
              <Link className="profile-submit" to="/">Continue to Happy Drops</Link>
              <Link
                className="profile-submit profile-submit-secondary"
                to="/wellness-assessment"
              >
                Start Wellness Assessment
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="profile-page">
        <section className="profile-hero profile-hero-with-image">
          <img src={profileHeroBanner} alt="Happy Drops lavender wellness profile banner" />
          <div className="profile-hero-copy">
            <h1>Create Your Wellness Profile</h1>
            <p>
              Combining Eastern wisdom and Western knowledge with a holistic point
              of view and preventive solutions to support you and your family's
              wellbeing.
            </p>
          </div>
        </section>

        <div className="profile-steps">
          <div className="profile-step active">
            <span>1</span>
            <p>Personal Information</p>
          </div>
          <div className="profile-step-line"></div>
          <div className="profile-step">
            <span>2</span>
            <p>Wellness Assessment</p>
          </div>
        </div>

        <section className="profile-layout">
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-section-title">
              <span><HiOutlineUserGroup /></span>
              <h2>1. Personal Information</h2>
            </div>

            <div className="form-grid">
              <label>
                First Name <strong>*</strong>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your first name"
                />
              </label>
              <label>
                Family Name <strong>*</strong>
                <input
                  name="familyName"
                  value={form.familyName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your family name"
                />
              </label>
              <label>
                Email Address <strong>*</strong>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  type="email"
                />
              </label>
              <label>
                Password <strong>*</strong>
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                  placeholder="Create a password"
                  type="password"
                />
              </label>
              <label>
                Phone Number
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+358  Enter your phone number"
                />
              </label>
              <label>
                Address
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </label>
              <label>
                Date of Birth <strong>*</strong>
                <input
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().slice(0, 10)}
                  required
                  type="date"
                />
                {form.dateOfBirth && <small>Your current age: {calculateAge(form.dateOfBirth)}</small>}
              </label>
            </div>

            <section className="profile-family-section">
              <div className="profile-family-heading">
                <div><h2>Family Members</h2><p>Optional: add family members whose wellness journeys you would like to manage from your account.</p></div>
                <button type="button" className="profile-family-add" onClick={addFamilyMember}>+ Add Family Member</button>
              </div>
              {familyMembers.map((member, index) => {
                const memberAge = calculateAge(member.dateOfBirth);
                return <fieldset className="profile-family-member" key={member.id}>
                  <legend>Family Member {index + 1}</legend>
                  <button type="button" className="profile-family-remove" onClick={() => removeFamilyMember(member.id)}>Remove</button>
                  <div className="form-grid">
                    <label>First Name <strong>*</strong><input value={member.firstName} onChange={(event) => updateFamilyMember(member.id, "firstName", event.target.value)} required /></label>
                    <label>Family Name <strong>*</strong><input value={member.familyName} onChange={(event) => updateFamilyMember(member.id, "familyName", event.target.value)} required /></label>
                    <label>Relationship <strong>*</strong><select value={member.relationship} onChange={(event) => updateFamilyMember(member.id, "relationship", event.target.value)} required><option value="" disabled>Select relationship</option><option>Child</option><option>Spouse / Partner</option><option>Parent</option><option>Sibling</option><option>Other dependent</option></select></label>
                    <label>Date of Birth <strong>*</strong><input type="date" max={new Date().toISOString().slice(0, 10)} value={member.dateOfBirth} onChange={(event) => updateFamilyMember(member.id, "dateOfBirth", event.target.value)} required />{memberAge !== null && <small>Current age: {memberAge}</small>}</label>
                    <label className="full-width">Wellness Notes <strong>*</strong><textarea required value={member.wellnessNotes} onChange={(event) => updateFamilyMember(member.id, "wellnessNotes", event.target.value)} placeholder="Current symptoms, allergies, wellness goals, or other helpful notes" /></label>
                  </div>
                  {memberAge !== null && memberAge < 18 && <label className="profile-guardian-confirm"><input type="checkbox" checked={member.guardianConfirmed} onChange={(event) => updateFamilyMember(member.id, "guardianConfirmed", event.target.checked)} required /> I confirm that I am the parent or legal guardian and may manage this minor's information.</label>}
                </fieldset>;
              })}
            </section>

            <div className="form-section-title">
              <span><HiOutlineHeart /></span>
              <h2>2. Wellness Information</h2>
            </div>

            <div className="form-grid">
              <label>
                Current Symptoms <strong>*</strong>
                <input name="currentSymptoms" value={form.currentSymptoms} onChange={handleChange} required placeholder="Describe your current symptoms" />
              </label>
              <label>
                How long have you had these symptoms? <strong>*</strong>
                <input name="symptomsDuration" value={form.symptomsDuration} onChange={handleChange} required placeholder="For example, 2 weeks or 3 months" />
              </label>
              <label>
                How often do they occur? <strong>*</strong>
                <input name="symptomsFrequency" value={form.symptomsFrequency} onChange={handleChange} required placeholder="For example, daily or a few times per week" />
              </label>
              <fieldset>
                <legend>Are you taking any medication?</legend>
                <label className="radio-option"><input type="radio" name="takesMedication" value="true" checked={form.takesMedication === "true"} onChange={handleChange} /> Yes</label>
                <label className="radio-option"><input type="radio" name="takesMedication" value="false" checked={form.takesMedication === "false"} onChange={handleChange} /> No</label>
              </fieldset>
              <label className="full-width">If yes, please specify the medication and reason<input name="medicationDetails" value={form.medicationDetails} onChange={handleChange} placeholder="Medication name and reason" /></label>
              <label>Do you have any ongoing illness or medical condition?<textarea name="ongoingConditions" value={form.ongoingConditions} onChange={handleChange} placeholder="Please describe"></textarea></label>
              <label>Do you have any relevant family medical history?<textarea name="familyMedicalHistory" value={form.familyMedicalHistory} onChange={handleChange} placeholder="Please describe"></textarea></label>
              <label>What treatments have you already tried?<textarea name="treatmentsTried" value={form.treatmentsTried} onChange={handleChange} placeholder="Medication, physiotherapy, nutrition plan, essential oils, other"></textarea></label>
              <label>Do you have any chronic diseases?<textarea name="chronicDiseases" value={form.chronicDiseases} onChange={handleChange} placeholder="Please describe"></textarea></label>
              <label className="full-width">What are your current wellness goals?<input name="wellnessGoals" value={form.wellnessGoals} onChange={handleChange} placeholder="Tell us what you would like to improve in your health and wellbeing" /></label>
            </div>

            <div className="language-options">
              <p>Preferred Language</p>
              <label>
                <input
                  type="radio"
                  name="preferredLanguage"
                  value="English"
                  checked={form.preferredLanguage === "English"}
                  onChange={handleChange}
                /> English
              </label>
              <label>
                <input
                  type="radio"
                  name="preferredLanguage"
                  value="Finnish"
                  checked={form.preferredLanguage === "Finnish"}
                  onChange={handleChange}
                /> Finnish
              </label>
              <label>
                <input
                  type="radio"
                  name="preferredLanguage"
                  value="Chinese"
                  checked={form.preferredLanguage === "Chinese"}
                  onChange={handleChange}
                /> Chinese
              </label>
            </div>

            <label className="privacy-check">
              <input name="consentGiven" type="checkbox" checked={form.consentGiven} onChange={handleChange} required />
              I agree to the <Link to="/privacy-policy" target="_blank">Privacy Policy</Link> and <Link to="/terms-conditions" target="_blank">Terms of Service</Link>
            </label>

            {submitError && <p className="profile-error">{submitError}</p>}

            <div className="profile-actions">
              <button className="profile-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Continue to Wellness Assessment"}
              </button>
              <button
                className="profile-submit profile-submit-secondary"
                type="button"
                disabled={isSubmitting}
                onClick={(event) => handleSubmit(event, "/")}
              >
                Create Profile Without Assessment
              </button>
            </div>
            <p className="profile-login-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>

          <aside className="profile-benefits">
            <div className="benefits-heading">
              <span><HiOutlineHeart /></span>
              <h2>Why Create a Profile?</h2>
            </div>

            {benefits.map((benefit) => (
              <article key={benefit.title}>
                <span>{benefit.icon}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </article>
            ))}

            <div className="benefits-product benefits-product-image">
              <img src={profileSideProduct} alt="Happy Drops bottle with lavender candle and vase" />
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}

export default Signup;
