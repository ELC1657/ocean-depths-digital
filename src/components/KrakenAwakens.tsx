import { useEffect, useState, useRef } from "react";

/** Easter egg: type "KRAKEN" to summon a giant tentacle from the abyss */
const KrakenAwakens = () => {
  const [active, setActive] = useState(false);
  const buffer = useRef("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      buffer.current = (buffer.current + e.key.toUpperCase()).slice(-6);
      if (buffer.current === "KRAKEN") {
        setActive(true);
        buffer.current = "";
        setTimeout(() => setActive(false), 6000);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    let t = 0;
    const start = performance.now();

    const draw = () => {
      const elapsed = (performance.now() - start) / 1000;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.03;

      // emergence progress (0-1, eases up then down)
      const progress = elapsed < 4 ? Math.min(1, elapsed / 1.5) : Math.max(0, 1 - (elapsed - 4) / 2);

      // Draw 5 tentacles emerging from bottom
      for (let arm = 0; arm < 5; arm++) {
        const baseX = w * (0.15 + arm * 0.18);
        const baseY = h + 50;
        const length = h * 0.85 * progress;
        const sway = Math.sin(t + arm) * 60;

        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        const segments = 30;
        for (let i = 0; i <= segments; i++) {
          const ratio = i / segments;
          const x = baseX + Math.sin(t * 1.5 + ratio * 6 + arm) * sway * ratio + Math.cos(t + arm) * 30 * ratio;
          const y = baseY - length * ratio;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(195, 80%, 30%, ${0.85 * progress})`;
        ctx.lineWidth = 40 * (1 - 0.7 * (arm % 2));
        ctx.lineCap = "round";
        ctx.stroke();

        // glowing edge
        ctx.strokeStyle = `hsla(195, 100%, 60%, ${0.5 * progress})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // suckers
        for (let i = 2; i < segments; i += 2) {
          const ratio = i / segments;
          const x = baseX + Math.sin(t * 1.5 + ratio * 6 + arm) * sway * ratio + Math.cos(t + arm) * 30 * ratio;
          const y = baseY - length * ratio;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(185, 100%, 70%, ${0.6 * progress})`;
          ctx.fill();
        }
      }

      // dark vignette from below
      const grad = ctx.createLinearGradient(0, h, 0, 0);
      grad.addColorStop(0, `hsla(220, 100%, 3%, ${0.7 * progress})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  if (!active) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[60]"
        style={{ width: "100vw", height: "100vh" }}
      />
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[61] pointer-events-none animate-fade-in">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-ocean">
            ⚠ KRAKEN DETECTED
          </span>
        </div>
      </div>
    </>
  );
};

export default KrakenAwakens;
