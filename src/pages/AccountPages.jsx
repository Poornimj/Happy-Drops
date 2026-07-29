import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../lib/api";
import "./CustomerCare.css";
import "./AccountPages.css";

const formatDate = (value) => value
  ? new Intl.DateTimeFormat("en-FI", { dateStyle: "medium" }).format(new Date(value))
  : "Not available";

const formatMoney = (value, currency = "EUR") => new Intl.NumberFormat("en-FI", {
  style: "currency",
  currency,
}).format(Number(value || 0));

export function MyProfile() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      apiRequest("/api/account/wellness-profile", { auth: true }),
      apiRequest("/api/orders/me", { auth: true }),
      apiRequest("/api/assessments/me", { auth: true }),
      apiRequest("/api/workshops/requests/me", { auth: true }),
    ]).then(([wellness, orders, assessments, workshops]) => {
      setData({
        wellness: wellness.wellnessProfile,
        orders: orders.orders || [],
        assessments: assessments.assessments || [],
        workshops: workshops.requests || [],
      });
    }).catch((requestError) => setError(requestError.message));
  }, []);

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
