import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../lib/api";
import personalizedBlendImage from "../assets/images/knowledg-ready.png";
import "./CustomerCare.css";
import "./AccountPages.css";

const formatDate = (value) => value
  ? new Intl.DateTimeFormat("en-FI", { dateStyle: "medium" }).format(new Date(value))
  : "Not available";

const formatMoney = (value, currency = "EUR") => new Intl.NumberFormat("en-FI", {
  style: "currency",
  currency,
}).format(Number(value || 0));

const wellnessSteps = [
  { key: "SUBMITTED", label: "Profile Submitted", text: "Your wellness profile has been received." },
  { key: "UNDER_REVIEW", label: "Aromatherapist Review", text: "Your symptoms and goals are being reviewed." },
  { key: "RECIPE_READY", label: "Personalized Recipe", text: "Your personalized recommendation and pricing will appear here." },
  { key: "PAYMENT_PENDING", label: "Payment", text: "Complete payment when your recommendation is ready." },
  { key: "IN_PREPARATION", label: "Oil Creation", text: "Your custom essential-oil blend is being prepared." },
  { key: "READY_FOR_PICKUP", label: "Ready for Pickup", text: "Your blend is ready; pickup details will appear here." },
];

const wellnessRanks = {
  SUBMITTED: 1,
  UNDER_REVIEW: 2,
  RECIPE_READY: 3,
  PAYMENT_PENDING: 4,
  PAID: 4,
  IN_PREPARATION: 5,
  READY_FOR_PICKUP: 6,
  COMPLETED: 6,
  CANCELLED: 0,
};

const historyForStep = (reviewCase, step) => {
  const matchingStatuses = step.key === "PAYMENT_PENDING"
    ? ["PAYMENT_PENDING", "PAID"]
    : step.key === "IN_PREPARATION"
      ? ["IN_PREPARATION"]
      : step.key === "READY_FOR_PICKUP"
        ? ["READY_FOR_PICKUP", "COMPLETED"]
        : [step.key];
  return reviewCase.history?.find((entry) => matchingStatuses.includes(entry.status));
};

