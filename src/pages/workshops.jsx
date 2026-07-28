import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import {
  LuBriefcaseBusiness,
  LuCalendarDays,
  LuCalendarHeart,
  LuLeaf,
  LuLock,
  LuPalette,
  LuShieldCheck,
  LuSoup,
} from "react-icons/lu";
import workshopHeader from "../assets/images/workshop-header.png";
import workshopEssentialOil from "../assets/images/workshops-essential-oil.png";
import workshopOilCard from "../assets/images/workshop-oil3.png";
import workshopDumplingCard from "../assets/images/workshop-dumpling2.png";
import workshopSpecialEventCard from "../assets/images/workshop- specialevent2.png";
import workshopOfficeCard from "../assets/images/workshop-office.png";
import workshopSummaryImage from "../assets/images/workshop-summary-image.png";
import kombuchaMenuImage from "../assets/images/kombucha.png";
import saladMenuImage from "../assets/images/salad.png";
import dumplingsMenuImage from "../assets/images/dumplings.png";
import "../index.css";

const workshops = [
  {
    title: "Essential Oil Workshop",
    text: "Learn how essential oils can support common wellness questions in a natural and practical way.",
    icon: LuLeaf,
    color: "green",
    sheet: workshopEssentialOil,
    price: 48,
    date: "25 August 2026",
    time: "14:00",
    location: "Happy Drops Studio, Helsinki",
  },
  {
    title: "Dumpling DIY + Nutrition Workshop",
    text: "Enjoy a hands-on dumpling-making experience while learning simple nutrition tips",
    icon: LuSoup,
    color: "purple",
    sheet: workshopDumplingCard,
    price: 55,
    date: "30 August 2026",
    time: "12:00",
    location: "Happy Drops Studio, Helsinki",
  },
  {
    title: "Special Event Workshop",
    text: "A memorable and fun experience for birthdays, bachelor parties, anniversaries and special occasions.",
    icon: LuCalendarHeart,
    color: "rose",
    sheet: workshopSpecialEventCard,
    price: 65,
    date: "By arrangement",
    time: "Flexible",
    location: "Your chosen venue",
  },
  {
    title: "Business Wellness Workshop",
    text: "Wellness activities designed for business meetings, team building days, and workplace wellbeing.",
    icon: LuBriefcaseBusiness,
    color: "gold",
    sheet: workshopOfficeCard,
    price: 48,
    date: "By arrangement",
    time: "Flexible",
    location: "Company venue or Happy Drops Studio",
  },
];

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const planWorkshopCards = [
  {
    title: "Essential Oil Workshop",
    image: workshopOilCard,
  },
  {
    title: "Dumpling DIY + Nutrition Workshop",
    image: workshopDumplingCard,
  },
  {
    title: "Special Event Workshop",
    image: workshopSpecialEventCard,
  },
  {
    title: "Business Wellness Workshop",
    image: workshopOfficeCard,
  },
];

const workshopLocations = [
  "Rautatiekatu 16A, Kamppi",
  "Pilvijärventie 50 C, Kirkkonummi",
  "Villa Stenberg, Suoniementaival 164, 08350 Lohja",
  "XR Center, Hämeentie 135 A, 00560 Helsinki",
];

const healthyMenuItems = [
  {
    name: "Kompucha",
    price: "€5.00",
    image: kombuchaMenuImage,
  },
  {
    name: "Salad",
    price: "€4.50",
    image: saladMenuImage,
  },
  {
    name: "Dumplings",
    price: "400 g - €8.50",
    image: dumplingsMenuImage,
  },
];

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getCalendarDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const startDate = new Date(year, month, 1 - firstWeekday);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      date,
      isCurrentMonth: date.getMonth() === month,
    };
  });
}

