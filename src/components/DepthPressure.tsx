import { useEffect, useState } from "react";

/** Overlay that gets darker + more blue-tinted as user scrolls deeper */
const DepthPressure = () => {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setDepth(Math.min(1, window.scrollY / maxScroll));
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
