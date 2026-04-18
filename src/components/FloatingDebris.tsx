import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const FloatingDebris = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = containerRef.current;
    if (!el) return;

    const items: HTMLDivElement[] = [];
    const count = 12; // reduced from 20

    for (let i = 0; i < count; i++) {
      const item = document.createElement("div");
      const size = Math.random() * 4 + 1;
      const isLine = Math.random() > 0.6;

      Object.assign(item.style, {
        position: "absolute",
        width: isLine ? `${size * 8}px` : `${size}px`,
        height: isLine ? "1px" : `${size}px`,
        borderRadius: isLine ? "0" : "50%",
        background: `rgba(100, 180, 200, ${Math.random() * 0.15 + 0.03})`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        transform: `rotate(${Math.random() * 360}deg)`,
        pointerEvents: "none",
        willChange: "transform",
      });

      item.dataset.speed = String(Math.random() * 0.5 + 0.1);
      item.dataset.drift = String((Math.random() - 0.5) * 0.3);
      item.dataset.baseTop = String(Math.random() * 100);

      el.appendChild(item);
      items.push(item);
    }

    // Cache parsed numeric values to avoid repeated parseFloat in hot loop
    const cache = items.map((item) => ({
      el: item,
      speed: parseFloat(item.dataset.speed || "0.2"),
      drift: parseFloat(item.dataset.drift || "0"),
      baseTop: parseFloat(item.dataset.baseTop || "50"),
    }));

    let ticking = false;
    let lastY = 0;

    const render = () => {
      ticking = false;
      const scrollY = lastY;
      for (let i = 0; i < cache.length; i++) {
        const c = cache[i];
        const y = c.baseTop + scrollY * c.speed * 0.05;
        const x = Math.sin(scrollY * 0.002 + c.speed * 10) * 30 * c.drift;
        c.el.style.transform = `translate3d(${x}px, ${(y % 200) - 100}px, 0) rotate(${scrollY * c.speed * 0.1}deg)`;
      }
    };

    const onScroll = () => {
      lastY = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      items.forEach((item) => item.remove());
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
      aria-hidden
    />
  );
};

export default FloatingDebris;
