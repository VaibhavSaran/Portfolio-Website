"use client";

import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const blobsRef = useRef<Blob[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      // Static dark gradient fallback
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.04)");
      gradient.addColorStop(0.5, "rgba(168, 85, 247, 0.03)");
      gradient.addColorStop(1, "rgba(59, 130, 246, 0.02)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return () => window.removeEventListener("resize", resize);
    }

    const isMobile = window.innerWidth < 768;
    const rMul = isMobile ? 0.5 : 0.38;

    // Initialize soft color blobs
    blobsRef.current = [
      {
        x: canvas.width * 0.25,
        y: canvas.height * 0.3,
        vx: 0.35,
        vy: 0.25,
        radius: canvas.width * rMul,
        color: "rgba(99, 102, 241, 0.07)",
      },
      {
        x: canvas.width * 0.75,
        y: canvas.height * 0.65,
        vx: -0.28,
        vy: 0.32,
        radius: canvas.width * (rMul - 0.03),
        color: "rgba(168, 85, 247, 0.06)",
      },
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.85,
        vx: 0.18,
        vy: -0.38,
        radius: canvas.width * (rMul - 0.06),
        color: "rgba(59, 130, 246, 0.05)",
      },
      {
        x: canvas.width * 0.1,
        y: canvas.height * 0.5,
        vx: 0.3,
        vy: -0.2,
        radius: canvas.width * (rMul - 0.1),
        color: "rgba(236, 72, 153, 0.04)",
      },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobsRef.current.forEach((blob) => {
        // Update position
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Soft boundary bounce
        if (blob.x < -blob.radius * 0.5 || blob.x > canvas.width + blob.radius * 0.5) blob.vx *= -1;
        if (blob.y < -blob.radius * 0.5 || blob.y > canvas.height + blob.radius * 0.5) blob.vy *= -1;

        // Draw soft radial gradient blob
        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
