import { useEffect, useRef, useState } from "react";

function useScrollReveal(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const threshold = options.threshold ?? 0.1;
  const rootMargin = options.rootMargin ?? "0px 0px -50px 0px";

  useEffect(() => {
    const observerOptions = { threshold, rootMargin };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, observerOptions);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin, threshold]);

  return [ref, isVisible];
}

export default useScrollReveal;
