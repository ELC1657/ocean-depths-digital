import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  hue: number;
  size: number;
}

/** Bioluminescent particle trail that follows the cursor — squid-ink meets fireflies */
const CreatureTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<TrailPoint[]>([]);
  const mouse = useRef({ x: -1000, y: -1000, lastX: -1000, lastY: -1000 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      const dx = mouse.current.x - mouse.current.lastX;
      const dy = mouse.current.y - mouse.current.lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const count = Math.min(3, Math.floor(speed / 8));
      for (let i = 0; i < count; i++) {
        points.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.6 - dx * 0.02,
          vy: (Math.random() - 0.5) * 0.6 - dy * 0.02,
          life: 1,
          hue: 180 + Math.random() * 40,
          size: 1 + Math.random() * 2,
        });
      }
      mouse.current.lastX = e.clientX;
      mouse.current.lastY = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      points.current = points.current.filter((p) => p.life > 0);

      points.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy - 0.05; // slight upward drift like bubbles
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= 0.012;

        const alpha = p.life * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${alpha})`;
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[44] hidden lg:block"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default CreatureTrail;
