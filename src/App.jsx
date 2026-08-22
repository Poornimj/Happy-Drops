import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WorkshopSignup from "./pages/WorkshopSignup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Welcome from "./pages/Welcome";
import WellnessAssessmentModal from "./components/WellnessAssessmentModal";
import AboutUs from "./pages/AboutUs";
import Knowledge from "./pages/Knowledge";
import Workshops from "./pages/workshops";
import Supplier from "./pages/Supplier";
import Checkout from "./pages/Checkout";
import PaymentResult from "./pages/PaymentResult";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/CategoryPage";
import FoodRelated from "./pages/FoodRelated";
import Cart from "./pages/Cart";
import CustomerCare from "./pages/CustomerCare";
import { MyProfile, TrackOrder, Wishlist } from "./pages/AccountPages";

const routerBasename = import.meta.env.BASE_URL === "/"
  ? undefined
  : import.meta.env.BASE_URL.replace(/\/$/, "");

const simplePages = {
  "/therapists": {
    kicker: "Expert Guidance",
    title: "Therapists",
    text: "Connect with wellness professionals who support natural, practical care.",
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

function ProtectedRoute({ children }) {
  const { user, isCheckingSession } = useAuth();
  const location = useLocation();
  if (isCheckingSession) return <main className="page-container"><p>Checking your account…</p></main>;
  if (!user) {
    return <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}`, message: "Log in to access your account." }} />;
  }
  return children;
}

function AssessmentRoute() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <WellnessAssessmentModal
      isOpen
      onClose={() => navigate(user ? "/my-profile" : "/")}
    />
  );
}

function AppShell() {
  const location = useLocation();

  return (
    <>
      <Navbar currentPath={location.pathname.toLowerCase()} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/wellness-assessment" element={<AssessmentRoute />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workshop-register" element={<WorkshopSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/suppliers" element={<Supplier />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment/success" element={<PaymentResult />} />
        <Route path="/payment/cancelled" element={<PaymentResult cancelled />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:id" element={<ProductDetails />} />
        <Route path="/shop/category/:categoryName" element={<CategoryPage />} />
        <Route path="/shop/food-related" element={<FoodRelated />} />
        <Route path="/shipping-delivery" element={<CustomerCare type="shipping" />} />
        <Route path="/privacy-policy" element={<CustomerCare type="privacy" />} />
        <Route path="/terms-conditions" element={<CustomerCare type="terms" />} />
        <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/track-order" element={<TrackOrder />} />
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
    <Router basename={routerBasename}>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </Router>
  );
}

export default App;
