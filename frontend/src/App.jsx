import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import WellnessAssessmentModal from "./components/WellnessAssessmentModal";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import Knowledge from "./pages/Knowledge";
import Workshops from "./pages/workshops";

const simplePages = {
  "/shop": {
    kicker: "Natural Wellness Shop",
    title: "Shop",
    text: "Browse Happy Drops products, wellness essentials, and natural care items.",
  },
  "/therapists": {
    kicker: "Expert Guidance",
    title: "Therapists",
    text: "Connect with wellness professionals who support natural, practical care.",
  },
  "/suppliers": {
    kicker: "Trusted Partners",
    title: "Suppliers",
    text: "Learn about the partners who help us bring nature-powered wellness to more families.",
  },
  "/shipping-delivery": {
    kicker: "Customer Care",
    title: "Shipping & Delivery",
    text: "Find delivery information, pickup details, and order support for Happy Drops products.",
  },
  "/privacy-policy": {
    kicker: "Customer Care",
    title: "Privacy Policy",
    text: "Review how Happy Drops protects customer information and wellness profile details.",
  },
  "/terms-conditions": {
    kicker: "Customer Care",
    title: "Terms & Conditions",
    text: "Read the terms for using Happy Drops services, workshops, recommendations, and purchases.",
  },
  "/wishlist": {
    kicker: "My Account",
    title: "Wishlist",
    text: "Save products, workshops, and wellness ideas you want to revisit later.",
  },
  "/track-order": {
    kicker: "My Account",
    title: "Track Order",
    text: "Follow your order status, recipe progress, and pickup details in one place.",
  },
};

function SimpleRoutePage({ kicker, title, text }) {
  return (
    <main className="placeholder-page page-container">
      <section className="placeholder-hero">
        <p className="section-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </section>
    </main>
  );
}

function AppShell() {
  const location = useLocation();

  return (
    <>
      <Navbar currentPath={location.pathname.toLowerCase()} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/wellness-assessment" element={<WellnessAssessmentModal />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/workshops" element={<Workshops />} />
        {Object.entries(simplePages).map(([path, page]) => (
          <Route key={path} path={path} element={<SimpleRoutePage {...page} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
