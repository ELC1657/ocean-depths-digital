import { useEffect, useState } from "react";

/** Overlay that gets darker + more blue-tinted as user scrolls deeper */
const DepthPressure = () => {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    let ticking = false;
    let last = -1;
    const update = () => {
      ticking = false;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const next = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
      // Quantize to 2% steps to drop redundant style writes
      const q = Math.round(next * 50) / 50;
      if (q !== last) { last = q; setDepth(q); }
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[3]"
      style={{
        background: `radial-gradient(ellipse at 50% 30%, transparent 40%, hsl(215 90% ${3 + depth * 2}% / ${depth * 0.35}) 100%)`,
        transition: "background 0.3s",
      }}
    />
  );
};

export default DepthPressure;
