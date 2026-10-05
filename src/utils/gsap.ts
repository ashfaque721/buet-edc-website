"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger exactly once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// React 18+ strict mode safe hook for GSAP
export const useGsapContext = (scope: React.RefObject<HTMLElement | null>) => {
  // useLayoutEffect is better for GSAP to avoid flashes, but fallback to useEffect for SSR
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;
    
    const ctx = gsap.context(() => {}, scope);
    
    return () => ctx.revert();
  }, [scope]);
};