export default function Workshops() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeWorkshop, setActiveWorkshop] = useState(workshops[0]);
  const [openWorkshopSheet, setOpenWorkshopSheet] = useState(null);
  const [openWorkshopRequest, setOpenWorkshopRequest] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const [isPlanRequestSubmitted, setIsPlanRequestSubmitted] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [adminLocation, setAdminLocation] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [workshopThemes, setWorkshopThemes] = useState({});
  const [apiWorkshops, setApiWorkshops] = useState([]);
  const [participantCount, setParticipantCount] = useState(1);
  const [bookingNotes, setBookingNotes] = useState("");
  const [requestError, setRequestError] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [adminWorkshopMessage, setAdminWorkshopMessage] = useState({});
  const [isSavingWorkshop, setIsSavingWorkshop] = useState(null);
  const [bookingRecords, setBookingRecords] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminWorkshopFilter, setAdminWorkshopFilter] = useState("");
  const [adminDateFilter, setAdminDateFilter] = useState("");
  const [adminStatusFilter, setAdminStatusFilter] = useState("");
  const [adminPage, setAdminPage] = useState(1);
  const [adminSummary, setAdminSummary] = useState({ total_bookings: 0, total_participants: 0, total_price: 0 });
  const [adminPagination, setAdminPagination] = useState({ page: 1, totalPages: 1 });
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [frontHealthyMenuItem, setFrontHealthyMenuItem] = useState(
    healthyMenuItems[0].name
  );
  const calendarDays = getCalendarDays(calendarMonth);
  const activeApiWorkshop = apiWorkshops.find((item) => item.title === activeWorkshop.title);
  const calendarMonthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(calendarMonth);
  const orderedHealthyMenuItems = [
    ...healthyMenuItems.filter((item) => item.name === frontHealthyMenuItem),
    ...healthyMenuItems.filter((item) => item.name !== frontHealthyMenuItem),
  ];
  const locationBookingRecords = bookingRecords.filter((item) => item.location === adminLocation);

  const getAdminRequestQuery = useCallback((exportAll = false) => {
    const params = new URLSearchParams();
    if (adminLocation) params.set("location", adminLocation);
    if (adminSearch.trim()) params.set("search", adminSearch.trim());
    if (adminWorkshopFilter) params.set("workshopId", adminWorkshopFilter);
    if (adminDateFilter) params.set("date", adminDateFilter);
    if (adminStatusFilter) params.set("status", adminStatusFilter);
    if (exportAll) params.set("export", "true");
    else {
      params.set("page", String(adminPage));
      params.set("limit", "10");
    }
    return params.toString();
  }, [adminDateFilter, adminLocation, adminPage, adminSearch, adminStatusFilter, adminWorkshopFilter]);

  const loadBookingRecords = useCallback(async () => {
    if (!user) {
      setBookingRecords([]);
      return;
    }
    setIsLoadingBookings(true);
    try {
      const path = user.role === "ADMIN"
        ? `/api/admin/workshops/requests?${getAdminRequestQuery()}`
        : "/api/workshops/requests/me";
      const result = await apiRequest(path, { auth: true });
      setBookingRecords(result.requests);
      if (user.role === "ADMIN") {
        setAdminSummary(result.summary);
        setAdminPagination(result.pagination);
      }
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setIsLoadingBookings(false);
    }
  }, [getAdminRequestQuery, user]);

  const exportAdminBookings = async () => {
    try {
      const result = await apiRequest(`/api/admin/workshops/requests?${getAdminRequestQuery(true)}`, { auth: true });
      const columns = [
        ["Customer Name", "full_name"], ["Email", "email"], ["Phone", "phone"],
        ["Workshop", "workshop_title"], ["Theme", "theme"], ["Location", "location"],
        ["Date", "preferred_date"], ["Time", "preferred_time"], ["Participants", "participant_count"],
        ["Purpose", "purpose"], ["Special Requests", "special_requirements"], ["Status", "status"],
      ];
      const escapeCsv = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
      const csv = [
        columns.map(([label]) => escapeCsv(label)).join(","),
        ...result.requests.map((record) => columns.map(([, key]) => escapeCsv(record[key])).join(",")),
      ].join("\r\n");
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `workshop-participants-${adminLocation ? adminLocation.replaceAll(/[^a-z0-9]+/gi, "-").toLowerCase() : "all"}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      setRequestError(error.message);
    }
  };

  useEffect(() => {
    apiRequest("/api/workshops")
      .then((result) => {
        setApiWorkshops(result.workshops);
        setWorkshopThemes(Object.fromEntries(result.workshops.map((item) => [item.title, item.theme || ""])));
      })
      .catch((error) => setRequestError(error.message));
  }, []);

  useEffect(() => {
    loadBookingRecords();
  }, [loadBookingRecords]);

  useEffect(() => {
    setAdminPage(1);
    setExpandedBookingId(null);
  }, [adminLocation, adminSearch, adminWorkshopFilter, adminDateFilter, adminStatusFilter]);

  useEffect(() => {
    setPricePerPerson(String(activeApiWorkshop?.default_price || activeWorkshop.price));
  }, [activeApiWorkshop, activeWorkshop]);

  const saveWorkshopContent = async (workshop, posterFile) => {
    const databaseWorkshop = apiWorkshops.find((item) => item.title === workshop.title);
    if (!databaseWorkshop) {
      setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: "Workshop record is unavailable." }));
      return;
    }
    let posterDataUrl;
    if (posterFile) {
      if (!["image/png", "image/jpeg", "image/webp"].includes(posterFile.type) || posterFile.size > 4 * 1024 * 1024) {
        setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: "Choose a PNG, JPEG, or WebP image under 4 MB." }));
        return;
      }
      posterDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("The poster could not be read."));
        reader.readAsDataURL(posterFile);
      });
    }
    setIsSavingWorkshop(workshop.title);
    setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: "" }));
    try {
      const result = await apiRequest(`/api/admin/workshops/${databaseWorkshop.id}`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({
          theme: workshopThemes[workshop.title] || "",
          ...(posterDataUrl ? { posterDataUrl } : {}),
        }),
      });
      setApiWorkshops((current) => current.map((item) => item.id === result.workshop.id ? result.workshop : item));
      setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: "Saved" }));
    } catch (error) {
      setAdminWorkshopMessage((current) => ({ ...current, [workshop.title]: error.message }));
    } finally {
      setIsSavingWorkshop(null);
    }
  };

  const submitWorkshopRequest = async (payload) => {
    setIsSubmittingRequest(true);
    setRequestError("");
    try {
      const result = await apiRequest("/api/workshops/requests", {
        method: "POST",
        auth: Boolean(user),
        body: JSON.stringify(payload),
      });
      return result.request;
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const handleEnrollmentSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: "/workshops", message: "Log in to request a workshop." } });
      return;
    }
    if (!selectedDate || !selectedTime || !selectedLocation) {
      setRequestError("Please select a date, time, and location.");
      return;
    }
    try {
      await submitWorkshopRequest({
        workshopId: activeApiWorkshop?.id || null,
        fullName: `${user.firstName || ""} ${user.familyName || ""}`.trim() || user.email,
        email: user.email,
        preferredDate: selectedDate.toISOString().slice(0, 10),
        preferredTime: selectedTime,
        location: selectedLocation,
        participantCount,
        purpose: workshopThemes[activeWorkshop.title] || activeWorkshop.title,
        specialRequirements: bookingNotes,
      });
      setIsRequestSubmitted(true);
      await loadBookingRecords();
    } catch (error) {
      setRequestError(error.message);
    }
  };

  const handlePlanRequest = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const requestedTitle = form.get("workshopName");
    const requestedWorkshop = apiWorkshops.find((item) => item.title === requestedTitle);
    try {
      await submitWorkshopRequest({
        workshopId: requestedWorkshop?.id || null,
        fullName: form.get("fullName"),
        email: form.get("email"),
        phone: form.get("phone"),
        preferredDate: form.get("preferredDate") || null,
        preferredTime: form.get("preferredTime"),
        location: form.get("location"),
        participantCount: Number(form.get("participantCount")),
        purpose: form.get("purpose"),
        specialRequirements: form.get("specialRequirements"),
      });
      setIsPlanRequestSubmitted(true);
      await loadBookingRecords();
      formElement.reset();
    } catch (error) {
      setRequestError(error.message);
    }
  };

  return (
    <div className="workshop-page">
      <main className="workshop-main">
        <section className="workshop-header">
          <img
            className="workshop-header-image"
            src={workshopHeader}
            alt=""
            aria-hidden="true"
          />

          <div className="workshop-header-content">
            <h1>
              Book Your
              <br />
              Wellness
              <br />
              Workshop
            </h1>
            <p className="workshop-header-text">
              Explore practical and enjoyable workshops that bring natural wellness
              and meaningful experiences to individuals, groups, and teams.
            </p>
          </div>
          <div className="workshop-booking-action">
            <div>
              <span>Selected workshop</span>
              <strong>{activeWorkshop.title}</strong>
              <small>From €{activeWorkshop.price.toFixed(2)} per participant</small>
            </div>
            <button
              type="button"
              onClick={() =>
                navigate("/checkout?type=workshop", {
                  state: {
                    checkout: {
                      type: "workshop",
                      workshopId: activeApiWorkshop?.id || null,
                      title: activeWorkshop.title,
                      description: activeWorkshop.text,
                      participants: 1,
                      unitPrice: activeWorkshop.price,
                      date: activeWorkshop.date,
                      time: activeWorkshop.time,
                      location: activeWorkshop.location,
                      tax: 0,
                    },
                  },
                })
              }
            >
              Book this workshop
            </button>
          </div>
        </section>

        <section className="workshop-choices" aria-labelledby="workshop-choices-title">
          <h2 id="workshop-choices-title">Discover Our Wellness Workshops</h2>

          <div className="workshop-card-grid">
            {workshops.map((workshop, index) => {
              const Icon = workshop.icon;
              const isActive = activeWorkshop.title === workshop.title;
              const themeInputId = `workshop-theme-${index}`;
              const databaseWorkshop = apiWorkshops.find((item) => item.title === workshop.title);
              const publicTheme = databaseWorkshop?.theme || workshopThemes[workshop.title] || "Theme coming soon";
              const publicPoster = databaseWorkshop?.image_url || workshop.sheet;

              return (
                <article
                  className={`workshop-choice-card ${workshop.color} ${isActive ? "active" : ""}`}
                  key={workshop.title}
                >
                  <button
                    className="workshop-card-select"
                    type="button"
                    onClick={() => {
                      setActiveWorkshop(workshop);
                      if (publicPoster) setOpenWorkshopSheet({ ...workshop, sheet: publicPoster });
                    }}
                  >
                    <span className="workshop-choice-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <strong>{workshop.title}</strong>
                    <span>{workshop.text}</span>
                  </button>

                  <div className="workshop-theme-field">
                    <span className="workshop-theme-icon">
                      <LuPalette aria-hidden="true" />
                    </span>
                    <label htmlFor={user?.role === "ADMIN" ? themeInputId : undefined}>Theme</label>
                    {user?.role === "ADMIN" ? (
                      <>
                        <input
                          id={themeInputId}
                          name={`theme-${index}`}
                          type="text"
                          value={workshopThemes[workshop.title] || ""}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) =>
                            setWorkshopThemes((themes) => ({
                              ...themes,
                              [workshop.title]: event.target.value,
                            }))
                          }
                        />
                        <label className="workshop-poster-upload">
                          <span>Upload poster</span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={(event) => saveWorkshopContent(workshop, event.target.files?.[0])}
                          />
                        </label>
                        <button
                          className="workshop-admin-save"
                          type="button"
                          disabled={isSavingWorkshop === workshop.title}
                          onClick={() => saveWorkshopContent(workshop)}
                        >
                          {isSavingWorkshop === workshop.title ? "Saving…" : "Save theme"}
                        </button>
                        {adminWorkshopMessage[workshop.title] && (
                          <small className="workshop-admin-message">{adminWorkshopMessage[workshop.title]}</small>
                        )}
                      </>
                    ) : (
                      <div className="workshop-theme-value">{publicTheme}</div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <h2 className="workshop-enrollment-title">Workshop Enrollment</h2>

          <div className="workshop-booking-note" role="note">
            <LuLock aria-hidden="true" />
            <span>Please register or log in to book your workshop.</span>
          </div>

          <div className="workshop-booking-area">
            <form
              className="workshop-booking-form"
              onSubmit={handleEnrollmentSubmit}
            >
              <h3>
                <LuCalendarDays aria-hidden="true" />
                Book Your Workshop
              </h3>

              <div className="workshop-form-grid">
                <fieldset className="workshop-radio-group">
                  <legend>Workshop</legend>
                  <div className="workshop-radio-card-grid">
                    {workshops.map((workshop, index) => (
                      <label className="workshop-radio-card" key={workshop.title}>
                        <input
                          type="radio"
                          name="workshop"
                          value={workshop.title}
                          checked={activeWorkshop.title === workshop.title}
                          onChange={() => setActiveWorkshop(workshop)}
                        />
                        <span className="workshop-radio-number" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <strong>{workshop.title}</strong>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="workshop-date-field">
                  <span>Date</span>
                  <button
                    className="workshop-date-trigger"
                    type="button"
                    onClick={() => setIsCalendarOpen((isOpen) => !isOpen)}
                  >
                    {selectedDate ? formatDate(selectedDate) : "dd/mm/yyyy"}
                    <LuCalendarDays aria-hidden="true" />
                  </button>

                  {isCalendarOpen && (
                    <div className="workshop-calendar" role="dialog" aria-label="Select date">
                      <div className="workshop-calendar-header">
                        <strong>{calendarMonthLabel}</strong>
                        <div>
                          <button
                            type="button"
                            aria-label="Previous month"
                            onClick={() =>
                              setCalendarMonth(
                                new Date(
                                  calendarMonth.getFullYear(),
                                  calendarMonth.getMonth() - 1,
                                  1
                                )
                              )
                            }
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            aria-label="Next month"
                            onClick={() =>
                              setCalendarMonth(
                                new Date(
                                  calendarMonth.getFullYear(),
                                  calendarMonth.getMonth() + 1,
                                  1
                                )
                              )
                            }
                          >
                            ›
                          </button>
                        </div>
                      </div>

                      <div className="workshop-calendar-grid">
                        {weekDays.map((day) => (
                          <span key={day}>{day}</span>
                        ))}

                        {calendarDays.map(({ date, isCurrentMonth }) => {
                          const isSelected =
                            selectedDate &&
                            date.toDateString() === selectedDate.toDateString();

                          return (
                            <button
                              className={`${isCurrentMonth ? "" : "muted"} ${
                                isSelected ? "selected" : ""
                              }`}
                              type="button"
                              key={date.toISOString()}
                              onClick={() => {
                                setSelectedDate(date);
                                setIsCalendarOpen(false);
                              }}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </label>

                <label>
                  <span>Time</span>
                  <select
                    value={selectedTime}
                    onChange={(event) => setSelectedTime(event.target.value)}
                  >
                    <option value="" disabled>
                      Select Time
                    </option>
                    <option>9:00 AM - 11:00 AM</option>
                    <option>10:00 AM - 12:00 Noon</option>
                    <option>1:00 PM - 3:00 PM</option>
                    <option>3:00 PM - 5:00 PM</option>
                  </select>
                </label>

                <label>
                  <span>Location</span>
                  <select
                    value={selectedLocation}
                    onChange={(event) => {
                      const location = event.target.value;
                      setSelectedLocation(location);

                      if (!adminLocation) {
                        setAdminLocation(location);
                      }
                    }}
                  >
                    <option value="" disabled>
                      Select Location
                    </option>
                    {workshopLocations.map((location) => (
                      <option key={location}>{location}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Price per Person</span>
                  <input value={`€${Number(pricePerPerson || 0).toFixed(2)}`} readOnly />
                </label>

                <label>
                  <span>Number of Participants</span>
                  <input type="number" min="1" max="100" value={participantCount} onChange={(event) => setParticipantCount(Number(event.target.value))} />
                </label>

                <label className="workshop-notes-field">
                  <span>Notes (Optional)</span>
                  <textarea value={bookingNotes} onChange={(event) => setBookingNotes(event.target.value)} placeholder="Special requests, food and drinks, event details, accessibility needs..." />
                </label>
              </div>

              <p className="workshop-secure-note">
                <LuShieldCheck aria-hidden="true" />
                Your booking is secure and your information is protected with us.
              </p>

              <button className="workshop-pay-btn" type="submit" disabled={isSubmittingRequest}>
                {isSubmittingRequest ? "Submitting…" : "Request Workshop"}
              </button>

              {requestError && <p className="form-error" role="alert">{requestError}</p>}
              {isRequestSubmitted && (
                <p className="workshop-request-success" role="status" aria-live="polite">
                  Thank you for your request! We will contact you soon.
                </p>
              )}
            </form>

            <aside className="workshop-booking-summary" aria-label="Booking summary">
              <h3>Booking Summary</h3>

              <fieldset className="workshop-admin-location">
                <legend>Select Location</legend>
                <div>
                  {workshopLocations.map((location) => (
                    <label key={location}>
                      <input
                        type="radio"
                        name="admin-location"
                        value={location}
                        checked={adminLocation === location}
                        onChange={(event) => setAdminLocation(event.target.value)}
                      />
                      <span>{location}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {user?.role === "ADMIN" && (
                <section className="workshop-admin-participants" aria-label="Participant management">
                  <div className="workshop-admin-totals">
                    <strong>{adminSummary.total_bookings} bookings</strong>
                    <span>{adminSummary.total_participants} participants</span>
                    <span>EUR {Number(adminSummary.total_price || 0).toFixed(2)} total</span>
                  </div>
                  <div className="workshop-admin-filters">
                    <label><span>Find customer</span><input
                        type="search"
                        value={adminSearch}
                        onChange={(event) => setAdminSearch(event.target.value)}
                        placeholder="Name, email, or phone"
                      /></label>
                    <label><span>Workshop</span><select value={adminWorkshopFilter} onChange={(event) => setAdminWorkshopFilter(event.target.value)}>
                        <option value="">All workshops</option>
                        {apiWorkshops.map((workshop) => <option key={workshop.id} value={workshop.id}>{workshop.title}</option>)}
                      </select></label>
                    <label><span>Booking date</span><input type="date" value={adminDateFilter} onChange={(event) => setAdminDateFilter(event.target.value)} /></label>
                    <label><span>Status</span><select value={adminStatusFilter} onChange={(event) => setAdminStatusFilter(event.target.value)}>
                        <option value="">All statuses</option>
                        <option value="SUBMITTED">Submitted</option>
                        <option value="UNDER_REVIEW">Under review</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="WITHDRAWN">Withdrawn</option>
                      </select></label>
                  </div>
                  <button className="workshop-export-btn" type="button" onClick={exportAdminBookings} disabled={!adminSummary.total_bookings}>
                    Export CSV
                  </button>
                </section>
              )}

              {!user && (
                <p className="workshop-summary-empty">Log in to view your saved workshop details.</p>
              )}
              {user && !adminLocation && (
                <p className="workshop-summary-empty">Select a location to view saved workshop details.</p>
              )}
              {isLoadingBookings && <p className="workshop-summary-empty">Loading bookings…</p>}
              {user && adminLocation && !isLoadingBookings && locationBookingRecords.length === 0 && (
                <p className="workshop-summary-empty">
                  {user.role === "ADMIN"
                    ? "No workshop requests have been saved for this location."
                    : "You have no saved workshop requests for this location."}
                </p>
              )}
              {user?.role !== "ADMIN" && locationBookingRecords.map((record) => (
                <dl className="workshop-saved-booking" key={record.id}>
                  <div>
                    <dt>Customer Name</dt>
                    <dd>{record.full_name}</dd>
                  </div>
                  {user?.role === "ADMIN" && (
                    <>
                      <div><dt>Email</dt><dd>{record.email}</dd></div>
                      <div><dt>Phone</dt><dd>{record.phone || "—"}</dd></div>
                    </>
                  )}
                  <div>
                    <dt>Workshop Name</dt>
                    <dd>{record.workshop_title || record.purpose || "Custom workshop"}</dd>
                  </div>
                  <div>
                    <dt>Theme</dt>
                    <dd>{record.theme || record.purpose || "—"}</dd>
                  </div>
                  <div>
                    <dt>Date</dt>
                    <dd>{record.preferred_date ? formatDate(new Date(`${record.preferred_date.slice(0, 10)}T00:00:00`)) : "By arrangement"}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{record.preferred_time || "By arrangement"}</dd>
                  </div>
                  <div>
                    <dt>Number of Participants</dt>
                    <dd>{record.participant_count || "—"}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{record.status === "APPROVED" ? "Approved — payment setup pending" : record.status}</dd>
                  </div>
                  {user?.role === "ADMIN" && (
                    <>
                      <div><dt>Purpose</dt><dd>{record.purpose || "—"}</dd></div>
                      <div><dt>Special Requests</dt><dd>{record.special_requirements || "—"}</dd></div>
                      <div><dt>Status</dt><dd>{record.status}</dd></div>
                    </>
                  )}
                  <div className="summary-total">
                    <dt>Total Price</dt>
                    <dd>{Number(record.total_price) > 0 ? `${record.currency?.trim() || "EUR"} ${Number(record.total_price).toFixed(2)}` : "To be confirmed"}</dd>
                  </div>
                  {record.status === "APPROVED" && (
                    <div className="workshop-customer-payment">
                      <dt>Payment</dt>
                      <dd>
                        <button
                          className="workshop-pay-preview-btn"
                          type="button"
                          onClick={() => navigate("/checkout?type=workshop", {
                            state: {
                              checkout: {
                                type: "workshop",
                                requestId: record.id,
                                workshopId: record.workshop_id,
                                title: record.workshop_title || "Approved Workshop",
                                description: record.theme || record.purpose || "",
                                participants: record.participant_count || 1,
                                unitPrice: Number(record.default_price || 0),
                                date: record.preferred_date ? formatDate(new Date(`${record.preferred_date.slice(0, 10)}T00:00:00`)) : "By arrangement",
                                time: record.preferred_time || "By arrangement",
                                location: record.location,
                                tax: 0,
                                paymentPreview: true,
                              },
                            },
                          })}
                        >
                          Pay Now
                        </button>
                      </dd>
                    </div>
                  )}
                </dl>
              ))}
              {user?.role === "ADMIN" && locationBookingRecords.map((record) => {
                const isExpanded = expandedBookingId === record.id;
                return (
                  <article className="workshop-participant-row" key={record.id}>
                    <button type="button" onClick={() => setExpandedBookingId(isExpanded ? null : record.id)} aria-expanded={isExpanded}>
                      <span><strong>{record.full_name}</strong><small>{record.email}</small></span>
                      <span><strong>{record.participant_count || 0}</strong><small>participants</small></span>
                      <span>{record.preferred_date ? formatDate(new Date(`${record.preferred_date.slice(0, 10)}T00:00:00`)) : "By arrangement"}</span>
                      <span>{isExpanded ? "Hide" : "Details"}</span>
                    </button>
                    {isExpanded && (
                      <dl className="workshop-saved-booking">
                        <div><dt>Phone</dt><dd>{record.phone || "—"}</dd></div>
                        <div><dt>Workshop</dt><dd>{record.workshop_title || "Custom workshop"}</dd></div>
                        <div><dt>Theme</dt><dd>{record.theme || record.purpose || "—"}</dd></div>
                        <div><dt>Time</dt><dd>{record.preferred_time || "By arrangement"}</dd></div>
                        <div><dt>Purpose</dt><dd>{record.purpose || "—"}</dd></div>
                        <div><dt>Special Requests</dt><dd>{record.special_requirements || "—"}</dd></div>
                        <div><dt>Status</dt><dd>{record.status}</dd></div>
                        <div className="summary-total"><dt>Total Price</dt><dd>{Number(record.total_price) > 0 ? `${record.currency?.trim() || "EUR"} ${Number(record.total_price).toFixed(2)}` : "To be confirmed"}</dd></div>
                      </dl>
                    )}
                  </article>
                );
              })}
              {user?.role === "ADMIN" && adminPagination.totalPages > 1 && (
                <nav className="workshop-admin-pagination" aria-label="Participant pages">
                  <button type="button" disabled={adminPage <= 1} onClick={() => setAdminPage((page) => page - 1)}>Previous</button>
                  <span>Page {adminPagination.page} of {adminPagination.totalPages}</span>
                  <button type="button" disabled={adminPage >= adminPagination.totalPages} onClick={() => setAdminPage((page) => page + 1)}>Next</button>
                </nav>
              )}

              <img
                className="workshop-summary-image"
                src={workshopSummaryImage}
                alt=""
                aria-hidden="true"
              />
            </aside>
          </div>

        </section>

        <section className="workshop-plan-section">
          <div className="workshop-visible-gap" aria-hidden="true" />
          <h2 className="workshop-plan-title">Plan Your Workshop</h2>
          <div className="workshop-plan-card-grid">
            {planWorkshopCards.map((card) => (
              <button
                className="workshop-plan-card"
                type="button"
                key={card.title}
                onClick={() => {
                  setOpenWorkshopRequest(card);
                  setIsPlanRequestSubmitted(false);
                }}
              >
                <img src={card.image} alt="" aria-hidden="true" />
                <div className="workshop-plan-card-label">
                  <strong>{card.title}</strong>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {openWorkshopSheet && (
        <div className="modal-backdrop" role="presentation">
          <div className="workshop-sheet-modal" role="dialog" aria-modal="true" aria-labelledby="workshop-sheet-title">
            <button
              className="modal-close workshop-sheet-close"
              type="button"
              aria-label="Close workshop information"
              onClick={() => setOpenWorkshopSheet(null)}
            >
              ×
            </button>

            <img src={openWorkshopSheet.sheet} alt={`${openWorkshopSheet.title} information sheet`} />
          </div>
        </div>
      )}

      {openWorkshopRequest && (
        <div className="modal-backdrop" role="presentation">
          <form
            className="workshop-request-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="workshop-request-title"
            onSubmit={handlePlanRequest}
          >
            <button
              className="modal-close workshop-request-close"
              type="button"
              aria-label="Close workshop request form"
              onClick={() => setOpenWorkshopRequest(null)}
            >
              &times;
            </button>

            <h3 id="workshop-request-title">Request a Workshop</h3>
            <p className="workshop-request-intro">
              Please fill in the details below. After submitting your request, we will review it and contact you by email.
            </p>

            <h4>Customer Details</h4>
            <div className="workshop-request-grid workshop-request-customer-grid">
              <label>
                <span>Full Name</span>
                <input name="fullName" type="text" required defaultValue={user ? `${user.firstName || ""} ${user.familyName || ""}`.trim() : ""} placeholder="Enter your full name" />
              </label>

              <label>
                <span>Phone Number</span>
                <input name="phone" type="tel" placeholder="Enter your phone number" />
              </label>

              <label className="workshop-request-email-field">
                <span>Email Address</span>
                <input name="email" type="email" required defaultValue={user?.email || ""} placeholder="Enter your email address" />
              </label>
            </div>

            <h4 className="workshop-request-section-title">Workshop Details</h4>
            <div className="workshop-request-grid workshop-request-details-grid">
              <fieldset className="workshop-request-name-list">
                <legend>Name of Workshop</legend>
                <div>
                  {planWorkshopCards.map((card) => (
                    <label key={card.title}>
                      <input
                        type="radio"
                        name="workshopName"
                        value={card.title}
                        defaultChecked={openWorkshopRequest.title === card.title}
                      />
                      <span>{card.title}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label>
                <span>Preferred Date</span>
                <input name="preferredDate" type="date" required aria-label="Select date" />
              </label>

              <label className="workshop-request-location-field">
                <span>Preferred Location</span>
                <select name="location" required defaultValue="">
                  <option value="" disabled>
                    Select location
                  </option>
                  {workshopLocations.map((location) => (
                    <option key={location}>{location}</option>
                  ))}
                </select>
              </label>

              <label className="workshop-request-time-field">
                <span>Preferred Time</span>
                <select name="preferredTime" required defaultValue="">
                  <option value="" disabled>
                    Select time
                  </option>
                  <option>9:00 AM - 11:00 AM</option>
                  <option>10:00 AM - 12:00 Noon</option>
                  <option>1:00 PM - 3:00 PM</option>
                  <option>3:00 PM - 5:00 PM</option>
                </select>
              </label>

              <label className="workshop-request-participants-field">
                <span>Number of Participants</span>
                <input
                  className="workshop-participant-input"
                  name="participantCount"
                  type="number"
                  min="1"
                  required
                  placeholder="Enter number of participants"
                />
              </label>
            </div>

            <h4 className="workshop-request-event-title">Event Details</h4>
            <div className="workshop-request-grid workshop-request-event-grid">
              <label>
                <span>Purpose of the Workshop</span>
                <textarea name="purpose" required placeholder="Example: birthday, team building, family gathering, wellness session, business event" />
              </label>

              <section className="workshop-healthy-menu" aria-labelledby="workshop-healthy-menu-title">
                <h5 id="workshop-healthy-menu-title">Our Healthy Menu</h5>
                <div className="workshop-healthy-menu-grid">
                  {orderedHealthyMenuItems.map((item, index) => (
                    <button
                      className={`workshop-healthy-menu-card ${index === 0 ? "is-front" : ""}`}
                      key={item.name}
                      type="button"
                      onClick={() => setFrontHealthyMenuItem(item.name)}
                    >
                      <img src={item.image} alt={item.name} />
                      <div className="workshop-healthy-menu-content">
                        <strong>{item.name}</strong>
                        <span>{item.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <label className="workshop-request-special-field">
                <span>Special Requests</span>
                <textarea name="specialRequirements" placeholder="Example: food and drinks, accessibility needs, language preference, private event requests" />
              </label>
            </div>

            <button className="workshop-request-submit" type="submit" disabled={isSubmittingRequest}>
              {isSubmittingRequest ? "Submitting…" : "Submit Request"}
            </button>

            {requestError && <p className="form-error" role="alert">{requestError}</p>}
            {isPlanRequestSubmitted && (
              <p className="workshop-request-success" role="status" aria-live="polite">
                Thank you! Your workshop request has been submitted successfully. We will contact you soon by email.
              </p>
            )}
          </form>
        </div>
      )}

    </div>
  );
}
