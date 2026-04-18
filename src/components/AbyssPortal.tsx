import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** A massive rotating vortex/portal effect — full-width section divider */
const AbyssPortal = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      t += 0.008;

      // Outer vortex rings
      for (let ring = 0; ring < 40; ring++) {
        const radius = 20 + ring * (Math.min(w, h) * 0.015);
        const angleOffset = t * (1.5 - ring * 0.03) + ring * 0.15;
        const alpha = Math.max(0, 0.15 - ring * 0.003);
        const hue = 190 + Math.sin(t + ring * 0.1) * 15;

        ctx.beginPath();
        const segments = 60;
        for (let i = 0; i <= segments; i++) {
          const a = (i / segments) * Math.PI * 2 + angleOffset;
          const wobble = Math.sin(a * 3 + t * 2) * (3 + ring * 0.5);
          const r = radius + wobble;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r * 0.6; // elliptical for perspective
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `hsla(${hue}, 80%, 55%, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Inner glow core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      coreGrad.addColorStop(0, "hsla(195, 100%, 60%, 0.15)");
      coreGrad.addColorStop(0.4, "hsla(195, 100%, 50%, 0.05)");
      coreGrad.addColorStop(1, "transparent");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, w, h);

      // Spiral arms
      for (let arm = 0; arm < 3; arm++) {
        ctx.beginPath();
        const armAngle = (arm / 3) * Math.PI * 2 + t * 0.5;
        for (let s = 0; s < 200; s++) {
          const spiral = s * 0.05 + armAngle;
          const r = s * 2;
          const x = cx + Math.cos(spiral) * r;
          const y = cy + Math.sin(spiral) * r * 0.6;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(195, 90%, 60%, ${0.08 - 0.02 * arm})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Floating energy particles spiraling inward
      for (let p = 0; p < 30; p++) {
        const pAngle = t * 1.5 + p * 0.7;
        const pDist = 50 + ((p * 37 + t * 60) % 300);
        const px = cx + Math.cos(pAngle) * pDist;
        const py = cy + Math.sin(pAngle) * pDist * 0.6;
        const pSize = 1 + Math.sin(t + p) * 0.5;

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(195, 100%, 70%, ${0.3 - (pDist / 300) * 0.25})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={`relative h-[40vh] overflow-hidden ${className}`}>
      {/* Depth gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(180deg, 
            hsl(210 100% 4%) 0%, 
            transparent 25%, 
            transparent 75%, 
            hsl(210 100% 4%) 100%)`,
        }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: 0.9 }}
      />
      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center z-[2]">
        <div className="glass-light rounded-full px-5 py-2 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-ocean animate-pulse" />
          <span className="text-[10px] font-mono text-ocean/70 tracking-[0.4em] uppercase">
            anomaly detected
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-ocean animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AbyssPortal;
