import { useEffect, useRef } from "react";

const FloatingDebris = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items: HTMLDivElement[] = [];
    const count = 20;

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
      });
      
      item.dataset.speed = String(Math.random() * 0.5 + 0.1);
      item.dataset.drift = String((Math.random() - 0.5) * 0.3);
      item.dataset.baseTop = String(Math.random() * 100);
      
      el.appendChild(item);
      items.push(item);
    }

    const onScroll = () => {
      const scrollY = window.scrollY;
      items.forEach((item) => {
        const speed = parseFloat(item.dataset.speed || "0.2");
        const drift = parseFloat(item.dataset.drift || "0");
        const baseTop = parseFloat(item.dataset.baseTop || "50");
        const y = baseTop + scrollY * speed * 0.05;
        const x = Math.sin(scrollY * 0.002 + speed * 10) * 30 * drift;
        item.style.transform = `translate(${x}px, ${y % 200 - 100}px) rotate(${scrollY * speed * 0.1}deg)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      items.forEach((item) => item.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
    />
  );
};

export default FloatingDebris;
