import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { gsap } from "gsap";
import { setPreloaderDone } from "../../store/portfolioSlice";

export default function PreLoader() {
  const el = useRef(null);
  const textRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        dispatch(setPreloaderDone(true));
      },
    });

    // Initial fade
    tl.from(textRef.current, {
      opacity: 0.5,
      duration: 0.6,
      ease: "power4.out",
    })

      // Responsive letter spacing animation
      .to(
        textRef.current,
        {
          letterSpacing: "clamp(10px, 6vw, 40px)",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "+=0.2",
      )

      // Slide up animation
      .to(
        el.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "+=0.1",
      );
  }, []);

  return (
    <div
      ref={el}
      className="fixed inset-0 bg-dark flex items-center justify-center z-[9999] overflow-hidden"
    >
      <div className="overflow-hidden w-full flex justify-center">
        <p
          ref={textRef}
          className="font-bebas text-yellow text-center"
          style={{
            fontSize: "clamp(40px, 12vw, 120px)",
            letterSpacing: "clamp(2px, 1.5vw, 10px)",
            lineHeight: "1",
          }}
        >
          PORTFOLIO
        </p>
      </div>
    </div>
  );
}
