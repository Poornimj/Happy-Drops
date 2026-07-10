import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const calendarDays = getCalendarDays(calendarMonth);
  const summaryMatchesLocation =
    adminLocation && selectedLocation === adminLocation;
  const totalPrice = Number(pricePerPerson || 0);
  const calendarMonthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(calendarMonth);

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

                      if (workshop.sheet) {
                        setOpenWorkshopSheet(workshop);
                      }
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
                    <label htmlFor={themeInputId}>Theme</label>
                    <input
                      id={themeInputId}
                      name={`theme-${index}`}
                      type="text"
                      value={workshopThemes[workshop.title] || ""}
                      onChange={(event) =>
                        setWorkshopThemes((themes) => ({
                          ...themes,
                          [workshop.title]: event.target.value,
                        }))
                      }
                    />
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
              onSubmit={(event) => {
                event.preventDefault();
                setIsRequestSubmitted(true);
              }}
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
                  <select
                    value={pricePerPerson}
                    onChange={(event) => setPricePerPerson(event.target.value)}
                  >
                    <option value="" disabled>
                      Select Price
                    </option>
                    <option value="40">€40</option>
                    <option value="60">€60</option>
                    <option value="80">€80</option>
                    <option value="100">€100</option>
                  </select>
                </label>

                <label className="workshop-notes-field">
                  <span>Notes (Optional)</span>
                  <textarea placeholder="Special requests, food and drinks, event details, accessibility needs..." />
                </label>
              </div>

              <p className="workshop-secure-note">
                <LuShieldCheck aria-hidden="true" />
                Your booking is secure and your information is protected with us.
              </p>

              <button className="workshop-pay-btn" type="submit">
                Request Workshop
              </button>

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

              <dl>
                <div>
                  <dt>Customer Name</dt>
                  <dd>—</dd>
                </div>
                <div>
                  <dt>Workshop Name</dt>
                  <dd>{summaryMatchesLocation ? activeWorkshop.title : "—"}</dd>
                </div>
                <div>
                  <dt>Theme</dt>
                  <dd>
                    {summaryMatchesLocation
                      ? workshopThemes[activeWorkshop.title] || "—"
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>
                    {summaryMatchesLocation && selectedDate
                      ? formatDate(selectedDate)
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{summaryMatchesLocation ? selectedTime || "—" : "—"}</dd>
                </div>
                <div>
                  <dt>Number of Participants</dt>
                  <dd>—</dd>
                </div>
                <div className="summary-total">
                  <dt>Total Price</dt>
                  <dd>
                    {summaryMatchesLocation && totalPrice
                      ? `€${totalPrice.toFixed(2)}`
                      : "—"}
                  </dd>
                </div>
              </dl>

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
            onSubmit={(event) => {
              event.preventDefault();
              setIsPlanRequestSubmitted(true);
            }}
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
                <input type="text" placeholder="Enter your full name" />
              </label>

              <label>
                <span>Phone Number</span>
                <input type="tel" placeholder="Enter your phone number" />
              </label>

              <label className="workshop-request-email-field">
                <span>Email Address</span>
                <input type="email" placeholder="Enter your email address" />
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
                        name="request-workshop-name"
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
                <input type="date" aria-label="Select date" />
              </label>

              <label className="workshop-request-location-field">
                <span>Preferred Location</span>
                <select defaultValue="">
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
                <select defaultValue="">
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
                  type="number"
                  min="1"
                  placeholder="Enter number of participants"
                />
              </label>
            </div>

            <h4 className="workshop-request-event-title">Event Details</h4>
            <div className="workshop-request-grid workshop-request-event-grid">
              <label>
                <span>Purpose of the Workshop</span>
                <textarea placeholder="Example: birthday, team building, family gathering, wellness session, business event" />
              </label>

              <label className="workshop-request-special-field">
                <span>Special Requests</span>
                <textarea placeholder="Example: food and drinks, accessibility needs, language preference, private event requests" />
              </label>
            </div>

            <button className="workshop-request-submit" type="submit">
              Submit Request
            </button>

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
