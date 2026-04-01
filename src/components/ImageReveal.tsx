import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

const ImageReveal = ({ src, alt, className = "", imgClassName = "" }: ImageRevealProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`image-reveal ${isVisible ? "revealed" : ""} ${className}`}
    >
      <img src={src} alt={alt} className={imgClassName} />
    </div>
  );
};

export default ImageReveal;
