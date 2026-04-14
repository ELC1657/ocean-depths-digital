import { useEffect, useState, useRef } from "react";

/** Holographic heads-up display overlay with coordinates, depth, scan data */
const HUDOverlay = () => {
  const [data, setData] = useState({ depth: 0, lat: "46°12'N", lon: "8°47'E", pressure: 0, temp: 4.2 });
  const [scanLine, setScanLine] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.016;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / maxScroll;
      const depth = Math.round(progress * 400);
      const pressure = (depth * 0.1 + 1).toFixed(1);
      const temp = (4.2 - progress * 2.1).toFixed(1);

      setData(prev => ({
        ...prev,
        depth,
        pressure: parseFloat(pressure),
        temp: parseFloat(temp),
      }));
      setScanLine(prev => (prev + 1) % 100);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] hidden lg:block">
      {/* Top-left coordinates */}
      <div className="absolute top-20 left-6 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-ocean/50 animate-pulse" />
          <span className="text-[9px] font-mono text-ocean/30 tracking-widest">
            LAT {data.lat}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-ocean/30" />
          <span className="text-[9px] font-mono text-ocean/30 tracking-widest">
            LON {data.lon}
          </span>
        </div>
        <div className="w-16 h-px bg-gradient-to-r from-ocean/20 to-transparent mt-2" />
        <span className="text-[8px] font-mono text-ocean/20 tracking-widest block">
          SYSTEM ONLINE
        </span>
      </div>

      {/* Top-right data readouts */}
      <div className="absolute top-20 right-6 text-right space-y-1">
        <span className="text-[9px] font-mono text-ocean/30 tracking-widest block">
          DEPTH {data.depth}m
        </span>
        <span className="text-[9px] font-mono text-ocean/20 tracking-widest block">
          PRESSURE {data.pressure} ATM
        </span>
        <span className="text-[9px] font-mono text-ocean/20 tracking-widest block">
          TEMP {data.temp}°C
        </span>
        <div className="w-16 h-px bg-gradient-to-l from-ocean/20 to-transparent mt-2 ml-auto" />
      </div>

      {/* Bottom-left status */}
      <div className="absolute bottom-8 left-6 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500/40 animate-pulse" />
          <span className="text-[8px] font-mono text-green-500/30 tracking-widest">
            SONAR ACTIVE
          </span>
        </div>
        <span className="text-[8px] font-mono text-ocean/15 tracking-widest block">
          SCAN {scanLine}%
        </span>
      </div>

      {/* Corner brackets */}
      {/* Top-left bracket */}
      <div className="absolute top-14 left-4">
        <div className="w-6 h-6 border-l border-t border-ocean/10" />
      </div>
      {/* Top-right bracket */}
      <div className="absolute top-14 right-4">
        <div className="w-6 h-6 border-r border-t border-ocean/10" />
      </div>
      {/* Bottom-left bracket */}
      <div className="absolute bottom-4 left-4">
        <div className="w-6 h-6 border-l border-b border-ocean/10" />
      </div>
      {/* Bottom-right bracket */}
      <div className="absolute bottom-4 right-4">
        <div className="w-6 h-6 border-r border-b border-ocean/10" />
      </div>

      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          top: `${scanLine}%`,
          background: "linear-gradient(90deg, transparent 5%, hsla(195, 100%, 50%, 0.04) 50%, transparent 95%)",
          transition: "top 0.1s linear",
        }}
      />
    </div>
  );
};

export default HUDOverlay;
