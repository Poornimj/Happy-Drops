import { useEffect, useRef, useState } from "react";

function useScrollReveal(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    ...options,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, defaultOptions);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [defaultOptions]);

  return [ref, isVisible];
}

export default useScrollReveal;
