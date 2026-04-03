import { useEffect, useRef } from "react";

const SonarSweep = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 200;
    const cx = 100, cy = 100;
    let angle = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 5, 15, 0.08)";
      ctx.fillRect(0, 0, 200, 200);

      // Grid rings
      [30, 60, 90].forEach(r => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 180, 220, 0.15)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Cross lines
      ctx.strokeStyle = "rgba(0, 180, 220, 0.1)";
      ctx.beginPath();
      ctx.moveTo(cx, 10); ctx.lineTo(cx, 190);
      ctx.moveTo(10, cy); ctx.lineTo(190, cy);
      ctx.stroke();

      // Sweep line
      const gradient = ctx.createConicGradient(angle, cx, cy);
      gradient.addColorStop(0, "rgba(0, 200, 230, 0.5)");
      gradient.addColorStop(0.1, "rgba(0, 200, 230, 0)");
      gradient.addColorStop(1, "rgba(0, 200, 230, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.fill();

      // Blips
      const blipAngle = angle - 0.3;
      [
        { d: 40, a: 0.8 }, { d: 65, a: 2.1 }, { d: 55, a: 4.5 }, { d: 80, a: 1.2 }
      ].forEach(blip => {
        const diff = Math.abs(((blipAngle - blip.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2));
        if (diff < 1.5) {
          const fade = 1 - diff / 1.5;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(blip.a) * blip.d, cy + Math.sin(blip.a) * blip.d, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 220, 180, ${fade * 0.8})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(cx + Math.cos(blip.a) * blip.d, cy + Math.sin(blip.a) * blip.d, 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 220, 180, ${fade * 0.2})`;
          ctx.fill();
        }
      });

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 220, 200, 0.8)";
      ctx.fill();

      angle += 0.02;
      requestAnimationFrame(draw);
    };
    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`rounded-full border border-ocean/20 shadow-2xl shadow-ocean/20 ${className}`}
      style={{ width: 200, height: 200 }}
    />
  );
};

export default SonarSweep;
