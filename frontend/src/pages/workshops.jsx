import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import workshopHeader from "../assets/images/workshop-header.png";
import "../index.css";

export default function Workshops() {
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
      </main>

      <Footer />
    </div>
  );
}
