"use client";

import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../../utils/data";
import SectionHeader from "../Shared/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

/* 🔥 CARD */
const ProjectCard = memo(({ title, tags, desc }) => {
  return (
    <div
      className="group relative flex flex-col justify-between h-full
      min-h-[200px] md:min-h-[220px] lg:min-h-[240px]
      border border-[#2a2a2a]
      bg-gradient-to-br from-[#111] to-[#1a1a1a]
      p-4 sm:p-5 md:p-6
      transition-all duration-300
      hover:-translate-y-1"
    >
      {/* 🔥 HOVER BORDER */}
      <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow transition-all duration-300 group-hover:w-full" />
      <span className="absolute left-0 bottom-0 h-0 w-[3px] bg-yellow transition-all duration-300 group-hover:h-full" />

      {/* TAGS */}
      <div className="flex gap-2 flex-wrap mb-3">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="font-montserrat bg-yellow text-black text-[9px] sm:text-[10px] font-extrabold tracking-[1px] px-2 sm:px-3 py-1 uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* TITLE */}
      <h3
        className="text-white font-semibold uppercase 
      text-[16px] sm:text-[18px] md:text-[20px] leading-snug"
      >
        {title}
      </h3>

      {/* DESC */}
      <p
        className="text-gray-400 font-syne 
      text-[11px] sm:text-[12px] md:text-[13px] 
      leading-[1.7] mt-2"
      >
        {desc}
      </p>

      {/* BUTTON */}
      <span
        className="mt-3 text-yellow font-syne 
        text-[10px] sm:text-[11px] md:text-[12px]
        font-extrabold tracking-[2px] uppercase
        flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
      >
        VIEW PROJECT →
      </span>
    </div>
  );
});
ProjectCard.displayName = "ProjectCard";

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);
  const mainTextRef = useRef(null);
  const cardsRef = useRef([]);

  /* 🔹 SPLIT TEXT */
  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="font-syne inline-block overflow-hidden">
        <span className="inline-block">{char === " " ? "\u00A0" : char}</span>
      </span>
    ));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const baseDelay = 0.3;

      const bgLetters = bgTextRef.current?.querySelectorAll("span span");

      if (bgLetters) {
        gsap.set(bgLetters, { x: -100, opacity: 0 });

        gsap.to(bgLetters, {
          x: 0,
          opacity: 1,
          stagger: 0.03,
          delay: baseDelay,
          duration: 0.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      gsap.fromTo(
        cardsRef.current,
        { y: 100, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          delay: baseDelay + 0.3,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      const mainLetters = mainTextRef.current?.querySelectorAll("span span");

      if (mainLetters) {
        gsap.set(mainLetters, { y: 80, opacity: 0 });

        gsap.to(mainLetters, {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          delay: baseDelay + 0.8,
          duration: 0.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="font-syne bg-black overflow-hidden">
      <SectionHeader label="Projects" light />

      {/* 🔥 TITLE */}
      <div className="relative px-4 sm:px-6 md:px-12 lg:px-20 pt-10 md:pt-12 pb-8">
        {/* BG TEXT */}
        <div
          ref={bgTextRef}
          className="font-bebas text-stroke absolute top-6 md:top-8 left-4 sm:left-6 md:left-12 whitespace-nowrap opacity-30 text-white"
          style={{
            fontSize: "clamp(50px, 12vw, 130px)", // 🔥 responsive
            letterSpacing: "-2px",
          }}
        >
          {splitText("PROJECTS.")}
        </div>

        {/* MAIN TEXT */}
        <div
          ref={mainTextRef}
          className="font-bebas relative z-10 flex items-center gap-2 sm:gap-3 md:gap-4 text-white"
          style={{
            fontSize: "clamp(32px, 8vw, 90px)", // 🔥 responsive
          }}
        >
          <span className="text-yellow">"</span>
          <span className="flex">{splitText("PROJECTS.")}</span>
        </div>
      </div>

      {/* 🔥 GRID */}
      <div
        className="grid px-4 sm:px-6 md:px-12 lg:px-20 pb-16 md:pb-20
        gap-3 sm:gap-4 md:gap-5
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((p, i) => (
          <div key={i} ref={(el) => (cardsRef.current[i] = el)}>
            <ProjectCard {...p} />
          </div>
        ))}
      </div>
    </section>
  );
}
