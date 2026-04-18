import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Ambient sound wave visualizer — organic sine waves that pulse and breathe */
const WhaleSongWaves = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
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

    let inView = false;
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { rootMargin: "50px" });
    io.observe(canvas);

    let t = 0;
    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      if (!inView) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.015;

      const waveCount = 4; // reduced from 6
      for (let wave = 0; wave < waveCount; wave++) {
        ctx.beginPath();
        const cy = h * 0.5 + (wave - waveCount / 2) * 18;
        const amplitude = 15 + Math.sin(t * 0.7 + wave) * 10;
        const freq = 0.008 + wave * 0.002;
        const phase = t * (0.8 + wave * 0.2) + wave * 1.2;
        const alpha = 0.1 - wave * 0.015;
        const hue = 190 + wave * 5;

        // Step every 4px instead of 2px
        for (let x = 0; x <= w; x += 4) {
          const y = cy +
            Math.sin(x * freq + phase) * amplitude +
            Math.sin(x * freq * 2.3 + phase * 1.5) * (amplitude * 0.3) +
            Math.sin(x * freq * 0.5 + phase * 0.7) * (amplitude * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Single wider stroke replaces the expensive blur-filter glow pass
        ctx.strokeStyle = `hsla(${hue}, 80%, 55%, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `hsla(${hue}, 90%, 65%, ${alpha})`;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    draw();
    const onVis = () => {
      cancelAnimationFrame(animRef.current);
      if (!document.hidden) draw();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(animRef.current);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-32 ${className}`}
      style={{ opacity: 0.7 }}
    />
  );
};

export default WhaleSongWaves;
