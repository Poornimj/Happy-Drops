import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../lib/api";
import personalizedBlendImage from "../assets/images/knowledg-ready.png";
import customerProfileBanner from "../assets/images/customer-profile-family-banner.png";
import happyWishesBanner from "../assets/images/happy-wishes-banner.png";
import "./CustomerCare.css";
import "./AccountPages.css";

const formatDate = (value) => value
  ? new Intl.DateTimeFormat("en-FI", { dateStyle: "medium" }).format(new Date(value))
  : "Not available";

const formatMoney = (value, currency = "EUR") => new Intl.NumberFormat("en-FI", {
  style: "currency",
  currency,
}).format(Number(value || 0));

const ageFromBirthDate = (value) => {
  if (!value) return null;
  const birthDate = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age -= 1;
  return age;
};

const emptyFamilyMember = { firstName: "", familyName: "", relationship: "", dateOfBirth: "", wellnessNotes: "", guardianConfirmed: false };

function FamilyMembersManager() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState(emptyFamilyMember);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const loadMembers = () => apiRequest("/api/account/family-members", { auth: true })
    .then((result) => setMembers(result.familyMembers || []))
    .catch((error) => setMessage(error.message));

  useEffect(() => { loadMembers(); }, []);

  const startEdit = (member) => {
    setEditingId(member.id);
    setForm({ firstName: member.first_name, familyName: member.family_name, relationship: member.relationship, dateOfBirth: String(member.date_of_birth).slice(0, 10), wellnessNotes: member.wellness_notes || "", guardianConfirmed: member.guardian_confirmed });
    setIsOpen(true);
    setMessage("");
  };

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await apiRequest(editingId ? `/api/account/family-members/${editingId}` : "/api/account/family-members", { method: editingId ? "PATCH" : "POST", auth: true, body: JSON.stringify(form) });
      setMessage(editingId ? "Family member updated." : "Family member added.");
      setForm(emptyFamilyMember);
      setEditingId(null);
      setIsOpen(false);
      await loadMembers();
    } catch (error) { setMessage(error.message); }
  };

  const remove = async (member) => {
    if (!window.confirm(`Remove ${member.first_name} ${member.family_name} from your family profiles?`)) return;
    try {
      await apiRequest(`/api/account/family-members/${member.id}`, { method: "DELETE", auth: true });
      setMembers((current) => current.filter((item) => item.id !== member.id));
      setMessage("Family member removed.");
    } catch (error) { setMessage(error.message); }
  };

  const age = ageFromBirthDate(form.dateOfBirth);
  return <article className="account-card account-card-wide family-manager">
    <div className="family-manager-heading"><div><h2>Family Members</h2><p>Manage family wellness profiles securely from your account.</p></div><button className="account-action" type="button" onClick={() => { setIsOpen((current) => !current); setEditingId(null); setForm(emptyFamilyMember); }}>{isOpen ? "Close" : "+ Add Family Member"}</button></div>
    {message && <p className="family-manager-message" role="status">{message}</p>}
    {!members.length ? <p>No family members have been added yet.</p> : <div className="family-member-list">{members.map((member) => <div key={member.id}><span><strong>{member.first_name} {member.family_name}</strong><small>{member.relationship} · Age {ageFromBirthDate(member.date_of_birth)}</small></span><span>{member.wellness_notes || "No wellness notes"}</span><div><button type="button" onClick={() => startEdit(member)}>Edit</button><button type="button" onClick={() => remove(member)}>Remove</button></div></div>)}</div>}
    {isOpen && <form className="family-member-form" onSubmit={submit}>
      <h3>{editingId ? "Edit Family Member" : "Add Family Member"}</h3>
      <div className="family-member-form-grid">
        <label>First Name <strong>*</strong><input required value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} /></label>
        <label>Family Name <strong>*</strong><input required value={form.familyName} onChange={(event) => setForm({ ...form, familyName: event.target.value })} /></label>
        <label>Relationship <strong>*</strong><select required value={form.relationship} onChange={(event) => setForm({ ...form, relationship: event.target.value })}><option value="" disabled>Select relationship</option><option>Child</option><option>Spouse / Partner</option><option>Parent</option><option>Sibling</option><option>Other dependent</option></select></label>
        <label>Date of Birth <strong>*</strong><input required type="date" max={new Date().toISOString().slice(0, 10)} value={form.dateOfBirth} onChange={(event) => setForm({ ...form, dateOfBirth: event.target.value })} />{age !== null && <small>Current age: {age}</small>}</label>
        <label className="family-member-notes">Wellness Notes <strong>*</strong><textarea required value={form.wellnessNotes} onChange={(event) => setForm({ ...form, wellnessNotes: event.target.value })} placeholder="Current symptoms, allergies, wellness goals, or other helpful notes" /></label>
      </div>
      {age !== null && age < 18 && <label className="family-guardian"><input required type="checkbox" checked={form.guardianConfirmed} onChange={(event) => setForm({ ...form, guardianConfirmed: event.target.checked })} /> I confirm that I am the parent or legal guardian and may manage this minor's information.</label>}
      <button className="account-action" type="submit">{editingId ? "Save Changes" : "Add Family Member"}</button>
    </form>}
  </article>;
}

