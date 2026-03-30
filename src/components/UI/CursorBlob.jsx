import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorBlob() {
  const blob = useRef(null);

  useEffect(() => {
    const move = (e) => {
      gsap.to(blob.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={blob}
      className="fixed top-0 left-0 pointer-events-none z-0"
      style={{
        width: 320,
        height: 320,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(245,197,24,0.10) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
