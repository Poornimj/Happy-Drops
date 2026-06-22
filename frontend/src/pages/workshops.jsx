import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuBriefcaseBusiness,
  LuCalendarDays,
  LuCalendarHeart,
  LuLeaf,
  LuLock,
  LuShieldCheck,
  LuSoup,
} from "react-icons/lu";
import workshopHeader from "../assets/images/workshop-header.png";
import workshopEssentialOil from "../assets/images/workshops-essential-oil.png";
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
    text: "Enjoy a hands-on dumpling-making experience while learning simple nutrition tips for better wellbeing.",
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const calendarDays = getCalendarDays(calendarMonth);
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
              Experience nature-powered wellness with personalized workshops for
              groups, families, and organizations.
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
          <h2 id="workshop-choices-title">Choose Your Workshop</h2>

          <div className="workshop-card-grid">
            {workshops.map((workshop) => {
              const Icon = workshop.icon;
              const isActive = activeWorkshop.title === workshop.title;

              return (
                <button
                  className={`workshop-choice-card ${workshop.color} ${isActive ? "active" : ""}`}
                  type="button"
                  key={workshop.title}
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
              );
            })}
          </div>

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
                  <div>
                    {workshops.map((workshop) => (
                      <label key={workshop.title}>
                        <input
                          type="radio"
                          name="workshop"
                          value={workshop.title}
                          checked={activeWorkshop.title === workshop.title}
                          onChange={() => setActiveWorkshop(workshop)}
                        />
                        {workshop.title}
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
                  <select defaultValue="">
                    <option value="" disabled>
                      Select Time
                    </option>
                    <option>9:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 1:00 PM</option>
                    <option>1:00 PM - 3:00 PM</option>
                    <option>3:00 PM - 5:00 PM</option>
                    <option>5:00 PM - 7:00 PM</option>
                    <option>7:00 PM - 9:00 PM</option>
                  </select>
                </label>

                <label>
                  <span>Location</span>
                  <select defaultValue="">
                    <option value="" disabled>
                      Select Location
                    </option>
                    <option>Rautatiekatu 16A, Kamppi</option>
                    <option>Pilvijärventie 50 C, Kirkkonummi</option>
                    <option>
                      Villa Stenberg, Suoniementaival 164, 08350 Lohja
                    </option>
                    <option>
                      XR Center, Hämeentie 135 A, 00560 Helsinki
                    </option>
                  </select>
                </label>

                <label>
                  <span>Notes (Optional)</span>
                  <textarea placeholder="Special requests, food and drinks, event details, accessibility needs..." />
                </label>
              </div>

              <p className="workshop-secure-note">
                <LuShieldCheck aria-hidden="true" />
                Your booking is secure and your information is protected with us.
              </p>

              <button className="workshop-pay-btn" type="submit">
                Request for Workshops
              </button>

              {isRequestSubmitted && (
                <p className="workshop-request-success" role="status" aria-live="polite">
                  Thank you for your request! We will contact you soon.
                </p>
              )}
            </form>

            <aside className="workshop-booking-summary" aria-label="Booking summary">
              <h3>Booking Summary</h3>

              <dl>
                <div>
                  <dt>Workshop</dt>
                  <dd></dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd></dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd></dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd></dd>
                </div>
                <div>
                  <dt>Notes</dt>
                  <dd></dd>
                </div>
                <div className="summary-total">
                  <dt>Total</dt>
                  <dd></dd>
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

    </div>
  );
}
