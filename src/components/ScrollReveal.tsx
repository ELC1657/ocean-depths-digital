import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

const ScrollReveal = ({ children, direction = "up", delay = 0, className = "" }: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${isVisible ? `scroll-reveal-${direction}` : "scroll-hidden"} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
