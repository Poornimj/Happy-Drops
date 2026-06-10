import {
  HiOutlineClipboardList,
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineTrendingUp,
  HiOutlineUserGroup,
  HiOutlineCalendar,
} from "react-icons/hi";
import Footer from "../components/Footer";
import confirmedBottle from "../assets/images/auth-confirmed-bottle.png";

const profileBenefits = [
  {
    icon: <HiOutlineSparkles />,
    title: "Personalized wellness recommendations",
    text: "Get tailored suggestions created around your needs.",
  },
  {
    icon: <HiOutlineClipboardList />,
    title: "Save your wellness history",
    text: "Keep track of your journey and past recommendations.",
  },
  {
    icon: <HiOutlineTrendingUp />,
    title: "Track your progress",
    text: "Monitor improvements and achieve your wellness goals.",
  },
  {
    icon: <HiOutlineUserGroup />,
    title: "Manage family profiles",
    text: "Create and manage profiles for your loved ones.",
  },
  {
    icon: <HiOutlineCalendar />,
    title: "Book workshops faster",
    text: "Quick access to workshops that match your interests.",
  },
];

function Signup() {
  return (
    <>
      <main className="profile-page">
        <section className="profile-hero">
          <div>
            <h1>Create Your Wellness Profile</h1>
            <p>
              Combining Eastern wisdom and Western knowledge with a holistic point of view
              and preventive solutions to support you and your family&apos;s wellbeing.
            </p>
          </div>
          <div className="profile-hero-image">
            <span className="lavender-bunch"></span>
            <img src={confirmedBottle} alt="Happy Drops Anti Wrinkle bottle" />
          </div>
        </section>

        <div className="profile-steps" aria-label="Profile steps">
          <div className="profile-step active">
            <span>1</span>
            <p>Personal Information</p>
          </div>
          <div className="profile-step-line"></div>
          <div className="profile-step">
            <span>2</span>
            <p>Wellness Assessment</p>
          </div>
        </div>

        <section className="profile-layout">
          <form className="profile-form">
            <div className="form-section-title">
              <span><HiOutlineUserGroup /></span>
              <h2>1. Personal Information</h2>
            </div>

            <div className="form-grid">
              <label>
                First Name <strong>*</strong>
                <input type="text" placeholder="Enter your first name" />
              </label>
              <label>
                Family Name <strong>*</strong>
                <input type="text" placeholder="Enter your family name" />
              </label>
              <label>
                Email Address <strong>*</strong>
                <input type="email" placeholder="Enter your email" />
              </label>
              <label>
                Phone Number
                <input type="tel" placeholder="+358  Enter your phone number" />
              </label>
              <label>
                Address
                <input type="text" placeholder="Enter your address" />
              </label>
              <label>
                Age
                <input type="number" placeholder="Enter your age" />
              </label>
            </div>

            <div className="form-section-title">
              <span><HiOutlineHeart /></span>
              <h2>2. Wellness Information</h2>
            </div>

            <div className="form-grid">
              <label>
                Current Symptoms <strong>*</strong>
                <select>
                  <option>Select all that apply</option>
                </select>
              </label>
              <label>
                How long have you had these symptoms? <strong>*</strong>
                <select>
                  <option>Select duration</option>
                </select>
              </label>
              <label>
                How often do they occur? <strong>*</strong>
                <select>
                  <option>Select frequency</option>
                </select>
              </label>
              <fieldset>
                <legend>Are you taking any medication?</legend>
                <label className="radio-option"><input type="radio" name="medication" /> Yes</label>
                <label className="radio-option"><input type="radio" name="medication" defaultChecked /> No</label>
              </fieldset>
              <label className="full-width">
                If yes, please specify the medication and reason
                <input type="text" placeholder="Medication name and reason" />
              </label>
              <label>
                Do you have any ongoing illness or medical condition?
                <textarea placeholder="Please describe"></textarea>
              </label>
              <label>
                Do you have any relevant family medical history?
                <textarea placeholder="Please describe"></textarea>
              </label>
              <label>
                What treatments have you already tried?
                <textarea placeholder="Medication, physiotherapy, nutrition plan, essential oils, other"></textarea>
              </label>
              <label>
                Do you have any chronic diseases?
                <textarea placeholder="Please describe"></textarea>
              </label>
              <label className="full-width">
                What are your current wellness goals?
                <input type="text" placeholder="Tell us what you would like to improve in your health and wellbeing" />
              </label>
            </div>

            <div className="language-options">
              <p>Preferred Language</p>
              <label><input type="radio" name="language" defaultChecked /> English</label>
              <label><input type="radio" name="language" /> Finnish</label>
              <label><input type="radio" name="language" /> Chinese</label>
            </div>

            <label className="privacy-check">
              <input type="checkbox" defaultChecked />
              I agree to the <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>
            </label>

            <button className="profile-submit" type="button">Continue to Wellness Assessment</button>
          </form>

          <aside className="profile-benefits">
            <div className="benefits-heading">
              <span><HiOutlineHeart /></span>
              <h2>Why Create a Profile?</h2>
            </div>

            {profileBenefits.map((benefit) => (
              <article key={benefit.title}>
                <span>{benefit.icon}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </article>
            ))}

            <div className="benefits-product">
              <img src={confirmedBottle} alt="Happy Drops Anti Wrinkle bottle" />
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Signup;
