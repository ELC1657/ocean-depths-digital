import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Subtle screen shake + red vignette pulse when scrolling into the deepest zones */
const PressureShake = () => {
  const reduced = useReducedMotion();
  const [intensity, setIntensity] = useState(0);
  const [crack, setCrack] = useState(false);

  useEffect(() => {
    if (reduced) return;

    let lastCrackProgress = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;

      // Build pressure intensity past 70% scroll
      const i = progress > 0.7 ? Math.min(1, (progress - 0.7) / 0.3) : 0;
      setIntensity(i);

      // Trigger a "crack" pulse each time we cross a 5% threshold past 75%
      if (progress > 0.75) {
        const bucket = Math.floor(progress * 20);
        if (bucket !== lastCrackProgress) {
          lastCrackProgress = bucket;
          setCrack(true);
          setTimeout(() => setCrack(false), 450);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  useEffect(() => {
    document.documentElement.style.setProperty("--pressure-intensity", String(intensity));
  }, [intensity]);

  if (reduced) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[45]"
      style={{
        boxShadow: `inset 0 0 ${120 + intensity * 200}px ${30 + intensity * 80}px hsl(var(--primary) / ${intensity * 0.18})`,
        transition: "box-shadow 0.4s ease-out",
      }}
      aria-hidden
    >
      {crack && (
        <div
          className="absolute inset-0 animate-[pressure-pulse_0.45s_ease-out]"
          style={{
            background: "radial-gradient(circle at 50% 50%, transparent 60%, hsl(var(--primary) / 0.08) 100%)",
          }}
        />
      )}
      <style>{`
        @keyframes pressure-pulse {
          0% { opacity: 0; transform: scale(1.05); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default PressureShake;
