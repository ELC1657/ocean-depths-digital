import { useEffect, useRef, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: "vertical" | "horizontal" | "both";
  scale?: boolean;
  rotate?: boolean;
  opacity?: boolean;
}

/**
 * Parallax wrapper. Writes transforms directly via ref + rAF — no React re-renders per scroll.
 * Skips work entirely for users that prefer reduced motion.
 */
const ParallaxSection = ({
  children,
  speed = 0.3,
  className = "",
  direction = "vertical",
  scale = false,
  rotate = false,
  opacity = false,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.style.transform = "none";
      el.style.opacity = "1";
      return;
    }

    let ticking = false;
    let inView = true;

    const apply = () => {
      ticking = false;
      if (!inView) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = 1 - (rect.top + rect.height) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const offset = (clamped - 0.5) * 2;

      const y = direction !== "horizontal" ? offset * speed * 200 : 0;
      const x = direction !== "vertical" ? offset * speed * 150 : 0;
      const scaleVal = scale ? 1 + clamped * 0.08 : 1;
      const rotateVal = rotate ? (clamped - 0.5) * speed * 5 : 0;
      const opacityVal = opacity
        ? Math.min(1, clamped < 0.5 ? clamped * 2.5 : (1 - clamped) * 2.5)
        : 1;

      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scaleVal}) rotate(${rotateVal}deg)`;
      if (opacity) el.style.opacity = String(opacityVal);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    // Pause work when off-screen
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (inView) apply();
      },
      { rootMargin: "100px" }
    );
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [speed, direction, scale, rotate, opacity, reduced]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`} style={{ transition: "opacity 0.1s" }}>
      {children}
    </div>
  );
};

export default ParallaxSection;
