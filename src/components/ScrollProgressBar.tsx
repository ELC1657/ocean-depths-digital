import { useEffect, useRef } from "react";

/**
 * Thin gradient scroll progress bar fixed to the top of the viewport.
 * Writes width via ref + rAF — no React re-renders per scroll.
 */
const ScrollProgressBar = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[70] pointer-events-none bg-transparent">
      <div
        ref={ref}
        className="h-full origin-left will-change-transform"
        style={{
          transform: "scaleX(0)",
          background:
            "linear-gradient(90deg, hsl(var(--ocean)) 0%, hsl(var(--ocean-glow)) 50%, hsl(var(--primary)) 100%)",
          boxShadow: "0 0 12px hsl(var(--ocean) / 0.7), 0 0 24px hsl(var(--ocean-glow) / 0.4)",
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
