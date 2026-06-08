import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WellnessSection from "../components/WellnessSection";
import StorySection from "../components/StorySection";
import HowItWorks from "../components/HowItWorks";
import ProductsSection from "../components/ProductsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

function Welcome() {
  return (
    <>
      <Navbar />

      <Hero />
      <WellnessSection />
      <StorySection />
      <HowItWorks />
      <ProductsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}

export default Welcome;