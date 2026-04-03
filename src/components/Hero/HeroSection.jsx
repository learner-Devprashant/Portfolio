"use client";

/**
 * ─── FONT SETUP (one-time) ───────────────────────────────────────
 *
 * 1. globals.css  — add at the very top:
//  *    @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Syne:wght@400;600;700;800&display=swap');
 *
 * 2. tailwind.config.js  →  theme.extend.fontFamily:
 *    bebas: ['"Big Shoulders Display"', 'sans-serif'],
 *    syne:  ['Syne', 'sans-serif'],
 *
 * "Big Shoulders Display" is a tighter, more editorial condensed
 * display font that replaces Bebas Neue while keeping the same
 * bold, punchy impact.
 * "Syne" (geometric grotesque) replaces the default sans for badges,
 * name, and body copy.
 * ────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, memo } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TICKER_ITEMS } from "../../utils/data";
import ArrowBtn from "../Shared/ArrowBtn";

gsap.registerPlugin(ScrollTrigger);

/* ─── Floating icon ───────────────────────────────────────────── */
const FloatIcon = memo(({ icon, style }) => (
  <span
    className="absolute text-2xl md:text-3xl opacity-[0.18] float-anim pointer-events-none select-none"
    style={style}
  >
    {icon}
  </span>
));
FloatIcon.displayName = "FloatIcon";

