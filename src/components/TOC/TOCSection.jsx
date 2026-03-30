import { useRef, memo } from "react";
import { useStaggerReveal, useScrollReveal } from "../../hooks/useGSAP";
import { TOC_CARDS } from "../../utils/data";
import SectionHeader from "../shared/SectionHeader";

const TOCCard = memo(({ icon, label, target }) => (
  <div
    data-stagger
    className="toc-card bg-cardBg border border-[#ddd] p-10 flex flex-col items-center gap-4 cursor-pointer relative overflow-hidden"
    onClick={() =>
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
    }
  >
    <div className="toc-icon w-16 h-16 rounded-full bg-yellow flex items-center justify-center text-3xl transition-all duration-250">
      {icon}
    </div>
    <p className="text-[12px] font-extrabold tracking-[1px] uppercase text-center text-dark leading-snug whitespace-pre-line transition-colors duration-250">
      {label}
    </p>
  </div>
));
TOCCard.displayName = "TOCCard";

export default function TOCSection() {
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useScrollReveal(titleRef);
  useStaggerReveal(cardsRef, "[data-stagger]");

  return (
    <section className="overflow-hidden">
      <SectionHeader label="Table Of Content" />

      {/* Title area */}
      <div
        ref={titleRef}
        className="relative px-20 pt-12 pb-8 overflow-hidden gsap-target"
      >
        {/* Background stroke text */}
        <div
          className="font-bebas text-stroke absolute top-8 left-12 whitespace-nowrap opacity-40 select-none pointer-events-none"
          style={{ fontSize: "clamp(60px,10vw,110px)", letterSpacing: -2 }}
        >
          TABLE OF CONTENT.
        </div>

        {/* Foreground title */}
        <div
          className="font-bebas relative z-10 flex items-center gap-4"
          style={{ fontSize: "clamp(48px,7vw,80px)" }}
        >
          <span
            className="text-yellow"
            style={{ fontSize: "1.2em", lineHeight: 0.7 }}
          >
            "
          </span>
          TABLE{" "}
          <span className="bg-yellow text-dark px-3 inline-block">OF</span>{" "}
          CONTENT.
        </div>
      </div>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="grid px-20 pb-20"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {TOC_CARDS.map((c) => (
          <TOCCard key={c.label} {...c} />
        ))}
      </div>
    </section>
  );
}
