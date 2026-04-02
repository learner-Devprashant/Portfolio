"use client";

import { useEffect, useRef, memo } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TICKER_ITEMS } from "../../utils/data";
import ArrowBtn from "../Shared/ArrowBtn";

gsap.registerPlugin(ScrollTrigger);

/* Floating icon */
const FloatIcon = memo(({ icon, style }) => (
  <span
    className="absolute text-3xl opacity-[0.2] float-anim pointer-events-none"
    style={style}
  >
    {icon}
  </span>
));
FloatIcon.displayName = "FloatIcon";

/* Ticker */
const Ticker = memo(() => {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-t border-[#cccc] pt-4 mt-8">
      <div className="marquee-track gap-0">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`font-bebas text-lg tracking-widest mr-6 ${
              item === "●" ? "text-yellow" : "text-dark/30"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
});
Ticker.displayName = "Ticker";

export default function HeroSection() {
  const isLoaded = useSelector((state) => state.portfolio.preloaderDone);

  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const nameRowRef = useRef(null);
  const photoRef = useRef(null);

  // scroll top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const letters = titleRef.current.querySelectorAll("span span");

      // initial state
      gsap.set(
        [
          quoteRef.current,
          badgeRef.current,
          nameRowRef.current,
          photoRef.current,
        ],
        { opacity: 0 },
      );

      gsap.set(letters, { y: 120, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl
        // TOP
        .fromTo(
          quoteRef.current,
          { y: -120, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
        )

        // LEFT
        .fromTo(
          badgeRef.current,
          { x: -150, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
        )

        // TEXT
        .to(letters, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.03,
        })

        // RIGHT
        .fromTo(
          photoRef.current,
          { x: 180, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
        )

        // BOTTOM
        .fromTo(
          nameRowRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
        );
    });

    return () => ctx.revert();
  }, [isLoaded]);

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span className="inline-block">{char}</span>
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className={`relative bg-offwhite min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-16 overflow-hidden transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute top-6 left-6 md:top-8 md:left-8 w-4 h-4 md:w-6 md:h-6 rounded-full bg-yellow pulse-dot z-10" />

      <span className="absolute top-6 right-6 md:top-10 md:right-16 text-xs md:text-sm font-extrabold tracking-[2px] text-[#888] uppercase z-10">
        Prashant Kumar
      </span>

      <div className="absolute inset-0 pointer-events-none z-[1]">
        {[
          { icon: "⚛️", style: { top: "18%", left: "60%" } },
          { icon: "🌐", style: { top: "82%", left: "55%" } },
          { icon: "🍃", style: { top: "16%", left: "78%" } },
          { icon: "🔷", style: { top: "76%", left: "78%" } },
          { icon: "⚡", style: { top: "45%", left: "66%" } },
          { icon: "💻", style: { top: "35%", left: "42%" } },
          { icon: "🧠", style: { top: "55%", left: "50%" } },
          { icon: "🧩", style: { top: "8%", left: "68%" } },
          { icon: "🚀", style: { top: "65%", left: "85%" } },
          { icon: "🟢", style: { top: "30%", left: "82%" } },
        ].map((f, i) => (
          <FloatIcon key={i} {...f} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <span
            ref={quoteRef}
            className="font-bebas text-yellow block leading-none"
            style={{ fontSize: "clamp(80px, 10vw, 120px)" }}
          >
            "
          </span>

          <div
            ref={badgeRef}
            className="inline-block bg-yellow px-3 py-1 text-[10px] md:text-xs font-extrabold tracking-[2px] uppercase mb-2"
          >
            MERN Stack Developer
          </div>

          <h1
            ref={titleRef}
            className="font-bebas leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(60px, 10vw, 160px)" }}
          >
            <span className="block">{splitText("PORT")}</span>
            <span className="block">
              {splitText("FOLIO")}
              <span className="text-yellow">.</span>
            </span>
          </h1>

          <div
            ref={nameRowRef}
            className="flex items-center gap-4 md:gap-5 mt-6 md:mt-8"
          >
            <ArrowBtn href="#about" />
            <div className="leading-tight">
              <p className="text-sm md:text-base font-bold">Prashant Kumar</p>
              <p className="text-[10px] md:text-xs text-gray-500">
                Specialist in FrontEnd Development.
              </p>
            </div>
          </div>

          <Ticker />
        </div>

        <div
          ref={photoRef}
          className="relative h-[320px] md:h-[420px] lg:h-[480px] w-full flex justify-center lg:justify-end"
        >
          <div className="absolute bottom-0 right-0 w-[70%] md:w-[280px] h-[80%] md:h-[420px] bg-black rounded-sm" />

          <div className="absolute bottom-4 md:bottom-5 right-4 md:right-5 w-[65%] md:w-[260px] h-[75%] md:h-[380px] border-[3px] border-yellow rounded-sm flex items-center justify-center">
            <span className="font-bebas text-yellow opacity-40 text-[60px] md:text-[90px]">
              PK
            </span>
          </div>

          <div className="absolute top-4 left-0 bg-yellow px-2 md:px-3 py-1 text-[8px] md:text-[9px] font-extrabold tracking-[2px] uppercase">
            MERN Dev
          </div>

          <div className="absolute top-14 right-0 text-right text-[8px] md:text-[9px] font-bold text-[#100202] tracking-[1px] leading-relaxed">
            Selected Best
            <br />
            Full Stack Developer
            <br />
            2025
          </div>
        </div>
      </div>
    </section>
  );
}
