import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi";
import loginWellnessScene from "../assets/images/login-wellness-scene-happy-drops.png";
import { apiRequest } from "../lib/api";
import "./Login.css";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!token) return setError("This reset link is invalid.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    setIsSubmitting(true);
    try {
      await apiRequest("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      navigate("/login", {
        replace: true,
        state: { message: "Password reset successfully. Log in with your new password." },
      });
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
          <h1>Create a new password</h1>
          <p className="login-intro">Choose a password containing at least eight characters.</p>
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="new-password">New password</label>
            <div className="login-input">
              <HiOutlineLockClosed aria-hidden="true" />
              <input id="new-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" />
            </div>
            <label htmlFor="confirm-password">Confirm new password</label>
            <div className="login-input">
              <HiOutlineLockClosed aria-hidden="true" />
              <input id="confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" />
            </div>
            {error && <p className="login-error">{error}</p>}
            <button className="login-submit" type="submit" disabled={isSubmitting || !token}>
              {isSubmitting ? "Updating password..." : "Update password"}
            </button>
          </form>
          <p className="login-signup"><Link to="/login">Return to login</Link></p>
        </div>
      </section>
    </main>
  );
}

export default ResetPassword;
