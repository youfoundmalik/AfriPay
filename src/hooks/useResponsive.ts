import { useEffect, useState } from "react";

// Tailwind breakpoints, kept in sync with tailwind.config.js defaults
const BREAKPOINTS = {
  xs: 0,
  sm: 640, // >= 640px
  md: 768, // >= 768px
  lg: 1024, // >= 1024px
  xl: 1280, // >= 1280px
};

export function useResponsive() {
  const getMatches = () => ({
    xs: true, // always true - every screen is at least xs
    sm: window.matchMedia(`(min-width: ${BREAKPOINTS.sm}px)`).matches,
    md: window.matchMedia(`(min-width: ${BREAKPOINTS.md}px)`).matches,
    lg: window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`).matches,
    xl: window.matchMedia(`(min-width: ${BREAKPOINTS.xl}px)`).matches,
  });

  const [matches, setMatches] = useState(getMatches());

  useEffect(() => {
    // If the viewport resizes, update our matches
    const onResize = () => setMatches(getMatches());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return matches;
}