function PersonalDetailsCard() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ email: user.email, firstName: user.firstName, familyName: user.familyName, phone: user.phone || "", address: user.address || "", dateOfBirth: user.dateOfBirth ? String(user.dateOfBirth).slice(0, 10) : "", preferredLanguage: user.preferredLanguage || "English" });

  const save = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const result = await apiRequest("/api/auth/me", { method: "PATCH", auth: true, body: JSON.stringify(form) });
      updateUser(result.user);
      setEditing(false);
      setMessage("Your personal details have been updated.");
    } catch (error) { setMessage(error.message); }
  };

  return <article className="account-card personal-details-card">
    <div className="personal-details-heading"><h2>Personal Details</h2><button type="button" onClick={() => setEditing((current) => !current)}>{editing ? "Cancel" : "Edit Details"}</button></div>
    {message && <p className="family-manager-message" role="status">{message}</p>}
    {!editing ? <dl>
      <div><dt>Name</dt><dd>{user.firstName} {user.familyName}</dd></div>
      <div><dt>Email</dt><dd>{user.email}</dd></div>
      <div><dt>Phone</dt><dd>{user.phone || "Not provided"}</dd></div>
      <div><dt>Address</dt><dd>{user.address || "Not provided"}</dd></div>
      <div><dt>Date of birth</dt><dd>{user.dateOfBirth ? `${formatDate(user.dateOfBirth)} (Age ${ageFromBirthDate(user.dateOfBirth)})` : "Not provided"}</dd></div>
      <div><dt>Language</dt><dd>{user.preferredLanguage || "English"}</dd></div>
      <div><dt>Member since</dt><dd>{formatDate(user.createdAt)}</dd></div>
    </dl> : <form className="personal-details-form" onSubmit={save}>
      <div><label>First Name <strong>*</strong><input required value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} /></label><label>Family Name <strong>*</strong><input required value={form.familyName} onChange={(event) => setForm({ ...form, familyName: event.target.value })} /></label></div>
      <label>Email <strong>*</strong><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
      <label>Phone<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
      <label>Address<input value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} /></label>
      <label>Date of Birth<input type="date" max={new Date().toISOString().slice(0, 10)} value={form.dateOfBirth} onChange={(event) => setForm({ ...form, dateOfBirth: event.target.value })} /></label>
      <label>Preferred Language<select value={form.preferredLanguage} onChange={(event) => setForm({ ...form, preferredLanguage: event.target.value })}><option>English</option><option>Finnish</option><option>Chinese</option></select></label>
      <button className="account-action" type="submit">Save Details</button>
    </form>}
  </article>;
}

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
      apiRequest("/api/account/happy-wishes", { auth: true }),
    ]).then(([wellness, wellnessCases, orders, assessments, workshops, happyWishes]) => {
      setData({
        wellness: wellness.wellnessProfile,
        wellnessCases: wellnessCases.cases || [],
        orders: orders.orders || [],
        assessments: assessments.assessments || [],
        workshops: workshops.requests || [],
        wishes: happyWishes.wishes || [],
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
        <img src={customerProfileBanner} alt="A happy multigenerational family together at home" />
        <div className="account-hero-shade"></div>
        <div className="account-hero-content">
          <p className="section-kicker">My Account</p>
          <h1>{user.firstName} {user.familyName}</h1>
          <p>Review your account, wellness journey, workshop requests, and product orders.</p>
        </div>
        <Link className="account-hero-assessment" to="/wellness-assessment">Complete Assessment</Link>
      </header>

      {error && <p className="account-error" role="alert">{error}</p>}
      {!data && !error && <p className="account-loading">Loading your profile…</p>}

      <section className="account-grid">
        {data?.wellnessCases[0] && <WellnessProgress reviewCase={data.wellnessCases[0]} />}

        <article className="account-card account-card-wide profile-happy-wishes">
          <div className="profile-happy-wishes-heading">
            <div><p className="section-kicker">Dream · Celebrate · Share</p><h2>My Happy Wishes</h2><p>Your meaningful wishes for yourself and the people you care about.</p></div>
            <Link className="account-action" to="/wishlist">Add New Wish</Link>
          </div>
          {!data?.wishes.length ? <div className="profile-wishes-empty"><strong>Your wish space is ready</strong><p>Add a dream, birthday surprise, wellbeing goal, or thoughtful wish for someone special.</p></div> : <div className="profile-wish-list">
            {data.wishes.map((wish) => <div className="profile-wish-item" key={wish.id}>
              <div><span className="profile-wish-recipient">{wish.recipient_type === "MYSELF" ? "For me" : `For ${wish.recipient_name || wish.recipient_type.toLowerCase().replaceAll("_", " ")}`}</span><strong>{wish.title}</strong><span>{wish.wish_type.toLowerCase().replaceAll("_", " ")} · {wish.target_date ? formatDate(wish.target_date) : "Open date"}</span></div>
              <div className="profile-wish-momentum"><strong>{wish.momentum_score}</strong><span>Momentum</span></div><span className="account-status">{wish.status}</span>
            </div>)}
          </div>}
        </article>

        <FamilyMembersManager />

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

        <PersonalDetailsCard />

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
  const emptyWish = { title: "", wishType: "DREAM", recipientType: "MYSELF", recipientName: "", description: "", targetDate: "", importance: 3, firstStep: "", status: "ACTIVE" };
  const [wishes, setWishes] = useState([]);
  const [form, setForm] = useState(emptyWish);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadWishes = () => apiRequest("/api/account/happy-wishes", { auth: true })
      .then(({ wishes: items }) => setWishes(items || []))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));

  useEffect(() => { loadWishes(); }, []);

  const submitWish = async (event) => {
    event.preventDefault();
    setError(""); setMessage("");
    try {
      await apiRequest(editingId ? `/api/account/happy-wishes/${editingId}` : "/api/account/happy-wishes", { method: editingId ? "PATCH" : "POST", auth: true, body: JSON.stringify(form) });
      setMessage(editingId ? "Your Happy Wish has been updated and rescored." : "Your Happy Wish and Momentum Score are ready.");
      setForm(emptyWish); setEditingId(null); await loadWishes();
    } catch (requestError) { setError(requestError.message); }
  };

  const editWish = (wish) => {
    setEditingId(wish.id);
    setForm({ title: wish.title, wishType: wish.wish_type, recipientType: wish.recipient_type || "MYSELF", recipientName: wish.recipient_name || "", description: wish.description, targetDate: wish.target_date ? String(wish.target_date).slice(0, 10) : "", importance: wish.importance, firstStep: wish.first_step, status: wish.status });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeWish = async (id) => {
    if (!window.confirm("Remove this Happy Wish?")) return;
    try {
      await apiRequest(`/api/account/happy-wishes/${id}`, { method: "DELETE", auth: true });
      setWishes((items) => items.filter((item) => item.id !== id));
      setMessage("Happy Wish removed.");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <main className="account-page">
      <header className="account-hero happy-wishes-hero">
        <img src={happyWishesBanner} alt="A peaceful Happy Wishes journal beside candles and natural greenery" />
        <div className="account-hero-shade"></div>
        <div className="account-hero-content">
          <p className="section-kicker">Dream · Celebrate · Share</p>
          <h1>My Happy Wishes</h1>
          <p>Capture the wishes that matter most—for yourself or someone special—and turn each meaningful hope into a thoughtful path forward.</p>
        </div>
      </header>
      {error && <p className="account-error" role="alert">{error}</p>}
      <section className="happy-wishes-layout">
        <form className="account-card happy-wish-form" onSubmit={submitWish}>
          <p className="section-kicker">A wish becomes a path</p><h2>{editingId ? "Refine Your Happy Wish" : "Create a Happy Wish"}</h2><p>Describe what would bring more happiness or meaning to your life. We will generate a Wish Momentum score and thoughtful guidance.</p>
          <div className="wish-recipient-section"><span className="wish-recipient-label">Who is this wish for? <strong>*</strong></span><div className="wish-recipient-options">{[["MYSELF","Myself","For my own happiness"],["PARTNER","Partner / Spouse","For the person I love"],["FRIEND","Friend","Something meaningful for a friend"],["CHILD","Child","A loving wish for a child"],["PARENT","Parent","A special wish for a parent"],["FAMILY","Our Family","A dream to share together"],["SOMEONE_SPECIAL","Someone Special","For another important person"]].map(([value,label,help]) => <button className={form.recipientType === value ? "selected" : ""} type="button" key={value} onClick={() => setForm({ ...form, recipientType: value, recipientName: value === "MYSELF" ? "" : form.recipientName })}><strong>{label}</strong><span>{help}</span></button>)}</div></div>
          {form.recipientType !== "MYSELF" && <label>Recipient's Name <strong>*</strong><input required maxLength="160" value={form.recipientName} onChange={(event) => setForm({ ...form, recipientName: event.target.value })} placeholder="Who would you love to make happy?" /></label>}
          <label>Wish Title <strong>*</strong><input required maxLength="180" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="For example: A joyful birthday surprise" /></label>
          <div className="happy-wish-form-row"><label>Wish Type <strong>*</strong><select value={form.wishType} onChange={(event) => setForm({ ...form, wishType: event.target.value })}><option value="DREAM">Personal Dream</option><option value="BIRTHDAY">Birthday Wish</option><option value="WELLNESS">Wellbeing Goal</option><option value="FAMILY">Family Wish</option><option value="EXPERIENCE">Meaningful Experience</option><option value="OTHER">Something Else</option></select></label><label>Importance <strong>*</strong><select value={form.importance} onChange={(event) => setForm({ ...form, importance: Number(event.target.value) })}>{[1,2,3,4,5].map((number) => <option key={number} value={number}>{"★".repeat(number)} {number}/5</option>)}</select></label></div>
          <label>Tell Us About Your Wish <strong>*</strong><textarea required maxLength="4000" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="What do you wish for, why does it matter, and how would it make you feel?" /></label>
          <label>My First Positive Step <strong>*</strong><input required maxLength="500" value={form.firstStep} onChange={(event) => setForm({ ...form, firstStep: event.target.value })} placeholder="One small action you can take next" /></label>
          <div className="happy-wish-form-row"><label>Target Date (Optional)<input type="date" value={form.targetDate} onChange={(event) => setForm({ ...form, targetDate: event.target.value })} /></label>{editingId && <label>Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="ACTIVE">Active</option><option value="PAUSED">Paused</option><option value="ACHIEVED">Achieved</option></select></label>}</div>
          <div className="wishlist-actions"><button className="account-action" type="submit">{editingId ? "Update & Recalculate" : "Create My Happy Wish"}</button>{editingId && <button className="wishlist-remove" type="button" onClick={() => { setEditingId(null); setForm(emptyWish); }}>Cancel</button>}</div>
          {message && <p className="family-manager-message" role="status">{message}</p>}
        </form>
        <aside className="happy-wish-explainer"><p className="section-kicker">Wish Momentum</p><h2>More than a rating</h2><p>Your score reflects how clearly your wish is described and whether it has a meaningful first step. It encourages progress—it never judges the size or value of your dream.</p><div><strong>Clarity</strong><span>Express why the wish matters.</span></div><div><strong>Direction</strong><span>Choose a realistic first step.</span></div><div><strong>Celebration</strong><span>Recognize every milestone.</span></div></aside>
      </section>
      {loading ? <p className="account-loading">Loading Happy Wishes…</p> : <section className="happy-wish-grid">
        {!wishes.length && <article className="account-card wishlist-empty"><h2>Your first Happy Wish begins here</h2><p>Use the form above to capture something meaningful you would love to experience, achieve, or celebrate.</p></article>}
        {wishes.map((wish) => <article className={`account-card happy-wish-card ${wish.status.toLowerCase()}`} key={wish.id}>
          <div className="happy-wish-card-heading"><div><p className="section-kicker">{wish.wish_type.replaceAll("_", " ")} · {wish.recipient_type === "MYSELF" ? "FOR ME" : `FOR ${wish.recipient_name || wish.recipient_type.replaceAll("_", " ")}`}</p><h2>{wish.title}</h2></div><span className="account-status">{wish.status}</span></div>
          <p>{wish.description}</p>
          <div className="happy-wish-score"><div><strong>{wish.momentum_score}</strong><span>/100</span></div><div><strong>Wish Momentum</strong><span>{"★".repeat(Math.max(1, Math.ceil(wish.momentum_score / 20)))}</span></div></div>
          <div className="happy-wish-meter"><span style={{ width: `${wish.momentum_score}%` }}></span></div>
          <p className="happy-wish-guidance"><strong>Your guidance:</strong> {wish.guidance}</p>
          <dl><div><dt>First positive step</dt><dd>{wish.first_step}</dd></div><div><dt>Target</dt><dd>{wish.target_date ? formatDate(wish.target_date) : "When the time feels right"}</dd></div><div><dt>Importance</dt><dd>{"★".repeat(wish.importance)}</dd></div></dl>
          <div className="wishlist-actions"><button className="account-action" type="button" onClick={() => editWish(wish)}>Edit Wish</button><button className="wishlist-remove" type="button" onClick={() => removeWish(wish.id)}>Remove</button></div>
        </article>)}
      </section>}
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
