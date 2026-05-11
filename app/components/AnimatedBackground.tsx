"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seed = () => {
      const count = window.innerWidth < 768 ? 28 : 46;
      particlesRef.current = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: 1.1 + Math.random() * 2.2,
        hue: [199, 159, 38][index % 3],
      }));
    };

    const paint = () => {
      const isDark = document.documentElement.classList.contains("dark");
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
      if (isDark) {
        gradient.addColorStop(0, "rgba(9, 17, 30, 0.94)");
        gradient.addColorStop(0.55, "rgba(7, 12, 22, 0.96)");
        gradient.addColorStop(1, "rgba(11, 20, 18, 0.94)");
      } else {
        gradient.addColorStop(0, "rgba(247, 244, 237, 0.94)");
        gradient.addColorStop(0.5, "rgba(250, 250, 247, 0.96)");
        gradient.addColorStop(1, "rgba(236, 244, 241, 0.94)");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current.forEach((particle, index) => {
        if (!reduceMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -20) particle.x = window.innerWidth + 20;
          if (particle.x > window.innerWidth + 20) particle.x = -20;
          if (particle.y < -20) particle.y = window.innerHeight + 20;
          if (particle.y > window.innerHeight + 20) particle.y = -20;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `hsla(${particle.hue}, 90%, 66%, 0.28)`
          : `hsla(${particle.hue}, 70%, 39%, 0.18)`;
        ctx.fill();

        for (let j = index + 1; j < particlesRef.current.length; j += 1) {
          const other = particlesRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 145) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = isDark
              ? `rgba(125, 211, 252, ${0.09 * (1 - distance / 145)})`
              : `rgba(37, 99, 235, ${0.08 * (1 - distance / 145)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      if (!reduceMotion) frameRef.current = requestAnimationFrame(paint);
    };

    resize();
    seed();
    paint();

    window.addEventListener("resize", () => {
      resize();
      seed();
    });

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />;
}
