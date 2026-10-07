"use client";

import React, { useRef, useState, useEffect } from "react";
import Footer from "./Footer";

export default function StickyFooterReveal() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateHeight = () => {
      // On mobile viewports, footer is in normal document flow - no sticky calculation needed
      if (window.innerWidth < 768) {
        setHeight(0);
        return;
      }

      if (footerRef.current) {
        // Measure unconstrained bounding box and scrollHeight on desktop
        const rectHeight = footerRef.current.getBoundingClientRect().height;
        const scrollHeight = footerRef.current.scrollHeight;
        const finalHeight = Math.ceil(Math.max(rectHeight, scrollHeight));
        if (finalHeight > 0) {
          setHeight(finalHeight);
        }
      }
    };

    updateHeight();

    const ro = new ResizeObserver(() => {
      if (window.innerWidth >= 768) {
        updateHeight();
      }
    });

    if (footerRef.current) {
      ro.observe(footerRef.current);
    }
    window.addEventListener("resize", updateHeight);

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

  return (
    <>
      {/* ── Mobile Viewports (< 768px): Normal document flow, 0 margin/spacer, standard relative positioning ── */}
      <div className="block md:hidden relative z-10 w-full">
        <Footer />
      </div>

      {/* ── Desktop Viewports (>= 768px): Sticky Footer Reveal ── */}
      <div
        className="hidden md:block relative w-full"
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
    </>
  );
}