function WellnessProgress({ reviewCase }) {
  const rank = wellnessRanks[reviewCase.status] || 0;
  const snapshot = reviewCase.profile_snapshot || {};
  return (
    <article className="account-card account-card-wide wellness-progress-card">
      <div className="wellness-progress-heading">
        <div>
          <p className="section-kicker">Wellness journey</p>
          <h2>Your personalized wellness progress</h2>
          <p>Reference {reviewCase.reference}</p>
        </div>
        <span className="account-status">{reviewCase.status.replaceAll("_", " ")}</span>
      </div>

      <div className="account-workflow-grid">
        <aside className="account-how-it-works">
          <h3>How It Works</h3>
          {wellnessSteps.map((step, index) => (
            <div className="account-how-step" key={step.key}>
              <span>{index + 1}</span><div><strong>{step.label}</strong><p>{step.text}</p></div>
            </div>
          ))}
        </aside>
        <div className="account-workflow-main">
          <h3>Track Your Progress</h3>
      <div className="wellness-intake-summary">
        <div><strong>Current symptoms</strong><span>{snapshot.current_symptoms || "Not provided"}</span></div>
        <div><strong>Duration</strong><span>{snapshot.symptoms_duration || "Not provided"}</span></div>
        <div><strong>Frequency</strong><span>{snapshot.symptoms_frequency || "Not provided"}</span></div>
        <div><strong>Wellness goals</strong><span>{snapshot.wellness_goals || "Not provided"}</span></div>
      </div>

      <div className="wellness-progress-list">
        {wellnessSteps.map((step, index) => {
          const done = rank > index + 1 || (rank === wellnessSteps.length && index === wellnessSteps.length - 1);
          const active = rank === index + 1;
          const history = historyForStep(reviewCase, step);
          const detail = step.key === "RECIPE_READY" && reviewCase.recipe_title
            ? `${reviewCase.recipe_title}${reviewCase.price != null ? ` · ${formatMoney(reviewCase.price, reviewCase.currency)}` : ""}`
            : step.key === "PAYMENT_PENDING" && reviewCase.payment_status === "PAID"
              ? "Payment received."
              : step.key === "READY_FOR_PICKUP" && reviewCase.pickup_location
                ? `${reviewCase.pickup_location}${reviewCase.pickup_date ? ` · ${formatDate(reviewCase.pickup_date)}` : ""}`
                : history?.message || step.text;
          return (
            <div className={`wellness-progress-step ${done ? "done" : active ? "active" : "pending"}`} key={step.key}>
              <span className="wellness-step-number">{done ? "✓" : index + 1}</span>
              <div>
                <strong>{step.label}</strong>
                <p>{detail}</p>
              </div>
              <time>{history ? formatDate(history.created_at) : active && index === 0 ? formatDate(reviewCase.submitted_at) : "Pending"}</time>
            </div>
          );
        })}
      </div>
        </div>
      </div>

      {reviewCase.reviewer_message && (
        <div className="wellness-review-message"><strong>Message from your reviewer</strong><p>{reviewCase.reviewer_message}</p></div>
      )}
      {reviewCase.recipe_title && (
        <div className="wellness-recipe-summary">
          <h3>{reviewCase.recipe_title}</h3>
          {reviewCase.recipe_instructions && <p>{reviewCase.recipe_instructions}</p>}
          {!!reviewCase.recipe_ingredients?.length && <p><strong>Ingredients:</strong> {reviewCase.recipe_ingredients.join(", ")}</p>}
          {reviewCase.safety_notes && <p><strong>Safety notes:</strong> {reviewCase.safety_notes}</p>}
          {reviewCase.price != null && <p><strong>Price:</strong> {formatMoney(reviewCase.price, reviewCase.currency)}</p>}
        </div>
      )}
      <section className="account-personalized-blend">
        <div className="account-blend-copy">
          <div className="account-blend-heading"><h3>Personalized Oil Blend</h3><span className="account-status">{reviewCase.status === "READY_FOR_PICKUP" || reviewCase.status === "COMPLETED" ? "Ready" : "Processing"}</span></div>
          <p>{reviewCase.status === "READY_FOR_PICKUP" || reviewCase.status === "COMPLETED"
            ? `Your personalized blend is ready${reviewCase.pickup_location ? ` for pickup at ${reviewCase.pickup_location}` : ""}.`
            : reviewCase.recipe_title
              ? "Your personalized recommendation is being prepared. Updates will appear here."
              : "Your wellness details have been submitted. Your personalized recommendation will appear after professional review."}</p>
        </div>
        <img src={personalizedBlendImage} alt="Happy Drops personalized essential oil blend" />
      </section>
    </article>
  );
}

const reviewStatusOptions = ["SUBMITTED", "UNDER_REVIEW", "RECIPE_READY", "PAYMENT_PENDING", "PAID", "IN_PREPARATION", "READY_FOR_PICKUP", "COMPLETED", "CANCELLED"];