/* ─── Ticker ──────────────────────────────────────────────────── */
const Ticker = memo(() => {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-t border-dark/10 pt-4 mt-8">
      <div className="marquee-track gap-0">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`font-bebas text-base md:text-lg tracking-widest mr-5 ${
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

/* ─── Main Component ──────────────────────────────────────────── */
export default function HeroSection() {
  const isLoaded = useSelector((state) => state.portfolio.preloaderDone);

  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const nameRowRef = useRef(null);
  const photoRef = useRef(null);

  /* Lock scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* GSAP entrance timeline — unchanged logic, same refs */
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const letters = titleRef.current.querySelectorAll("span span");

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

      tl.fromTo(
        quoteRef.current,
        { y: -120, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
      )
        .fromTo(
          badgeRef.current,
          { x: -150, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
        )
        .to(letters, { y: 0, opacity: 1, duration: 0.6, stagger: 0.03 })
        .fromTo(
          photoRef.current,
          { x: 180, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
        )
        .fromTo(
          nameRowRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
        );
    });

    return () => ctx.revert();
  }, [isLoaded]);

  /* Letter-split helper */
  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span className="inline-block">{char === " " ? "\u00A0" : char}</span>
      </span>
    ));

  /* Floating icons — clustered on right half so they never overlap text */
  const floatIcons = [
    { icon: "⚛️", style: { top: "18%", left: "62%" } },
    { icon: "🌐", style: { top: "80%", left: "56%" } },
    { icon: "🍃", style: { top: "14%", left: "80%" } },
    { icon: "🔷", style: { top: "74%", left: "80%" } },
    { icon: "⚡", style: { top: "44%", left: "68%" } },
    { icon: "💻", style: { top: "34%", left: "90%" } },
    { icon: "🧠", style: { top: "56%", left: "52%" } },
    { icon: "🧩", style: { top: "8%", left: "70%" } },
    { icon: "🚀", style: { top: "64%", left: "87%" } },
    { icon: "🟢", style: { top: "28%", left: "84%" } },
  ];

  return (
    <section
      ref={sectionRef}
      className={`
        relative bg-offwhite min-h-screen flex items-center overflow-hidden
        px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24
        py-20 sm:py-24 md:py-16
        transition-opacity duration-700
        ${isLoaded ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* ── Pulse dot ─────────────────────────────── */}
      <div className="absolute top-5 left-5 sm:top-8 sm:left-8 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow pulse-dot z-10" />

      {/* ── Top-right name tag ────────────────────── */}
      <span
        className="
        absolute top-5 right-5 sm:top-8 sm:right-10 md:right-16
        text-[10px] sm:text-xs font-syne font-extrabold tracking-[2px] text-[#888] uppercase z-10
      "
      >
        Prashant Kumar
      </span>

      {/* ── Floating icons (hidden on mobile to avoid clutter) ── */}
      <div className="absolute inset-0 pointer-events-none z-[1] hidden sm:block">
        {floatIcons.map((f, i) => (
          <FloatIcon key={i} {...f} />
        ))}
      </div>

      {/* ═══════════════ MAIN GRID ════════════════ */}
      <div
        className="
        relative z-10 w-full max-w-[1200px] mx-auto
        grid grid-cols-1 lg:grid-cols-2
        gap-10 sm:gap-12 lg:gap-16
        items-center
      "
      >
        {/* ── LEFT CONTENT ────────────────────────── */}
        <div className="relative flex flex-col">
          {/* Opening quote glyph */}
          <span
            ref={quoteRef}
            className="font-bebas text-yellow block leading-none mb-0"
            style={{ fontSize: "clamp(60px, 9vw, 120px)" }}
          >
            "
          </span>

          {/* Role badge */}
          <div
            ref={badgeRef}
            className="
              self-start bg-yellow
              px-3 py-[5px] mb-3
              text-[9px] sm:text-[10px] md:text-xs
              font-syne font-extrabold tracking-[2.5px] uppercase
            "
          >
            MERN Stack Developer
          </div>

          {/* Main title */}
          <h1
            ref={titleRef}
            className="font-bebas leading-[0.86] tracking-tight"
            style={{ fontSize: "clamp(52px, 9.5vw, 155px)" }}
          >
            <span className="block">{splitText("PORT")}</span>
            <span className="block">
              {splitText("FOLIO")}
              <span className="text-yellow">.</span>
            </span>
          </h1>

          {/* Name + CTA row */}
          <div
            ref={nameRowRef}
            className="flex items-center gap-4 sm:gap-5 mt-7 sm:mt-8"
          >
            <ArrowBtn href="#about" />
            <div className="leading-tight">
              <p className="text-sm sm:text-base font-syne font-bold">
                Prashant Kumar
              </p>
              <p className="text-[10px] sm:text-xs font-syne text-gray-500">
                Specialist in Front‑End Development.
              </p>
            </div>
          </div>

          <Ticker />
        </div>

        {/* ── RIGHT IMAGE ──────────────────────────── */}
        {/*
          KEY FIX: The yellow shadow div is now a sibling of the image card
          inside a single `inline-block` wrapper, offset with absolute
          positioning relative to that wrapper — so it is ALWAYS exactly
          aligned with the image regardless of screen width.
        */}
        <div
          ref={photoRef}
          className="
            w-full flex justify-center lg:justify-end items-center
            pt-2 pb-8 sm:pb-10 pr-3 sm:pr-5
          "
        >
          {/* Self-contained image + shadow block */}
          <div className="relative inline-block">
            {/* Yellow offset shadow — perfectly tracks the image */}
            <div
              className="
                absolute inset-0 rounded-md bg-yellow -z-10
                translate-x-3 translate-y-3
                sm:translate-x-4 sm:translate-y-4
                md:translate-x-5 md:translate-y-5
              "
            />

            {/* Image card */}
            <div
              className="
                relative
                w-[230px] sm:w-[285px] md:w-[345px] lg:w-[385px] xl:w-[415px]
                aspect-[3/4]
                rounded-md overflow-hidden
                border-2 border-dark
                group
                transition-all duration-500
                hover:scale-[1.03]
                hover:shadow-[0_24px_56px_rgba(244,163,0,0.45)]
                hover:border-yellow
              "
            >
              {/* Inner hover border overlay */}
              <div
                className="
                absolute inset-0 rounded-md z-10
                border-2 border-transparent
                group-hover:border-yellow
                transition-all duration-500 pointer-events-none
              "
              />

              <img
                src="./mainImage.png"
                alt="Prashant Kumar — profile"
                className="
                  w-full h-full object-cover object-top
                  grayscale group-hover:grayscale-0
                  transition-all duration-500
                "
              />
            </div>

            {/* MERN badge — top-left corner of the card */}
            <div
              className="
              absolute top-3 left-3 z-20
              bg-yellow px-2 py-[4px]
              text-[9px] sm:text-[10px]
              font-syne font-extrabold tracking-[2px] uppercase
            "
            >
              MERN Dev
            </div>

            {/* Closing quote — top-right corner of the card */}
            <div
              className="
              absolute top-2 right-3 z-20
              text-yellow text-2xl sm:text-3xl font-bold opacity-80 leading-none
            "
            >
              "
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
