import { useRef, memo } from "react";
import { useStaggerReveal, useScrollReveal } from "../../hooks/useGSAP";
import { TOC_CARDS } from "../../utils/data";
import SectionHeader from "../shared/SectionHeader";

const TOCCard = memo(({ icon, label, target }) => (
  <div
    data-stagger
    className="toc-card bg-cardBg border border-[#ddd] p-6 sm:p-8 md:p-10 
    flex flex-col items-center gap-4 cursor-pointer relative overflow-hidden 
    text-center hover:shadow-lg transition"
    onClick={() =>
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
    }
  >
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-yellow flex items-center justify-center text-2xl sm:text-3xl">
      {icon}
    </div>

    <p className="text-xs sm:text-sm font-extrabold tracking-[1px] uppercase text-dark whitespace-pre-line">
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

      {/* Title */}
      <div
        ref={titleRef}
        className="relative px-5 sm:px-10 md:px-16 lg:px-20 pt-10 pb-6"
      >
        {/* Background */}
        <div className="hidden sm:block font-bebas text-stroke absolute top-6 left-6 opacity-30 text-[10vw] whitespace-nowrap">
          TABLE OF CONTENT.
        </div>

        {/* Foreground */}
        <div className="font-bebas relative z-10 flex items-center gap-3 text-3xl sm:text-5xl md:text-6xl">
          <span className="text-yellow text-4xl sm:text-6xl">"</span>
          TABLE <span className="bg-yellow text-dark px-2">OF</span> CONTENT.
        </div>
      </div>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="
          grid gap-6 px-5 sm:px-10 md:px-16 lg:px-20 pb-16
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4
        "
      >
        {TOC_CARDS.map((c, i) => (
          <TOCCard key={i} {...c} />
        ))}
      </div>
    </section>
  );
}