function WellnessAdminCase({ reviewCase, onUpdated }) {
  const snapshot = reviewCase.profile_snapshot || {};
  const [form, setForm] = useState({
    status: reviewCase.status,
    reviewerMessage: reviewCase.reviewer_message || "",
    recipeTitle: reviewCase.recipe_title || "",
    recipeInstructions: reviewCase.recipe_instructions || "",
    recipeIngredients: (reviewCase.recipe_ingredients || []).join("\n"),
    safetyNotes: reviewCase.safety_notes || "",
    price: reviewCase.price ?? "",
    currency: reviewCase.currency || "EUR",
    paymentStatus: reviewCase.payment_status || "PENDING",
    pickupLocation: reviewCase.pickup_location || "",
    pickupDate: reviewCase.pickup_date?.slice(0, 10) || "",
    pickupTime: reviewCase.pickup_time?.slice(0, 5) || "",
    notifyCustomer: true,
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value }));
  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const result = await apiRequest(`/api/admin/wellness-cases/${reviewCase.id}`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({
          ...form,
          recipeIngredients: form.recipeIngredients.split("\n").map((item) => item.trim()).filter(Boolean),
        }),
      });
      onUpdated({ ...reviewCase, ...result.reviewCase });
      setMessage(result.emailDelivery?.delivered ? "Saved and customer email sent." : "Saved. Email is pending SMTP configuration.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <details className="wellness-admin-case">
      <summary><span><strong>{reviewCase.first_name} {reviewCase.family_name}</strong><small>{reviewCase.email} · {reviewCase.reference}</small></span><span className="account-status">{reviewCase.status.replaceAll("_", " ")}</span></summary>
      <div className="wellness-admin-body">
        <dl className="wellness-admin-intake">
          <div><dt>Symptoms</dt><dd>{snapshot.current_symptoms || "Not provided"}</dd></div>
          <div><dt>Duration / frequency</dt><dd>{snapshot.symptoms_duration || "—"} / {snapshot.symptoms_frequency || "—"}</dd></div>
          <div><dt>Medication</dt><dd>{snapshot.takes_medication ? snapshot.medication_details || "Yes" : "No"}</dd></div>
          <div><dt>Ongoing conditions</dt><dd>{snapshot.ongoing_conditions || "Not provided"}</dd></div>
          <div><dt>Family history</dt><dd>{snapshot.family_medical_history || "Not provided"}</dd></div>
          <div><dt>Treatments tried</dt><dd>{snapshot.treatments_tried || "Not provided"}</dd></div>
          <div><dt>Chronic diseases</dt><dd>{snapshot.chronic_diseases || "Not provided"}</dd></div>
          <div><dt>Wellness goals</dt><dd>{snapshot.wellness_goals || "Not provided"}</dd></div>
        </dl>
        <div className="wellness-admin-form">
          <label>Status<select name="status" value={form.status} onChange={update}>{reviewStatusOptions.map((status) => <option key={status}>{status}</option>)}</select></label>
          <label>Customer message<textarea name="reviewerMessage" value={form.reviewerMessage} onChange={update} /></label>
          <label>Recipe title<input name="recipeTitle" value={form.recipeTitle} onChange={update} /></label>
          <label>Instructions<textarea name="recipeInstructions" value={form.recipeInstructions} onChange={update} /></label>
          <label>Ingredients (one per line)<textarea name="recipeIngredients" value={form.recipeIngredients} onChange={update} /></label>
          <label>Safety notes<textarea name="safetyNotes" value={form.safetyNotes} onChange={update} /></label>
          <div className="wellness-admin-row"><label>Price<input min="0" name="price" type="number" step="0.01" value={form.price} onChange={update} /></label><label>Currency<input maxLength="3" name="currency" value={form.currency} onChange={update} /></label><label>Payment<select name="paymentStatus" value={form.paymentStatus} onChange={update}>{["PENDING","AUTHORIZED","PAID","FAILED","CANCELLED","REFUNDED"].map((status) => <option key={status}>{status}</option>)}</select></label></div>
          <label>Pickup location<input name="pickupLocation" value={form.pickupLocation} onChange={update} /></label>
          <div className="wellness-admin-row"><label>Pickup date<input name="pickupDate" type="date" value={form.pickupDate} onChange={update} /></label><label>Pickup time<input name="pickupTime" type="time" value={form.pickupTime} onChange={update} /></label></div>
          <label className="wellness-notify"><input name="notifyCustomer" type="checkbox" checked={form.notifyCustomer} onChange={update} /> Email this update to the customer</label>
          <button className="account-action" type="button" disabled={saving} onClick={save}>{saving ? "Saving…" : "Save review update"}</button>
          {message && <p className="wellness-admin-message" role="status">{message}</p>}
        </div>
      </div>
    </details>
  );
}

