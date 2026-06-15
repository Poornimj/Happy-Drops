import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import AboutUs from "./pages/AboutUs";
import Knowledge from "./pages/Knowledge";
import Workshops from "./pages/workshops";

const routes = {
  "/": Welcome,
  "/about-us": AboutUs,
  "/signup": Signup,
  "/knowledge": Knowledge,
  "/workshops": Workshops,
};

function getCurrentPath() {
  return window.location.pathname.toLowerCase();
}

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);
  const Page = routes[currentPath] ?? Welcome;

  useEffect(() => {
    const updatePath = () => setCurrentPath(getCurrentPath());

    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  return (
    <>
      <Navbar currentPath={currentPath} />
      <Page />
      <Footer />
    </>
  );
}

export default App;
