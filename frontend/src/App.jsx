import { Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SimplePage from "./pages/SimplePage.jsx";
import FoodRelated from "./pages/FoodRelated.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Shop />} /> 
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      

      <Route path="/knowledge" element={<SimplePage title="Knowledge" />} />
      <Route path="/workshops" element={<SimplePage title="Workshops" />} />
      <Route path="/therapists" element={<SimplePage title="Therapists" />} />
      <Route path="/suppliers" element={<SimplePage title="Suppliers" />} />
      <Route path="/about" element={<SimplePage title="About Us" />} />
      <Route path="/login" element={<SimplePage title="Login / Sign Up" />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/food-related" element={<FoodRelated />} />
    </Routes>
  );
}

export default App;