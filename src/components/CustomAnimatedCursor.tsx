"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomAnimatedCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Positions for smooth lerping
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on devices with a mouse/trackpad
    if (typeof window === "undefined") return;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantly position the inner dot wrapper
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest(
            'a, button, input, select, textarea, label[for], [role="button"], .link, [tabindex]:not([tabindex="-1"])'
          )
        );
        setIsHovered(isClickable);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });

    // Smooth animation loop for the trailing outer ring
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const renderLoop = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Inner Dot Positioner */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 will-change-transform"
      >
        <div
          className="h-2 w-2 -ml-1 -mt-1 rounded-full bg-white transition-transform duration-150 ease-out"
          style={{
            boxShadow: "0 0 12px rgba(255, 255, 255, 0.95)",
            transform: isClicked ? "scale(0.7)" : isHovered ? "scale(1.2)" : "scale(1)",
          }}
        />
      </div>

      {/* Outer Ring Positioner */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 will-change-transform"
      >
        <div
          className="h-[38px] w-[38px] -ml-[19px] -mt-[19px] rounded-full"
          style={{
            border: "1.5px solid rgba(255, 255, 255, 0.75)",
            backgroundColor: isHovered
              ? "rgba(255, 255, 255, 0.15)"
              : "rgba(255, 255, 255, 0.06)",
            boxShadow: isHovered
              ? "0 0 20px rgba(255, 255, 255, 0.35)"
              : "0 0 16px rgba(255, 255, 255, 0.15)",
            transform: isClicked
              ? "scale(0.85)"
              : isHovered
              ? "scale(1.6)"
              : "scale(1)",
            transition:
              "transform 200ms cubic-bezier(0.25, 1, 0.5, 1), background-color 200ms ease, box-shadow 200ms ease",
          }}
        />
      </div>
    </div>
  );
}
