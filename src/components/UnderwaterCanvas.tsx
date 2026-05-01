import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "bubble" | "plankton" | "debris";
  wobblePhase: number;
  wobbleSpeed: number;
}

const UnderwaterCanvas = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const reduced = useReducedMotion();

  const createParticle = useCallback((width: number, height: number, type?: Particle["type"]): Particle => {
    const t = type || (["bubble", "plankton", "debris"] as const)[Math.floor(Math.random() * 3)];
    return {
      x: Math.random() * width,
      y: t === "bubble" ? height + Math.random() * 100 : Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: t === "bubble" ? -(Math.random() * 1.5 + 0.5) : (Math.random() - 0.5) * 0.2,
      size: t === "bubble" ? Math.random() * 6 + 2 : t === "plankton" ? Math.random() * 3 + 1 : Math.random() * 4 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      type: t,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      // Only paint the visible viewport — fixed positioning means we don't need
      // to cover the entire scroll height. Cuts GPU texture memory ~5x.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Reduced from 40 → 30 — fewer particles needed for viewport-only canvas
    const count = 30;
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(window.innerWidth, window.innerHeight)
    );

    const handleMouseMove = (e: MouseEvent) => {
      // Canvas is fixed to the viewport now — use viewport coords directly
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", resize);

    let time = 0;
    const animate = () => {
      if (!ctx || !canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Caustic light patterns (reduced from 5 → 3, viewport-anchored)
      for (let i = 0; i < 3; i++) {
        const cx = w * (0.15 + i * 0.35) + Math.sin(time * 0.3 + i) * 100;
        const cy = h * 0.4 + Math.cos(time * 0.2 + i * 1.5) * 150;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300 + Math.sin(time + i) * 100);
        gradient.addColorStop(0, `rgba(0, 180, 220, ${0.03 + Math.sin(time * 0.5 + i) * 0.015})`);
        gradient.addColorStop(1, "rgba(0, 180, 220, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      // Draw and update particles
      particlesRef.current.forEach((p) => {
        p.wobblePhase += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobblePhase) * 0.5;
        p.y += p.vy;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx > 0) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150 * 0.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.y < -20 || p.y > h + 20 || p.x < -20 || p.x > w + 20) {
          Object.assign(p, createParticle(w, h, p.type));
        }

        ctx.save();
        if (p.type === "bubble") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(150, 220, 255, ${p.opacity * 0.6})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          // Highlight
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 240, 255, ${p.opacity * 0.8})`;
          ctx.fill();
        } else if (p.type === "plankton") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 200, 180, ${p.opacity * 0.5})`;
          ctx.fill();
          // Glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 200, 180, ${p.opacity * 0.1})`;
          ctx.fill();
        } else {
          ctx.globalAlpha = p.opacity * 0.3;
          ctx.fillStyle = "rgba(180, 200, 220, 0.4)";
          ctx.fillRect(p.x, p.y, p.size, p.size * 0.5);
        }
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const onVis = () => {
      cancelAnimationFrame(animFrameRef.current);
      if (!document.hidden) animate();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, [createParticle, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
      style={{ opacity: 0.7 }}
    />
  );
};

export default UnderwaterCanvas;
