import { useEffect, useRef, useState, ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // -1 to 1, negative = opposite direction
  className?: string;
  direction?: "vertical" | "horizontal" | "both";
  scale?: boolean;
  rotate?: boolean;
  opacity?: boolean;
}

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
  const [transform, setTransform] = useState({ y: 0, x: 0, progress: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when entering bottom, 1 when leaving top
      const progress = 1 - (rect.top + rect.height) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const offset = (clamped - 0.5) * 2; // -1 to 1

      setTransform({
        y: direction !== "horizontal" ? offset * speed * 200 : 0,
        x: direction !== "vertical" ? offset * speed * 150 : 0,
        progress: clamped,
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [speed, direction]);

  const scaleVal = scale ? 1 + transform.progress * 0.08 : 1;
  const rotateVal = rotate ? (transform.progress - 0.5) * speed * 5 : 0;
  const opacityVal = opacity
    ? Math.min(1, transform.progress < 0.5 ? transform.progress * 2.5 : (1 - transform.progress) * 2.5)
    : 1;

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${scaleVal}) rotate(${rotateVal}deg)`,
        opacity: opacityVal,
        transition: "opacity 0.1s",
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;
