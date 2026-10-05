"use client";

import React, { useEffect, useState } from "react";
import AnimatedCursor from "react-animated-cursor";

export default function CustomAnimatedCursor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on devices with a mouse/trackpad (pointer: fine)
    const hasFinePointer = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
    if (hasFinePointer) {
      setMounted(true);
    }
  }, []);

  if (!mounted) return null;

  return (
    <AnimatedCursor
      innerSize={8}
      outerSize={38}
      color="255, 255, 255"
      outerAlpha={0.2}
      innerScale={1.1}
      outerScale={1.6}
      trailingSpeed={11}
      innerStyle={{
        backgroundColor: "#ffffff",
        boxShadow: "0 0 12px rgba(255, 255, 255, 0.9)",
      }}
      outerStyle={{
        border: "1.5px solid rgba(255, 255, 255, 0.75)",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 0 16px rgba(255, 255, 255, 0.15)",
      }}
      clickables={[
        "a",
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        "label[for]",
        "select",
        "textarea",
        "button",
        ".link",
        '[role="button"]',
      ]}
    />
  );
}
