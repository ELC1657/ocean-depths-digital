import { useEffect, useState } from "react";

interface Zone {
  name: string;
  range: string;
  min: number;
  max: number;
  color: string;
}

const zones: Zone[] = [
  { name: "SUNLIGHT ZONE", range: "0–200m", min: 0, max: 0.2, color: "hsl(195 100% 55%)" },
  { name: "TWILIGHT ZONE", range: "200–1000m", min: 0.2, max: 0.45, color: "hsl(210 90% 50%)" },
  { name: "MIDNIGHT ZONE", range: "1000–4000m", min: 0.45, max: 0.7, color: "hsl(220 80% 35%)" },
  { name: "ABYSSAL ZONE", range: "4000–6000m", min: 0.7, max: 0.9, color: "hsl(230 70% 25%)" },
  { name: "HADAL ZONE", range: "6000m+", min: 0.9, max: 1, color: "hsl(240 60% 18%)" },
];

/** Slides in from the left when entering a new ocean depth zone */
const DepthZoneIndicator = () => {
  const [currentZone, setCurrentZone] = useState<Zone | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastZoneName = "";
    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      const zone = zones.find((z) => progress >= z.min && progress < z.max) ?? zones[zones.length - 1];

      if (zone.name !== lastZoneName && window.scrollY > 100) {
        lastZoneName = zone.name;
        setCurrentZone(zone);
        setVisible(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => setVisible(false), 2800);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  if (!currentZone) return null;

  return (
    <div
      className={`fixed left-6 top-1/2 -translate-y-1/2 z-[46] hidden lg:block transition-all duration-700 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 pointer-events-none"
      }`}
    >
      <div className="glass rounded-r-lg pl-4 pr-6 py-4 border-l-2 relative overflow-hidden" style={{ borderLeftColor: currentZone.color }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `linear-gradient(90deg, ${currentZone.color}, transparent)` }}
        />
        <div className="relative">
          <div className="text-[9px] font-mono text-foreground/40 tracking-widest mb-1">
            ENTERING
          </div>
          <div
            className="text-sm font-mono tracking-[0.2em] font-semibold"
            style={{ color: currentZone.color }}
          >
            {currentZone.name}
          </div>
          <div className="text-[10px] font-mono text-foreground/50 mt-1">
            {currentZone.range}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepthZoneIndicator;
