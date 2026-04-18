import { useEffect, useState, useRef } from "react";

/** Holographic heads-up display overlay — scroll-driven, no idle rAF loop */
const HUDOverlay = () => {
  const [data, setData] = useState({ depth: 0, lat: "46°12'N", lon: "8°47'E", pressure: 1, temp: 4.2 });
  const [scanLine, setScanLine] = useState(0);
  const tickingRef = useRef(false);
  const scanFrameRef = useRef<number>(0);

  // Scroll-driven readouts (no idle work)
  useEffect(() => {
    const update = () => {
      tickingRef.current = false;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const depth = Math.round(progress * 400);
      setData((prev) => ({
        ...prev,
        depth,
        pressure: parseFloat((depth * 0.1 + 1).toFixed(1)),
        temp: parseFloat((4.2 - progress * 2.1).toFixed(1)),
      }));
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slow scan-line animation, paused when tab hidden
  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      if (now - last > 200) {
        last = now;
        setScanLine((s) => (s + 2) % 100);
      }
      scanFrameRef.current = requestAnimationFrame(tick);
    };
    const start = () => {
      cancelAnimationFrame(scanFrameRef.current);
      last = performance.now();
      scanFrameRef.current = requestAnimationFrame(tick);
    };
    const stop = () => cancelAnimationFrame(scanFrameRef.current);

    if (!document.hidden) start();
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] hidden lg:block" aria-hidden>
      {/* Top-left coordinates */}
      <div className="absolute top-20 left-6 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-ocean/50 animate-pulse" />
          <span className="text-[9px] font-mono text-ocean/30 tracking-widest">LAT {data.lat}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-ocean/30" />
          <span className="text-[9px] font-mono text-ocean/30 tracking-widest">LON {data.lon}</span>
        </div>
        <div className="w-16 h-px bg-gradient-to-r from-ocean/20 to-transparent mt-2" />
        <span className="text-[8px] font-mono text-ocean/20 tracking-widest block">SYSTEM ONLINE</span>
      </div>

      {/* Top-right data readouts */}
      <div className="absolute top-20 right-6 text-right space-y-1">
        <span className="text-[9px] font-mono text-ocean/30 tracking-widest block">DEPTH {data.depth}m</span>
        <span className="text-[9px] font-mono text-ocean/20 tracking-widest block">PRESSURE {data.pressure} ATM</span>
        <span className="text-[9px] font-mono text-ocean/20 tracking-widest block">TEMP {data.temp}°C</span>
        <div className="w-16 h-px bg-gradient-to-l from-ocean/20 to-transparent mt-2 ml-auto" />
      </div>

      {/* Bottom-left status */}
      <div className="absolute bottom-8 left-6 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500/40 animate-pulse" />
          <span className="text-[8px] font-mono text-green-500/30 tracking-widest">SONAR ACTIVE</span>
        </div>
        <span className="text-[8px] font-mono text-ocean/15 tracking-widest block">SCAN {scanLine}%</span>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-14 left-4"><div className="w-6 h-6 border-l border-t border-ocean/10" /></div>
      <div className="absolute top-14 right-4"><div className="w-6 h-6 border-r border-t border-ocean/10" /></div>
      <div className="absolute bottom-4 left-4"><div className="w-6 h-6 border-l border-b border-ocean/10" /></div>
      <div className="absolute bottom-4 right-4"><div className="w-6 h-6 border-r border-b border-ocean/10" /></div>

      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          top: `${scanLine}%`,
          background: "linear-gradient(90deg, transparent 5%, hsla(195, 100%, 50%, 0.04) 50%, transparent 95%)",
          transition: "top 0.2s linear",
        }}
      />
    </div>
  );
};

export default HUDOverlay;
