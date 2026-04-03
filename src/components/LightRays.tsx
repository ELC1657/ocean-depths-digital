const LightRays = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[15, 35, 55, 75].map((left, i) => (
        <div
          key={i}
          className="absolute top-0 w-[2px] animate-light-ray"
          style={{
            left: `${left}%`,
            height: "120%",
            background: `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)`,
            transform: `rotate(${-5 + i * 3}deg)`,
            transformOrigin: "top center",
            animationDelay: `${i * 2}s`,
            filter: "blur(8px)",
            width: `${30 + i * 10}px`,
          }}
        />
      ))}
    </div>
  );
};

export default LightRays;
