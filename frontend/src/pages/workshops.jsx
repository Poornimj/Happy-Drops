import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuBriefcaseBusiness,
  LuCalendarHeart,
  LuLeaf,
  LuSoup,
} from "react-icons/lu";
import workshopHeader from "../assets/images/workshop-header.png";
import workshopEssentialOil from "../assets/images/workshops-essential-oil.png";

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
    text: "A personalized wellness experience for birthdays, celebrations, family gatherings, and special occasions.",
    icon: LuCalendarHeart,
    color: "rose",
    price: 65,
    date: "By arrangement",
    time: "Flexible",
    location: "Your chosen venue",
  },
  {
    title: "Business Wellness Workshop",
    text: "Wellness activities designed for business meetings, team days, and workplace wellbeing.",
    icon: LuBriefcaseBusiness,
    color: "gold",
    price: 48,
    date: "By arrangement",
    time: "Flexible",
    location: "Company venue or Happy Drops Studio",
  },
];

export default function Workshops() {
  const navigate = useNavigate();
  const [activeWorkshop, setActiveWorkshop] = useState(workshops[0]);
  const [openWorkshopSheet, setOpenWorkshopSheet] = useState(null);

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

            <h3 id="workshop-sheet-title">{openWorkshopSheet.title}</h3>
            <img src={openWorkshopSheet.sheet} alt={`${openWorkshopSheet.title} information sheet`} />
          </div>
        </div>
      )}

    </div>
  );
}
