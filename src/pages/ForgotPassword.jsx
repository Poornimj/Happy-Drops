import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import loginWellnessScene from "../assets/images/login-wellness-scene-happy-drops.png";
import { apiRequest } from "../lib/api";
import "./Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [developmentResetUrl, setDevelopmentResetUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setDevelopmentResetUrl("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await apiRequest("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setMessage(result.message);
      setDevelopmentResetUrl(result.developmentResetUrl || "");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-visual" aria-label="Happy Drops wellness">
        <img src={loginWellnessScene} alt="Happy Drops wellness products" />
        <div className="login-visual-overlay"></div>
      </section>
      <section className="login-panel">
        <div className="login-form-wrap">
          <p className="login-kicker">Account recovery</p>
          <h1>Forgot your password?</h1>
          <p className="login-intro">Enter your account email to prepare a secure reset link.</p>
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="reset-email">Email address</label>
            <div className={`login-input ${error ? "has-error" : ""}`}>
              <HiOutlineMail aria-hidden="true" />
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="Enter your email"
              />
            </div>
            {error && <p className="login-error">{error}</p>}
            {message && <p className="login-success">{message}</p>}
            {developmentResetUrl && (
              <p className="login-success">
                Local testing: <a href={developmentResetUrl}>open your reset link</a>.
              </p>
            )}
            <button className="login-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Preparing link..." : "Reset password"}
            </button>
          </form>
          <p className="login-signup"><Link to="/login">Return to login</Link></p>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;
