"use client";

import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import {
  SKILLS_PRIMARY,
  SKILLS_ALSO,
  EXPERIENCE,
  EDUCATION,
} from "../../utils/data";
import SectionHeader from "../shared/SectionHeader";
import { FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

/* Skill Chip */
const SkillChip = memo(({ label, yellow }) => (
  <span
    className={`text-[9px] font-extrabold px-3 py-1 tracking-[1px] uppercase rounded-sm
    transition-all duration-300 cursor-default
    ${
      yellow
        ? "bg-yellow text-dark hover:bg-dark hover:text-yellow hover:scale-110"
        : "bg-dark text-offwhite hover:bg-yellow hover:text-dark hover:scale-110"
    }`}
  >
    {label}
  </span>
));

/* Experience */
const ExpItem = memo(({ role, company, period }) => (
  <div className="border-l-2 border-yellow pl-3 mb-4 hover:translate-x-1 transition-all duration-300">
    <p className="text-[11px] font-bold">{role}</p>
    <p className="text-[10px] text-[#888] mb-0.5">{company}</p>
    <p className="text-[9px] text-[#888]">{period}</p>
  </div>
));

/* Education */
const EduItem = memo(({ year, title, school, sub }) => (
  <div className="mb-4 hover:translate-x-1 transition-all duration-300">
    <span className="inline-block bg-yellow text-[9px] font-extrabold px-2 py-0.5 mb-1">
      {year}
    </span>
    <p className="text-[11px] font-bold">{title}</p>
    <p className="text-[10px] text-[#888]">
      {school}
      {sub && (
        <>
          <br />
          {sub}
        </>
      )}
    </p>
  </div>
));

export default function AboutSection() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const contactRef = useRef(null);
  const helloRef = useRef(null);

  /* Split HELLO text */
  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span className="inline-block">{char === " " ? "\u00A0" : char}</span>
      </span>
    ));

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* SECTION ENTRY */
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      /* HELLO TEXT ANIMATION */
      const letters = helloRef.current.querySelectorAll("span span");

      gsap.set(letters, { y: 100, opacity: 0 });

      gsap.to(letters, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: "expo.out",
        scrollTrigger: {
          trigger: helloRef.current,
          start: "top 85%",
        },
      });

      /* FLOATING IMAGE */
      gsap.to(photoRef.current, {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* CONTACT GLOW */
      gsap.to(contactRef.current, {
        boxShadow: "0px 0px 25px rgba(255,255,0,0.15)",
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });

      /* HELLO FLOAT */
      gsap.to(helloRef.current, {
        y: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  /* 3D Tilt */
  const handleTilt = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;

    gsap.to(el, {
      rotateX,
      rotateY,
      transformPerspective: 500,
      duration: 0.3,
    });
  };

  const resetTilt = (el) => {
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section id="about" ref={sectionRef}>
      <SectionHeader label="About" id="about-header" />

      <div className="grid lg:grid-cols-[220px_1fr] gap-12 px-6 md:px-12 lg:px-20 py-10">
        {/* LEFT */}
        <div>
          {/* IMAGE */}
          <div
            ref={photoRef}
            onMouseMove={(e) => handleTilt(e, photoRef.current)}
            onMouseLeave={() => resetTilt(photoRef.current)}
            className="relative w-[190px] h-[230px] mx-auto lg:mx-0 rounded-sm flex items-center justify-center overflow-hidden border-2 border-dark
            transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            style={{ background: "linear-gradient(160deg,#222,#444)" }}
          >
            <span className="font-bebas text-yellow opacity-50 text-[60px]">
              PK
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-yellow opacity-[0.15]" />
          </div>

          {/* CONTACT */}
          <div
            ref={contactRef}
            className="mt-5 bg-dark p-4 rounded-sm transition-all duration-300
            hover:scale-[1.03] hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
          >
            <h4 className="text-yellow text-[10px] font-extrabold mb-3">
              Let's Work Together
            </h4>

            {[
              {
                icon: <MdEmail />,
                text: "prashanttkumar12@gmail.com",
              },
              {
                icon: <MdPhone />,
                text: "+91 7617552493",
              },
              {
                icon: <FaInstagram />,
                text: "learner-Devprashant",
              },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 mb-2 text-offwhite text-[9px]
                transition-all duration-300 hover:translate-x-2 hover:text-yellow"
              >
                <div
                  className="w-5 h-5 bg-yellow rounded-sm flex items-center justify-center text-dark
                transition-all duration-300 hover:scale-110"
                >
                  {icon}
                </div>
                {text}
              </div>
            ))}

            {/* SOCIAL */}
            <div className="flex gap-2 mt-3">
              {["in", "GH", "X"].map((s) => (
                <div
                  key={s}
                  className="w-7 h-7 bg-[#222] rounded-full text-white flex items-center justify-center text-[11px]
                  transition-all duration-300 hover:bg-yellow hover:text-dark hover:scale-125 hover:-translate-y-1 cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* HELLO ANIMATION */}
          <div
            ref={helloRef}
            className="font-bebas flex items-center gap-2 mb-4 leading-none"
            style={{ fontSize: "clamp(40px,6vw,54px)" }}
          >
            <span className="text-yellow text-[70px] md:text-[80px]">"</span>

            <span className="flex">
              {splitText("HELLO")}
              <span className="text-yellow">{splitText(".")}</span>
            </span>
          </div>

          {/* TEXT */}
          <p className="text-[11.5px] leading-[1.85] text-[#333] max-w-[520px] mb-4">
            I'm <strong className="text-dark font-bold">Prashant Kumar</strong>,
            a self-taught MERN Stack Developer with over 1 year of experience
            building scalable, full-stack web applications.
          </p>

          <p className="text-[11.5px] leading-[1.85] text-[#333] max-w-[520px] mb-6">
            I also work with cloud services and DevOps practices.
          </p>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold mb-3">Education</p>
              {EDUCATION.map((e) => (
                <EduItem key={e.year} {...e} />
              ))}
            </div>

            <div>
              <p className="font-bold mb-3">Software Skills</p>
              <div className="flex flex-wrap gap-2">
                {SKILLS_PRIMARY.map((s, i) => (
                  <SkillChip key={s} label={s} yellow={i % 3 === 0} />
                ))}
              </div>
            </div>

            <div>
              <p className="font-bold mb-3">Working Experience</p>
              {EXPERIENCE.map((e) => (
                <ExpItem key={e.role} {...e} />
              ))}
            </div>

            <div>
              <p className="font-bold mb-3">Also Know</p>
              <div className="flex flex-wrap gap-2">
                {SKILLS_ALSO.map((s, i) => (
                  <SkillChip key={s} label={s} yellow={i % 2 === 0} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
