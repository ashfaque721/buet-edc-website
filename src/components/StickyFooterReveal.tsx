"use client";

import React, { useRef, useState, useEffect } from "react";
import Footer from "./Footer";

export default function StickyFooterReveal() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateHeight = () => {
      if (footerRef.current) {
        // Measure the unconstrained scrollHeight and bounding box of the footer
        const rectHeight = footerRef.current.getBoundingClientRect().height;
        const scrollHeight = footerRef.current.scrollHeight;
        const finalHeight = Math.ceil(Math.max(rectHeight, scrollHeight));
        if (finalHeight > 0) {
          setHeight(finalHeight);
        }
      }
    };

    updateHeight();

    const ro = new ResizeObserver(updateHeight);
    if (footerRef.current) {
      ro.observe(footerRef.current);
    }
    window.addEventListener("resize", updateHeight);

    // Call after delays to ensure web fonts and layout recalculations are captured
    const rafId = requestAnimationFrame(updateHeight);
    const timer1 = setTimeout(updateHeight, 250);
    const timer2 = setTimeout(updateHeight, 600);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <Footer />;
  }

  return (
    <div
      className="relative w-full"
      style={{
        height: height > 0 ? `${height}px` : "auto",
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <div
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full z-0 h-auto pointer-events-auto"
        style={{
          visibility: height > 0 ? "visible" : "hidden",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}
