"use client";

import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TOC_CARDS } from "../../utils/data";
import SectionHeader from "../shared/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

/* CARD */
const TOCCard = memo(({ icon, label, target }) => {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(cardRef.current, {
      x: (x - rect.width / 2) * 0.12,
      y: (y - rect.height / 2) * 0.12,
      duration: 0.3,
    });
  };

  const reset = () => {
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={() =>
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
      }
      className="group relative border border-[#ddd] p-6 md:p-8 lg:p-10 
      flex flex-col items-center gap-4 cursor-pointer overflow-hidden
      transition-all duration-400
      bg-white hover:bg-yellow
      hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
    >
      {/* Icon */}
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-yellow 
      flex items-center justify-center text-2xl md:text-3xl 
      transition-all duration-300 group-hover:scale-125 group-hover:rotate-6"
      >
        {icon}
      </div>

      {/* Text */}
      <p className="text-[11px] md:text-[12px] font-extrabold tracking-[1px] uppercase text-center text-dark leading-snug whitespace-pre-line">
        {label}
      </p>
    </div>
  );
});
TOCCard.displayName = "TOCCard";

export default function TOCSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
      });

      tl.from(
        cardsRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.85,
          stagger: 0.12,
          duration: 0.8,
          ease: "expo.out",
        },
        "-=0.3",
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <SectionHeader label="Table Of Content" />

      {/* TITLE */}
      <div
        ref={titleRef}
        className="relative px-6 md:px-12 lg:px-20 pt-12 pb-8"
      >
        {/* ✅ CLEAN BG TEXT (like your old one but slightly stronger) */}
        <div
          className="font-bebas text-stroke absolute top-8 left-6 md:left-12 whitespace-nowrap opacity-50 select-none pointer-events-none"
          style={{
            fontSize: "clamp(60px,10vw,110px)",
            letterSpacing: -2,
          }}
        >
          TABLE OF CONTENT.
        </div>

        {/* Foreground */}
        <div
          className="font-bebas relative z-10 flex items-center gap-3 md:gap-4"
          style={{ fontSize: "clamp(44px,7vw,80px)" }}
        >
          <span className="text-yellow">"</span>
          TABLE <span className="bg-yellow text-dark px-2 md:px-3">
            OF
          </span>{" "}
          CONTENT.
        </div>
      </div>

      {/* CARDS */}
      <div
        className="grid px-6 md:px-12 lg:px-20 pb-20 gap-4 md:gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
      >
        {TOC_CARDS.map((c, i) => (
          <div key={c.label} ref={(el) => (cardsRef.current[i] = el)}>
            <TOCCard {...c} />
          </div>
        ))}
      </div>
    </section>
  );
}
