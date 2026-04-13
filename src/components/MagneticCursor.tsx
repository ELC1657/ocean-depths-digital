import { useEffect, useRef } from "react";

/** A magnetic cursor blob that follows the mouse with fluid distortion */
const MagneticCursor = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      }
      if (trailRef.current) {
        const tx = pos.current.x + (target.current.x - pos.current.x) * -0.3;
        const ty = pos.current.y + (target.current.y - pos.current.y) * -0.3;
        trailRef.current.style.transform = `translate(${tx - 40}px, ${ty - 40}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-20 h-20 rounded-full pointer-events-none z-[60] hidden md:block"
        style={{
          background: "radial-gradient(circle, hsla(195, 100%, 50%, 0.06) 0%, transparent 70%)",
          filter: "blur(10px)",
          transition: "opacity 0.3s",
        }}
      />
      <div
        ref={blobRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[60] mix-blend-screen hidden md:block"
        style={{
          background: "radial-gradient(circle, hsla(195, 100%, 60%, 0.15) 0%, hsla(195, 100%, 50%, 0.05) 40%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
    </>
  );
};

export default MagneticCursor;