export function MyProfile() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [adminCases, setAdminCases] = useState([]);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminStatus, setAdminStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      apiRequest("/api/account/wellness-profile", { auth: true }),
      apiRequest("/api/account/wellness-cases", { auth: true }),
      apiRequest("/api/orders/me", { auth: true }),
      apiRequest("/api/assessments/me", { auth: true }),
      apiRequest("/api/workshops/requests/me", { auth: true }),
    ]).then(([wellness, wellnessCases, orders, assessments, workshops]) => {
      setData({
        wellness: wellness.wellnessProfile,
        wellnessCases: wellnessCases.cases || [],
        orders: orders.orders || [],
        assessments: assessments.assessments || [],
        workshops: workshops.requests || [],
      });
    }).catch((requestError) => setError(requestError.message));
  }, []);

  useEffect(() => {
    if (!["STAFF", "ADMIN"].includes(user.role)) return;
    const params = new URLSearchParams();
    if (adminSearch.trim()) params.set("search", adminSearch.trim());
    if (adminStatus) params.set("status", adminStatus);
    const timer = window.setTimeout(() => {
      apiRequest(`/api/admin/wellness-cases?${params}`, { auth: true })
        .then((result) => setAdminCases(result.cases || []))
        .catch((requestError) => setError(requestError.message));
    }, 200);
    return () => window.clearTimeout(timer);
  }, [adminSearch, adminStatus, user.role]);

  const updateAdminCase = (updatedCase) => {
    setAdminCases((cases) => cases.map((item) => item.id === updatedCase.id ? { ...item, ...updatedCase } : item));
  };

  return (
    <main className="account-page">
      <header className="account-hero">
        <p className="section-kicker">My Account</p>
        <h1>{user.firstName} {user.familyName}</h1>
        <p>Review your account, wellness journey, workshop requests, and product orders.</p>
      </header>

      {error && <p className="account-error" role="alert">{error}</p>}
      {!data && !error && <p className="account-loading">Loading your profile…</p>}

      <section className="account-grid">
        {data?.wellnessCases[0] && <WellnessProgress reviewCase={data.wellnessCases[0]} />}

        <article className="account-card">
          <h2>Personal details</h2>
          <dl>
            <div><dt>Email</dt><dd>{user.email}</dd></div>
            <div><dt>Phone</dt><dd>{user.phone || "Not provided"}</dd></div>
            <div><dt>Address</dt><dd>{user.address || "Not provided"}</dd></div>
            <div><dt>Language</dt><dd>{user.preferredLanguage || "English"}</dd></div>
            <div><dt>Member since</dt><dd>{formatDate(user.createdAt)}</dd></div>
          </dl>
        </article>

        <article className="account-card">
          <h2>Wellness profile</h2>
          {data?.wellness ? (
            <dl>
              <div><dt>Current symptoms</dt><dd>{data.wellness.current_symptoms}</dd></div>
              <div><dt>Wellness goals</dt><dd>{data.wellness.wellness_goals || "Not provided"}</dd></div>
              <div><dt>Updated</dt><dd>{formatDate(data.wellness.updated_at)}</dd></div>
            </dl>
          ) : <p>No wellness intake has been saved yet.</p>}
          <Link className="account-action" to="/wellness-assessment">Complete assessment</Link>
        </article>

        <article className="account-card account-card-wide">
          <h2>Workshop requests</h2>
          {!data?.workshops.length ? <p>No workshop requests yet.</p> : (
            <div className="account-list">
              {data.workshops.map((request) => (
                <div key={request.id}>
                  <strong>{request.workshop_name || request.workshop_title || "Workshop"}</strong>
                  <span>{request.location}</span>
                  <span>{formatDate(request.preferred_date)} · {request.preferred_time || "Time pending"}</span>
                  <span>{request.participant_count} participant(s) · {formatMoney(request.total_price, request.currency)}</span>
                  <span className="account-status">{request.status}</span>
                </div>
              ))}
            </div>
          )}
          <Link className="account-action" to="/workshops">View workshops</Link>
        </article>

        <article className="account-card account-card-wide">
          <h2>Product orders</h2>
          {!data?.orders.length ? <p>No product orders yet.</p> : (
            <div className="account-list">
              {data.orders.map((order) => (
                <div key={order.id}>
                  <strong>{order.order_number}</strong>
                  <span>{formatDate(order.created_at)}</span>
                  <span>{formatMoney(order.total, order.currency)}</span>
                  <span className="account-status">{order.status}</span>
                  <Link to={`/track-order?number=${encodeURIComponent(order.order_number)}&email=${encodeURIComponent(order.email)}`}>Track</Link>
                </div>
              ))}
            </div>
          )}
          <Link className="account-action" to="/shop">Continue shopping</Link>
        </article>

        <article className="account-card">
          <h2>Assessments</h2>
          <p>{data?.assessments.length || 0} completed assessment(s).</p>
          {data?.assessments[0] && <p>Latest score: {data.assessments[0].overall_score}/5</p>}
        </article>

        <article className="account-card">
          <h2>Saved items</h2>
          <p>Open your wishlist to review products, workshops, and knowledge articles.</p>
          <Link className="account-action" to="/wishlist">Open wishlist</Link>
        </article>

        {["STAFF", "ADMIN"].includes(user.role) && (
          <article className="account-card account-card-wide wellness-admin-panel">
            <div className="wellness-progress-heading">
              <div><p className="section-kicker">Reviewer access</p><h2>Customer wellness reviews</h2><p>Review submitted symptoms and publish progress securely to each customer.</p></div>
            </div>
            <div className="wellness-admin-filters">
              <input type="search" value={adminSearch} onChange={(event) => setAdminSearch(event.target.value)} placeholder="Search name, email, reference, or symptom" />
              <select value={adminStatus} onChange={(event) => setAdminStatus(event.target.value)}><option value="">All statuses</option>{reviewStatusOptions.map((status) => <option key={status}>{status.replaceAll("_", " ")}</option>)}</select>
            </div>
            <div className="wellness-admin-list">
              {!adminCases.length && <p>No wellness profiles match these filters.</p>}
              {adminCases.map((reviewCase) => <WellnessAdminCase key={reviewCase.id} reviewCase={reviewCase} onUpdated={updateAdminCase} />)}
            </div>
          </article>
        )}
      </section>
    </main>
  );
}

