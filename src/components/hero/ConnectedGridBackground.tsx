"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	color: string;
	baseOpacity: number;
}

const COLORS = ["#0e3775", "#38bdf8"]; // brand secondary and accent

export default function ConnectedGridBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let particles: Particle[] = [];
		let animationFrameId: number;
		let width = 0;
		let height = 0;
		let resizeTimeout: ReturnType<typeof setTimeout>;

		const mouse = { x: -9999, y: -9999 };

		const init = () => {
			// Use offsetParent dimensions to avoid layout shift
			width = window.innerWidth;
			height = window.innerHeight;

			// Set canvas intrinsic size without triggering reflow on the parent
			canvas.width = width;
			canvas.height = height;

			particles = [];
			// Slightly denser but still performant
			const numParticles = Math.min(Math.floor((width * height) / 12000), 110);

			for (let i = 0; i < numParticles; i++) {
				particles.push({
					x: Math.random() * width,
					y: Math.random() * height,
					vx: (Math.random() - 0.5) * 0.45,
					vy: (Math.random() - 0.5) * 0.45,
					radius: Math.random() * 1.8 + 0.8,
					color: COLORS[Math.floor(Math.random() * COLORS.length)],
					// Pre-assign stable base opacity to avoid per-frame random flicker
					baseOpacity: Math.random() * 0.25 + 0.25,
				});
			}
		};

		const draw = () => {
			ctx.clearRect(0, 0, width, height);

			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];

				// Mouse repel — smooth attraction falloff
				const dx = mouse.x - p.x;
				const dy = mouse.y - p.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < 180 && dist > 0) {
					const angle = Math.atan2(dy, dx);
					const force = (180 - dist) / 180;
					p.x -= Math.cos(angle) * force * 2.5;
					p.y -= Math.sin(angle) * force * 2.5;
				}

				p.x += p.vx;
				p.y += p.vy;

				// Soft wrapping — particles smoothly appear on the opposite edge
				if (p.x < -10) p.x = width + 10;
				else if (p.x > width + 10) p.x = -10;
				if (p.y < -10) p.y = height + 10;
				else if (p.y > height + 10) p.y = -10;

				// Dot — stable opacity (no per-frame Math.random)
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = p.color;
				ctx.globalAlpha = p.baseOpacity;
				ctx.fill();

				// Connection lines — only drawn for nearest neighbours
				for (let j = i + 1; j < particles.length; j++) {
					const p2 = particles[j];
					const d2 = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;

					if (d2 < 14400) {
						// 120^2 — avoids expensive sqrt
						const d = Math.sqrt(d2);
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
						ctx.lineTo(p2.x, p2.y);
						ctx.strokeStyle = p.color;
						ctx.lineWidth = 0.6;
						ctx.globalAlpha = (1 - d / 120) * 0.35;
						ctx.stroke();
					}
				}
			}

			ctx.globalAlpha = 1;
			animationFrameId = requestAnimationFrame(draw);
		};

		init();
		draw();

		// Debounce resize so canvas doesn't rebuild on every pixel of resize
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(init, 120);
		};

		const handleMouseMove = (e: MouseEvent) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};
		const handleMouseLeave = () => {
			mouse.x = -9999;
			mouse.y = -9999;
		};

		window.addEventListener("resize", handleResize);
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseleave", handleMouseLeave);
			cancelAnimationFrame(animationFrameId);
			clearTimeout(resizeTimeout);
		};
	}, []);

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-auto">
			<canvas ref={canvasRef} className="block w-full h-full" />

			{/* Multi-stop vignette — keeps particles visible at periphery but fades
          them toward the hero content area so text always pops */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						"radial-gradient(ellipse 80% 60% at 50% 50%, transparent 10%, rgba(1,53,101,0.55) 55%, rgba(1,53,101,0.92) 100%)",
				}}
			/>

			{/* Secondary top-bottom gradient to further boost legibility */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						"linear-gradient(to bottom, rgba(1,53,101,0.55) 0%, transparent 25%, transparent 75%, rgba(1,53,101,0.8) 100%)",
				}}
			/>
		</div>
	);
}
