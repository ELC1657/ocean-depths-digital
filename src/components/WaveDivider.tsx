const WaveDivider = ({ 
  flip = false, 
  className = "",
  color = "hsl(210, 100%, 6%)" 
}: { 
  flip?: boolean; 
  className?: string;
  color?: string;
}) => {
  return (
    <div className={`relative w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[100px]"
      >
        <path
          d="M0,40 C360,120 720,0 1080,80 C1260,100 1380,60 1440,40 L1440,120 L0,120 Z"
          fill={color}
        />
        <path
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,30 1440,60 L1440,120 L0,120 Z"
          fill={color}
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
