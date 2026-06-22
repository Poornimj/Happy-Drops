import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
  HiOutlineMail,
} from "react-icons/hi";

import loginWellnessScene from "../assets/images/login-wellness-scene-happy-drops.png";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});

  const destination = location.state?.from || "/";

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!form.email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Enter your password.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      navigate(destination, { replace: true });
    }
  };

  return (
    <main className="login-page">
      <section className="login-visual" aria-label="Happy Drops wellness">
        <img src={loginWellnessScene} alt="Happy Drops Anti Wrinkle bottle with lavender, eucalyptus, diffuser, and candle" />
        <div className="login-visual-overlay"></div>
      </section>

      <section className="login-panel">
        <div className="login-form-wrap">
          <p className="login-kicker">Welcome</p>
          <h1>Log in to Happy Drops</h1>
          <p className="login-intro">
            Access your profile, bookings, orders, and wellness recommendations.
          </p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="login-email">Email address</label>
            <div className={`login-input ${errors.email ? "has-error" : ""}`}>
              <HiOutlineMail aria-hidden="true" />
              <input
                id="login-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                aria-describedby={errors.email ? "login-email-error" : undefined}
              />
            </div>
            {errors.email && (
              <p className="login-error" id="login-email-error">{errors.email}</p>
            )}

            <div className="login-label-row">
              <label htmlFor="login-password">Password</label>
              <button type="button" className="login-text-button">
                Forgot password?
              </button>
            </div>
            <div className={`login-input ${errors.password ? "has-error" : ""}`}>
              <HiOutlineLockClosed aria-hidden="true" />
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-describedby={errors.password ? "login-password-error" : undefined}
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </button>
            </div>
            {errors.password && (
              <p className="login-error" id="login-password-error">{errors.password}</p>
            )}

            <label className="login-remember">
              <input
                name="remember"
                type="checkbox"
                checked={form.remember}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>

            <button className="login-submit" type="submit">Log in</button>
          </form>

          <p className="login-signup">
            New to Happy Drops? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
