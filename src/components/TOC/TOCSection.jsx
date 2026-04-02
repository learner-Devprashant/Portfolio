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
      x: (x - rect.width / 2) * 0.1,
      y: (y - rect.height / 2) * 0.1,
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
      className="group relative border border-[#ddd] p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col items-center gap-3 sm:gap-4 cursor-pointer overflow-hidden transition-all duration-300 bg-white hover:bg-yellow hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-yellow flex items-center justify-center text-xl sm:text-2xl md:text-3xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-6">
        {icon}
      </div>

      <p className="text-[10px] sm:text-[11px] md:text-[12px] font-extrabold tracking-[1px] uppercase text-center text-dark leading-snug whitespace-pre-line">
        {label}
      </p>
    </div>
  );
});
TOCCard.displayName = "TOCCard";

export default function TOCSection() {
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);
  const mainTextRef = useRef(null);
  const cardsRef = useRef([]);

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span className="inline-block">{char === " " ? "\u00A0" : char}</span>
      </span>
    ));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bgLetters = bgTextRef.current?.querySelectorAll("span span");
      const mainLetters = mainTextRef.current?.querySelectorAll("span span");

      /* RESET */
      gsap.set(bgLetters, { x: -100, opacity: 0 });
      gsap.set(mainLetters, { y: 80, opacity: 0 });
      gsap.set(cardsRef.current, { y: 100, opacity: 0, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none none none",
          invalidateOnRefresh: true,
        },
      });

      /* 🔥 STEP 1: BG TEXT */
      tl.to(bgLetters, {
        x: 0,
        opacity: 1,
        stagger: 0.025,
        duration: 0.6,
        ease: "expo.out",
      });

      /* 🔥 STEP 2: CARDS + MAIN TEXT TOGETHER */
      tl.to(cardsRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.7,
        ease: "expo.out",
      }).to(
        mainLetters,
        {
          y: 0,
          opacity: 1,
          stagger: 0.035,
          duration: 0.6,
          ease: "expo.out",
        },
        "<", // 👈 SAME TIME AS CARDS
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <SectionHeader label="Table Of Content" />

      <div className="relative px-4 sm:px-6 md:px-12 lg:px-20 pt-10 md:pt-12 pb-8">
        <div
          ref={bgTextRef}
          className="font-bebas text-stroke absolute top-6 md:top-8 left-4 sm:left-6 md:left-12 whitespace-nowrap opacity-40 select-none pointer-events-none"
          style={{
            fontSize: "clamp(48px, 12vw, 110px)",
            letterSpacing: "-2px",
          }}
        >
          {splitText("TABLE OF CONTENT.")}
        </div>

        <div
          ref={mainTextRef}
          className="font-bebas relative z-10 flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4"
          style={{ fontSize: "clamp(28px, 8vw, 80px)" }}
        >
          <span className="text-yellow">"</span>
          <span className="flex">{splitText("TABLE")}</span>
          <span className="bg-yellow text-dark px-2 md:px-3">
            {splitText("OF")}
          </span>
          <span className="flex">{splitText("CONTENT.")}</span>
        </div>
      </div>

      <div
        className="grid px-6 md:px-12 lg:px-20 pb-20 gap-4 md:gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
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
