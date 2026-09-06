import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineCreditCard,
  HiOutlineLockClosed,
  HiOutlineShoppingBag,
  HiOutlineUserGroup,
} from "react-icons/hi";

import confirmedBottle from "../assets/images/confirmed-bottle.png";
import checkoutWellnessScene from "../assets/images/checkout-secure-anti-wrinkle.png";
import { apiRequest, findApiProduct } from "../lib/api";
import { calculateCheckoutShipping } from "../lib/checkoutTotals";
import applePayLogo from "../assets/payment/apple-pay.svg";
import googlePayLogo from "../assets/payment/google-pay.svg";
import mastercardLogo from "../assets/payment/mastercard.svg";
import visaLogo from "../assets/payment/visa.svg";

import "./Checkout.css";

const fallbackProduct = {
  type: "product",
  title: "Timeless",
  description: "Personalized essential oil blend · 15 mL",
  quantity: 1,
  unitPrice: 19.9,
  shipping: 5.9,
  tax: 0,
  image: confirmedBottle,
};

const fallbackWorkshop = {
  type: "workshop",
  title: "Corporate Wellness",
  description: "A practical, nature-powered wellness experience.",
  participants: 25,
  unitPrice: 48,
  date: "25 August 2026",
  time: "14:00",
  location: "Academy Venue",
  tax: 0,
};

const paymentMethods = [
  {
    id: "card",
    title: "Secure Stripe Checkout",
    text: "Stripe will show the card and supported wallet options available on your device",
    icon: <HiOutlineCreditCard />,
    logos: [
      { src: visaLogo, alt: "Visa" },
      { src: mastercardLogo, alt: "Mastercard" },
    ],
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-FI", {
    style: "currency",
    currency: "EUR",
  }).format(value);

