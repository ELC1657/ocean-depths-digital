import { useEffect, useRef } from "react";

interface Jellyfish {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  drift: number;
  opacity: number;
  hue: number;
  pulseSpeed: number;
  tentacleLength: number;
}

const JellyfishSwarm = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    const jellies: Jellyfish[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 25 + 15,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.3 + 0.1,
      drift: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.15 + 0.05,
      hue: 180 + Math.random() * 40,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      tentacleLength: Math.random() * 40 + 20,
    }));

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      jellies.forEach((j) => {
        j.phase += j.pulseSpeed;
        j.y -= j.speed;
        j.x += j.drift + Math.sin(t * 0.5 + j.phase) * 0.3;

        // Mouse avoidance
        const mx = mouseRef.current.x, my = mouseRef.current.y;
        if (mx > 0) {
          const dx = j.x - mx, dy = j.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200 * 0.8;
            j.x += (dx / dist) * force;
            j.y += (dy / dist) * force;
          }
        }

        if (j.y < -100) {
          j.y = canvas.height + 50;
          j.x = Math.random() * canvas.width;
        }

        const pulse = Math.sin(j.phase) * 0.3 + 0.7;
        const sz = j.size * pulse;

        ctx.save();
        ctx.globalAlpha = j.opacity;

        // Glow
        const glow = ctx.createRadialGradient(j.x, j.y, 0, j.x, j.y, sz * 3);
        glow.addColorStop(0, `hsla(${j.hue}, 80%, 60%, 0.08)`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(j.x - sz * 3, j.y - sz * 3, sz * 6, sz * 6);

        // Bell (dome)
        ctx.beginPath();
        ctx.ellipse(j.x, j.y, sz, sz * 0.7, 0, Math.PI, 0);
        ctx.fillStyle = `hsla(${j.hue}, 70%, 55%, ${j.opacity * 2})`;
        ctx.fill();

        // Inner bell highlight
        ctx.beginPath();
        ctx.ellipse(j.x, j.y - sz * 0.1, sz * 0.6, sz * 0.4, 0, Math.PI, 0);
        ctx.fillStyle = `hsla(${j.hue}, 90%, 75%, ${j.opacity * 1.5})`;
        ctx.fill();

        // Tentacles
        const tentCount = 5;
        for (let i = 0; i < tentCount; i++) {
          const tx = j.x + ((i - (tentCount - 1) / 2) / tentCount) * sz * 1.5;
          ctx.beginPath();
          ctx.moveTo(tx, j.y);
          const segments = 6;
          for (let s = 1; s <= segments; s++) {
            const sy = j.y + (s / segments) * j.tentacleLength;
            const sx = tx + Math.sin(t * 2 + j.phase + i + s * 0.5) * (8 + s * 1.5);
            ctx.lineTo(sx, sy);
          }
          ctx.strokeStyle = `hsla(${j.hue}, 60%, 50%, ${j.opacity * (1 - 0.3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[2] ${className}`}
      style={{ opacity: 0.8 }}
    />
  );
};

export default JellyfishSwarm;
