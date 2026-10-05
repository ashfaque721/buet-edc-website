"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shimmerWidth?: number;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = "",
  shimmerWidth = 100,
}: ShinyTextProps) {
  const animationStyle = {
    backgroundImage: `linear-gradient(120deg, transparent 0%, transparent calc(50% - ${shimmerWidth / 2}px), rgba(255,255,255,0.7) 50%, transparent calc(50% + ${shimmerWidth / 2}px), transparent 100%)`,
    backgroundSize: "250% 100%",
    animation: disabled ? "none" : `shiny-text ${speed}s linear infinite`,
  };

  return (
    <>
      <style>{`
        @keyframes shiny-text {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
      <span
        className={`bg-clip-text text-transparent ${className}`}
        style={{
          ...animationStyle,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {text}
      </span>
    </>
  );
}
