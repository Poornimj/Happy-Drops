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
    age: "",
    preferredLanguage: "English",
  });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdWithoutAssessment, setCreatedWithoutAssessment] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event, destination = "/wellness-assessment") => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const session = await apiRequest("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(form),
      });

      login(session, true);
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
                Age
                <input
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  type="number"
                />
              </label>
            </div>

            <div className="form-section-title">
              <span><HiOutlineHeart /></span>
              <h2>2. Wellness Information</h2>
            </div>

            <div className="form-grid">
              <label>
                Current Symptoms <strong>*</strong>
                <input required placeholder="Describe your current symptoms" />
              </label>
              <label>
                How long have you had these symptoms? <strong>*</strong>
                <input required placeholder="For example, 2 weeks or 3 months" />
              </label>
              <label>
                How often do they occur? <strong>*</strong>
                <input required placeholder="For example, daily or a few times per week" />
              </label>
              <fieldset>
                <legend>Are you taking any medication?</legend>
                <label className="radio-option"><input type="radio" name="medication" /> Yes</label>
                <label className="radio-option"><input type="radio" name="medication" defaultChecked /> No</label>
              </fieldset>
              <label className="full-width">If yes, please specify the medication and reason<input placeholder="Medication name and reason" /></label>
              <label>Do you have any ongoing illness or medical condition?<textarea placeholder="Please describe"></textarea></label>
              <label>Do you have any relevant family medical history?<textarea placeholder="Please describe"></textarea></label>
              <label>What treatments have you already tried?<textarea placeholder="Medication, physiotherapy, nutrition plan, essential oils, other"></textarea></label>
              <label>Do you have any chronic diseases?<textarea placeholder="Please describe"></textarea></label>
              <label className="full-width">What are your current wellness goals?<input placeholder="Tell us what you would like to improve in your health and wellbeing" /></label>
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
              <input type="checkbox" defaultChecked required />
              I agree to the <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>
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