function Checkout() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const requestedType = location.state?.checkout?.type || query.get("type");
  const fallback = requestedType === "workshop" ? fallbackWorkshop : fallbackProduct;
  const checkout = { ...fallback, ...(location.state?.checkout || {}) };
  const isWorkshop = checkout.type === "workshop";
  const isApprovedWorkshopRequest = isWorkshop && Boolean(checkout.requestId);
  const isCart = checkout.type === "cart" && Array.isArray(checkout.items);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryMethod, setDeliveryMethod] = useState("DELIVERY");
  const [quantity, setQuantity] = useState(
    isWorkshop ? checkout.participants || 1 : checkout.quantity || 1,
  );
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [submitError, setSubmitError] = useState("");

  const totals = useMemo(() => {
    const subtotal = isCart
      ? checkout.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      : checkout.unitPrice * quantity;
    const shipping = calculateCheckoutShipping(subtotal, { isWorkshop, deliveryMethod });
    const tax = checkout.tax || 0;
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  }, [checkout.items, checkout.tax, checkout.unitPrice, deliveryMethod, isCart, isWorkshop, quantity]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    const form = new FormData(event.currentTarget);
    const address = {
      fullName: form.get("fullName"),
      street: form.get("street"),
      city: form.get("city"),
      postalCode: form.get("postalCode"),
      country: form.get("country"),
    };
    try {
      if (isWorkshop) {
        let paymentKind;
        let paymentReference;
        if (isApprovedWorkshopRequest) {
          paymentKind = "workshop_request";
          paymentReference = checkout.requestId;
        } else if (checkout.sessionId) {
          const result = await apiRequest("/api/workshops/bookings", {
            method: "POST",
            auth: true,
            body: JSON.stringify({
              sessionId: checkout.sessionId,
              fullName: address.fullName,
              email: form.get("email"),
              phone: form.get("phone"),
              participantCount: quantity,
              selectedTheme: checkout.theme || checkout.title,
              specialRequests: checkout.notes || "",
            }),
          });
          paymentKind = "workshop_booking";
          paymentReference = result.booking.id;
        } else {
          const result = await apiRequest("/api/workshops/requests", {
            method: "POST",
            auth: true,
            body: JSON.stringify({
              workshopId: checkout.workshopId || null,
              sessionId: checkout.sessionId || null,
              fullName: address.fullName,
              email: form.get("email"),
              phone: form.get("phone"),
              preferredDate: checkout.isoDate || null,
              preferredTime: checkout.time,
              location: checkout.location,
              participantCount: quantity,
              purpose: checkout.title,
            }),
          });
          setReference(result.request.id);
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const payment = await apiRequest("/api/payments/checkout-session", {
          method: "POST",
          auth: true,
          body: JSON.stringify({ kind: paymentKind, referenceId: paymentReference, email: form.get("email") }),
        });
        window.location.assign(payment.url);
      } else {
        let orderItems;
        if (isCart) {
          orderItems = checkout.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          }));
        } else {
          const product = await findApiProduct(checkout.title);
          if (!product) throw new Error("This product is not available.");
          orderItems = [{ productId: product.id, quantity }];
        }
        const result = await apiRequest("/api/orders", {
          method: "POST",
          auth: true,
          headers: { "Idempotency-Key": crypto.randomUUID() },
          body: JSON.stringify({
            email: form.get("email"),
            phone: form.get("phone"),
            billingAddress: address,
            shippingAddress: deliveryMethod === "PICKUP" ? null : address,
            deliveryMethod,
            paymentMethod,
            items: orderItems,
          }),
        });
        const payment = await apiRequest("/api/payments/checkout-session", {
          method: "POST",
          auth: true,
          body: JSON.stringify({ kind: "order", referenceId: result.order.id, email: form.get("email") }),
        });
        if (isCart) sessionStorage.setItem("happyDropsClearCartAfterPayment", "true");
        window.location.assign(payment.url);
      }
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  if (submitted) {
    return (
      <main className="checkout-page checkout-confirmation-page">
        <section className="checkout-confirmation">
          <span><HiOutlineCheckCircle /></span>
          <p className="checkout-kicker">Request received</p>
          <h1>Your workshop request has been submitted.</h1>
          <p>
            We have received your tailor-made workshop request. Our team will review the details before payment becomes available.
          </p>
          <div className="checkout-confirmation-summary">
            <strong>{checkout.title}</strong>
            {reference && <span>Reference: {reference}</span>}
            <span>
              {isWorkshop
                ? `${quantity} participant${quantity > 1 ? "s" : ""}`
                : isCart
                  ? `${checkout.items.length} product${checkout.items.length === 1 ? "" : "s"}`
                  : `Quantity ${quantity}`}
            </span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
          <Link to={isWorkshop ? "/workshops" : "/"}>Return to Happy Drops</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-banner">
        <div className="checkout-banner-icon"><HiOutlineLockClosed /></div>
        <div>
          <h1>Secure Checkout</h1>
          <p>
            Complete your {isWorkshop ? "booking" : "purchase"} securely using
            your preferred payment method.
          </p>
        </div>
        <img
          src={checkoutWellnessScene}
          alt="Happy Drops Anti Wrinkle bottle with lavender, purple candle, and cream vase"
        />
      </section>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <section className="checkout-card checkout-order-card">
          <div className="checkout-card-heading">
            {isWorkshop ? <HiOutlineCalendar /> : <HiOutlineShoppingBag />}
            <h2>Order Summary</h2>
          </div>

          {isWorkshop ? (
            <div className="checkout-reference-summary">
              <div><span>Workshop:</span><strong>{checkout.title}</strong></div>
              <div>
                <span>Participants:</span>
                <select
                  value={quantity}
                  disabled={isApprovedWorkshopRequest}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                  aria-label="Number of workshop participants"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 25].map((value) => (
                    <option value={value} key={value}>{value}</option>
                  ))}
                </select>
              </div>
              <div><span>Date:</span><strong>{checkout.date}</strong></div>
              <div><span>Time:</span><strong>{checkout.time}</strong></div>
              <div><span>Location:</span><strong>{checkout.location}</strong></div>
            </div>
          ) : isCart ? (
            <div className="checkout-reference-summary">
              {checkout.items.map((item) => (
                <div key={item.productId}>
                  <span>{item.quantity} × {item.name}</span>
                  <strong>{formatCurrency(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="checkout-item">
                <img src={checkout.image || confirmedBottle} alt={checkout.title} />
                <div>
                  <h3>{checkout.title}</h3>
                  <p>{checkout.description}</p>
                </div>
                <strong>{formatCurrency(checkout.unitPrice)}</strong>
              </div>
              <label className="checkout-quantity">
                Quantity
                <select
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option value={value} key={value}>{value}</option>
                  ))}
                </select>
              </label>
            </>
          )}

          {!isWorkshop && (
            <fieldset className="checkout-delivery-method">
              <legend>How would you like to receive your order?</legend>
              <label className={deliveryMethod === "DELIVERY" ? "active" : ""}>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="DELIVERY"
                  checked={deliveryMethod === "DELIVERY"}
                  onChange={() => setDeliveryMethod("DELIVERY")}
                />
                <span><strong>Delivery</strong><small>{totals.subtotal >= 50 ? "Free delivery" : "€5.90 delivery charge"}</small></span>
              </label>
              <label className={deliveryMethod === "PICKUP" ? "active" : ""}>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="PICKUP"
                  checked={deliveryMethod === "PICKUP"}
                  onChange={() => setDeliveryMethod("PICKUP")}
                />
                <span><strong>Pickup</strong><small>No delivery charge</small></span>
              </label>
            </fieldset>
          )}

          <div className="checkout-totals">
            <div><span>Subtotal:</span><strong>{formatCurrency(totals.subtotal)}</strong></div>
            {!isWorkshop && (
              <div><span>{deliveryMethod === "PICKUP" ? "Pickup:" : "Delivery:"}</span><strong>{formatCurrency(totals.shipping)}</strong></div>
            )}
            <div><span>Tax (0%):</span><strong>{formatCurrency(totals.tax)}</strong></div>
            <div className="checkout-total">
              <span>Total Amount:</span>
              <strong>{formatCurrency(totals.total)}</strong>
            </div>
          </div>

          <p className="checkout-policy">
            {isWorkshop
              ? "This is a non-refundable booking. Please review your details before your payment."
              : "Please review your product, quantity, billing, and delivery details before payment."}
          </p>
        </section>

        <section className="checkout-card checkout-payment-card">
          <div className="checkout-card-heading">
            <HiOutlineCreditCard />
            <h2>Choose Payment Method</h2>
          </div>

          <div className="checkout-payment-options">
            {paymentMethods.map((method) => (
              <label
                className={`checkout-payment-option ${paymentMethod === method.id ? "active" : ""}`}
                key={method.id}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                />
                <span className="checkout-payment-icon">{method.icon}</span>
                <span>
                  <strong>{method.title}</strong>
                  <small>{method.text}</small>
                </span>
                {method.logos && (
                  <span className="checkout-option-logos">
                    {method.logos.map((logo) => (
                      <img src={logo.src} alt={logo.alt} key={logo.alt} />
                    ))}
                  </span>
                )}
              </label>
            ))}
          </div>

          <div className="checkout-payment-secure">
            <HiOutlineLockClosed />
            <span>
              <strong>Secure SSL Encrypted Payment</strong>
              <small>Your payment information is encrypted and secure.</small>
            </span>
          </div>
        </section>

        <section className="checkout-card checkout-billing-card">
          <div className="checkout-card-heading">
            <HiOutlineUserGroup />
            <h2>Billing Details</h2>
          </div>

          <div className="checkout-fields">
            <label>
              Full Name
              <input name="fullName" required autoComplete="name" placeholder="John Snow" />
            </label>
            <label>
              Email Address
              <input name="email" required type="email" autoComplete="email" placeholder="john.snow@email.com" />
            </label>
            <label>
              Phone Number
              <input name="phone" required type="tel" autoComplete="tel" placeholder="+358 40 123 4567" />
            </label>
            <label>
              Street Address
              <input name="street" required autoComplete="street-address" placeholder="123 Hill Street" />
            </label>
            <label>
              City
              <input name="city" required autoComplete="address-level2" placeholder="Helsinki" />
            </label>
            <label>
              Postal Code
              <input name="postalCode" required autoComplete="postal-code" placeholder="00100" />
            </label>
            <label>
              Country
              <select name="country" required defaultValue="Finland">
                <option>Finland</option>
                <option>Sweden</option>
                <option>Norway</option>
                <option>Denmark</option>
                <option>Estonia</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <label className="checkout-consent">
            <input type="checkbox" required />
            <span>
              I agree to the terms, privacy policy, and applicable
              {isWorkshop ? " booking" : " delivery"} conditions.
            </span>
          </label>

          <button className="checkout-pay-button" type="submit">
            <HiOutlineLockClosed />
            Pay Securely with Stripe
          </button>
          {submitError && <p className="form-error" role="alert">{submitError}</p>}

          <div className="checkout-security">
            <HiOutlineLockClosed />
            <div>
              <strong>Your payment is secure and protected.</strong>
              <p>We use encrypted payment processing to ensure your personal and financial information remains safe.</p>
            </div>
          </div>
        </section>
      </form>

      <section className="checkout-accepted">
        <p>Accepted Payment Methods</p>
        <div className="checkout-payment-brands" aria-label="Accepted payment methods">
          <img src={visaLogo} alt="Visa" className="checkout-brand-visa" />
          <img src={mastercardLogo} alt="Mastercard" className="checkout-brand-mastercard" />
          <img src={applePayLogo} alt="Apple Pay" className="checkout-brand-apple" />
          <img src={googlePayLogo} alt="Google Pay" className="checkout-brand-google" />
        </div>
        <small>© 2026 Happy Drops · Secure checkout</small>
      </section>
    </main>
  );
}

export default Checkout;
