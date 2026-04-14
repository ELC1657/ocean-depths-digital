import { useEffect, useRef } from "react";

/** Ambient sound wave visualizer — organic sine waves that pulse and breathe */
const WhaleSongWaves = ({ className = "" }: { className?: string }) => {
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
      ctx.clearRect(0, 0, w, h);
      t += 0.015;

      const waveCount = 6;
      for (let wave = 0; wave < waveCount; wave++) {
        ctx.beginPath();
        const cy = h * 0.5 + (wave - waveCount / 2) * 18;
        const amplitude = 15 + Math.sin(t * 0.7 + wave) * 10;
        const freq = 0.008 + wave * 0.002;
        const phase = t * (0.8 + wave * 0.2) + wave * 1.2;
        const alpha = 0.08 - wave * 0.01;
        const hue = 190 + wave * 5;

        for (let x = 0; x <= w; x += 2) {
          const y = cy +
            Math.sin(x * freq + phase) * amplitude +
            Math.sin(x * freq * 2.3 + phase * 1.5) * (amplitude * 0.3) +
            Math.sin(x * freq * 0.5 + phase * 0.7) * (amplitude * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsla(${hue}, 80%, 55%, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Glow line
        ctx.strokeStyle = `hsla(${hue}, 90%, 65%, ${alpha * 0.3})`;
        ctx.lineWidth = 4;
        ctx.filter = "blur(3px)";
        ctx.stroke();
        ctx.filter = "none";
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
    <canvas
      ref={canvasRef}
      className={`w-full h-32 ${className}`}
      style={{ opacity: 0.7 }}
    />
  );
};

export default WhaleSongWaves;
