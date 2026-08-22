import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi";
import { apiRequest } from "../lib/api";
import "./Checkout.css";

export default function PaymentResult({ cancelled = false }) {
  const location = useLocation();
  const [state, setState] = useState(cancelled ? "cancelled" : "checking");

  useEffect(() => {
    if (cancelled) return;
    const sessionId = new URLSearchParams(location.search).get("session_id");
    if (!sessionId) { setState("error"); return; }
    apiRequest(`/api/payments/checkout-session/${encodeURIComponent(sessionId)}`)
      .then(async ({ payment }) => {
        if (payment.status !== "paid") { setState("processing"); return; }
        if (sessionStorage.getItem("happyDropsClearCartAfterPayment") === "true") {
          await apiRequest("/api/cart", { method: "DELETE", auth: true }).catch(() => {});
          sessionStorage.removeItem("happyDropsClearCartAfterPayment");
        }
        setState("paid");
      })
      .catch(() => setState("error"));
  }, [cancelled, location.search]);

  const paid = state === "paid";
  return <main className="checkout-page checkout-confirmation-page">
    <section className="checkout-confirmation">
      <span>{paid ? <HiOutlineCheckCircle /> : <HiOutlineExclamationCircle />}</span>
      <p className="checkout-kicker">Secure Stripe payment</p>
      <h1>{paid ? "Payment confirmed." : state === "cancelled" ? "Payment cancelled." : state === "checking" ? "Checking your payment…" : "Payment is being confirmed."}</h1>
      <p>{paid ? "Thank you. Your payment was received and your order or workshop has been confirmed." : state === "cancelled" ? "No payment was taken. You may return and try again when you are ready." : "If you completed payment, confirmation may take a moment. Please check your profile or order status shortly."}</p>
      <Link to="/my-profile">View My Profile</Link>
      <Link to="/shop">Return to Shop</Link>
    </section>
  </main>;
}
