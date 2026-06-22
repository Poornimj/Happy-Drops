import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import WellnessAssessmentModal from "./components/WellnessAssessmentModal";
import AboutUs from "./pages/AboutUs";
import Knowledge from "./pages/Knowledge";
import Workshops from "./pages/workshops";
import Supplier from "./pages/Supplier";
import Checkout from "./pages/Checkout";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/CategoryPage";
import FoodRelated from "./pages/FoodRelated";

const simplePages = {
  "/therapists": {
    kicker: "Expert Guidance",
    title: "Therapists",
    text: "Connect with wellness professionals who support natural, practical care.",
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/suppliers" element={<Supplier />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:id" element={<ProductDetails />} />
        <Route path="/shop/category/:categoryName" element={<CategoryPage />} />
        <Route path="/shop/food-related" element={<FoodRelated />} />
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
