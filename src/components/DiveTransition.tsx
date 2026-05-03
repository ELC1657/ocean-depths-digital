import { useEffect, useRef } from "react";

/** Full-screen dive transition — cinematic black-to-deep-blue wipe between sections */
const DiveTransition = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = 1 - (rect.top + rect.height / 2) / vh;
      const clamped = Math.max(0, Math.min(1, progress));

      // Bubble burst count based on progress
      el.style.setProperty("--dive-progress", String(clamped));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className={`relative h-[50vh] overflow-hidden ${className}`}>
      {/* Depth gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            hsl(210 100% 4% / 0) 0%,
            hsl(210 100% 2% / 1) 30%,
            hsl(215 90% 3% / 1) 50%,
            hsl(210 100% 2% / 1) 70%,
            hsl(210 100% 4% / 0) 100%
          )`,
        }}
      />

      {/* Animated pressure rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${(i + 1) * 15}vw`,
              height: `${(i + 1) * 15}vw`,
              borderColor: `hsl(195 100% 45% / ${0.05 - i * 0.008})`,
              animation: `sonar-ping ${3 + i * 0.5}s ease-out infinite ${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Depth line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{
          background: "linear-gradient(180deg, transparent 10%, hsl(195 100% 45% / 0.2) 40%, hsl(195 100% 45% / 0.3) 50%, hsl(195 100% 45% / 0.2) 60%, transparent 90%)"
        }}
      />


      {/* Scatter particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsl(195 100% 60% / ${Math.random() * 0.2})`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default DiveTransition;
