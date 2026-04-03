import { useEffect, useRef } from "react";

const BubbleField = ({ count = 20, className = "" }: { count?: number; className?: string }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 8 + 3;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.3 + 0.05;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 border border-white/10 animate-bubble"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: `-${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

export default BubbleField;