export function Wishlist() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/api/account/favorites", { auth: true })
      .then(({ favorites: items }) => setFavorites(items || []))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const removeFavorite = async (id) => {
    try {
      await apiRequest(`/api/account/favorites/${id}`, { method: "DELETE", auth: true });
      setFavorites((items) => items.filter((item) => item.id !== id));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <main className="account-page">
      <header className="account-hero">
        <p className="section-kicker">My Account</p>
        <h1>Wishlist</h1>
        <p>Your saved Happy Drops products, workshops, and knowledge articles.</p>
      </header>
      {error && <p className="account-error" role="alert">{error}</p>}
      {loading ? <p className="account-loading">Loading saved items…</p> : (
        <section className="wishlist-grid">
          {!favorites.length && (
            <article className="account-card wishlist-empty">
              <h2>Your wishlist is empty</h2>
              <p>Open a product and select “Save to Wishlist” to keep it here.</p>
              <Link className="account-action" to="/shop">Browse products</Link>
            </article>
          )}
          {favorites.map((item) => {
            const title = item.name || item.title;
            const destination = item.product_id
              ? `/shop?q=${encodeURIComponent(item.name)}`
              : item.workshop_id ? "/workshops" : "/knowledge";
            return (
              <article className="account-card" key={item.id}>
                <p className="section-kicker">{item.product_id ? "Product" : item.workshop_id ? "Workshop" : "Knowledge"}</p>
                <h2>{title}</h2>
                {item.price && <p>{formatMoney(item.price, item.currency)}</p>}
                <div className="wishlist-actions">
                  <Link className="account-action" to={destination}>View item</Link>
                  <button className="wishlist-remove" type="button" onClick={() => removeFavorite(item.id)}>Remove</button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export function TrackOrder() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const query = new URLSearchParams(window.location.search);
  const [number, setNumber] = useState(query.get("number") || "");
  const [email, setEmail] = useState(query.get("email") || "");
  const [loading, setLoading] = useState(false);

  const track = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const { order } = await apiRequest(`/api/orders/track/${encodeURIComponent(number.trim())}?email=${encodeURIComponent(email.trim())}`);
      setResult(order);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="account-page">
      <header className="account-hero">
        <p className="section-kicker">Customer Care</p>
        <h1>Track Order</h1>
        <p>Enter the exact order reference and email address used during checkout.</p>
      </header>
      <section className="track-layout">
        <form className="track-card track-form" onSubmit={track}>
          <label>Order reference<input value={number} onChange={(event) => setNumber(event.target.value)} required placeholder="HD-XXXXXXXX" /></label>
          <label>Order email<input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" placeholder="name@example.com" /></label>
          <button type="submit" disabled={loading}>{loading ? "Checking…" : "Track order"}</button>
          {error && <p className="account-error" role="alert">{error}</p>}
        </form>

        {result && (
          <article className="track-card">
            <p className="section-kicker">Order found</p>
            <h2>{result.order_number}</h2>
            <dl>
              <div><dt>Status</dt><dd><span className="account-status">{result.status}</span></dd></div>
              <div><dt>Placed</dt><dd>{formatDate(result.created_at)}</dd></div>
              <div><dt>Total</dt><dd>{formatMoney(result.total, result.currency)}</dd></div>
              <div><dt>Items</dt><dd>{result.items?.map((item) => `${item.quantity} × ${item.product_name}`).join(", ")}</dd></div>
            </dl>
            {!!result.history?.length && (
              <div className="track-history">
                <h3>Status history</h3>
                {result.history.map((entry) => (
                  <p key={entry.id}><strong>{entry.status}</strong> · {formatDate(entry.created_at)} {entry.note && `— ${entry.note}`}</p>
                ))}
              </div>
            )}
          </article>
        )}
      </section>
    </main>
  );
}
