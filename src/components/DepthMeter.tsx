import { useEffect, useState } from "react";
import { Anchor } from "lucide-react";

const DepthMeter = () => {
  const [depth, setDepth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastDepth = -1;
    let lastVisible = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = max > 0 ? window.scrollY / max : 0;
      const d = Math.round(scrollPercent * 400);
      const v = window.scrollY > 200;
      if (d !== lastDepth) { lastDepth = d; setDepth(d); }
      if (v !== lastVisible) { lastVisible = v; setVisible(v); }
    };
    const handleScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2 transition-all duration-700 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}
    >
      <div className="glass rounded-full px-3 py-6 flex flex-col items-center gap-3">
        <Anchor className="w-4 h-4 text-ocean" />
        <div className="w-px h-32 bg-gradient-to-b from-ocean/60 via-ocean/20 to-transparent relative">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-ocean shadow-lg shadow-ocean/50 transition-all duration-300"
            style={{ top: `${Math.min((depth / 400) * 100, 100)}%` }}
          />
        </div>
        <div className="text-center">
          <span className="text-lg font-mono font-bold text-ocean tabular-nums">{depth}</span>
          <span className="text-[9px] block text-ocean/60 font-mono tracking-widest">METER</span>
        </div>
      </div>
    </div>
  );
};

export default DepthMeter;
