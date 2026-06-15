import { useState } from "react";
import {
  LuBriefcaseBusiness,
  LuCalendarHeart,
  LuLeaf,
  LuSoup,
} from "react-icons/lu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import workshopHeader from "../assets/images/workshop-header.png";
import workshopEssentialOil from "../assets/images/workshops-essential-oil.png";
import "../index.css";

const workshops = [
  {
    title: "Essential Oil Workshop",
    text: "Learn how essential oils can support common wellness questions in a natural and practical way.",
    icon: LuLeaf,
    color: "green",
    sheet: workshopEssentialOil,
  },
  {
    title: "Dumpling DIY + Nutrition Workshop",
    text: "Enjoy a hands-on dumpling-making experience while learning simple nutrition tips for better wellbeing.",
    icon: LuSoup,
    color: "purple",
  },
  {
    title: "Special Event Workshop",
    text: "A personalized wellness experience for birthdays, celebrations, family gatherings, and special occasions.",
    icon: LuCalendarHeart,
    color: "rose",
  },
  {
    title: "Business Wellness Workshop",
    text: "Wellness activities designed for business meetings, team days, and workplace wellbeing.",
    icon: LuBriefcaseBusiness,
    color: "gold",
  },
];

export default function Workshops() {
  const [activeWorkshop, setActiveWorkshop] = useState(workshops[0]);
  const [openWorkshopSheet, setOpenWorkshopSheet] = useState(null);

  return (
    <div className="workshop-page">
      <Navbar />

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

      <Footer />
    </div>
  );
}
