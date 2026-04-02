"use client";

import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = memo(() => {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 🔹 NAME (LEFT → RIGHT) */
      gsap.fromTo(
        nameRef.current,
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      /* 🔹 INFO (RIGHT → LEFT) */
      gsap.fromTo(
        infoRef.current,
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="
        bg-yellow
        px-4 sm:px-8 md:px-16 lg:px-20
        py-4 sm:py-5
        flex flex-col md:flex-row
        items-center md:items-start
        justify-between
        gap-3 sm:gap-4
      "
    >
      {/* 🔹 NAME */}
      <span
        ref={nameRef}
        className="
          font-bebas text-dark tracking-[2px]
          text-[28px] sm:text-[34px] md:text-[40px]
          text-center md:text-left
        "
      >
        Prashant Kumar.
      </span>

      {/* 🔹 INFO */}
      <div
        ref={infoRef}
        className="
          text-center md:text-right
          text-[11px] sm:text-[12px] md:text-[13px]
          font-semibold text-dark opacity-80
          leading-relaxed
        "
      >
        MERN Stack Developer
        <br />
        Available for Freelance &amp; Full-time
        <br />
        prashanttkumar12@gmail.com
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
