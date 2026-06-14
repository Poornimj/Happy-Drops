import { Routes, Route } from "react-router-dom";
import Knowledge from "./pages/Knowledge";
import Workshops from "./pages/workshops";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Workshops />} />
      <Route path="/knowledge" element={<Knowledge />} />
      <Route path="/workshops" element={<Workshops />} />
    </Routes>
  );
}