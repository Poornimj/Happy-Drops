import Hero from "../components/Hero";
import WellnessSection from "../components/WellnessSection";
import StorySection from "../components/StorySection";
import HowItWorks from "../components/HowItWorks";
import ProductsSection from "../components/ProductsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";

function Welcome() {
  return (
    <>
      <Hero />
      <WellnessSection />
      <StorySection />
      <HowItWorks />
      <ProductsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

export default Welcome;
