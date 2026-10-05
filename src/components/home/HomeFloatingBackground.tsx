"use client";

import dynamic from "next/dynamic";

const FloatingLines = dynamic(() => import("@/components/reactbits/FloatingLines"), {
  ssr: false,
});

const FLOATING_LINES_GRADIENT = ["#0e3775", "#024282", "#0284c7", "#38bdf8", "#0e3775"];
const FLOATING_LINES_COUNT = [5, 6, 5];
const FLOATING_LINES_DISTANCE = [8, 7, 8];
const TOP_WAVE_POS = { x: 8.0, y: 0.65, rotate: -0.3 };
const MIDDLE_WAVE_POS = { x: 4.0, y: -0.2, rotate: 0.15 };
const BOTTOM_WAVE_POS = { x: 2.0, y: -0.75, rotate: 0.3 };

export default function HomeFloatingBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <FloatingLines
        linesGradient={FLOATING_LINES_GRADIENT}
        backgroundColor="#001124"
        lineCount={FLOATING_LINES_COUNT}
        lineDistance={FLOATING_LINES_DISTANCE}
        topWavePosition={TOP_WAVE_POS}
        middleWavePosition={MIDDLE_WAVE_POS}
        bottomWavePosition={BOTTOM_WAVE_POS}
        animationSpeed={0.7}
        interactive={true}
        bendRadius={5.0}
        bendStrength={-0.45}
        parallax={true}
        parallaxStrength={0.2}
        mixBlendMode="screen"
      />
    </div>
  );
}
