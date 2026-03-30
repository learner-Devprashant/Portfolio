import { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { TICKER_ITEMS } from "../../utils/data";
import ArrowBtn from "../shared/ArrowBtn";

/* ── Floating tech icon ── */
const FloatIcon = memo(({ icon, style }) => (
  <span
    className="absolute text-3xl opacity-[0.13] float-anim pointer-events-none"
    style={style}
  >
    {icon}
  </span>
));
FloatIcon.displayName = "FloatIcon";

/* ── Ticker strip ── */
const Ticker = memo(() => {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-t border-[#ccc] pt-4 mt-8">
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

/* ── Main Hero ── */
export default function HeroSection() {
  const quoteRef = useRef(null);
  const badgeRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const nameRowRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(quoteRef.current, { y: -30, opacity: 0, duration: 0.7 }, 0.1)
      .from(badgeRef.current, { x: -40, opacity: 0, duration: 0.6 }, 0.25)
      .from(title1Ref.current, { x: -50, opacity: 0, duration: 0.7 }, 0.35)
      .from(title2Ref.current, { x: -50, opacity: 0, duration: 0.7 }, 0.48)
      .from(nameRowRef.current, { y: 20, opacity: 0, duration: 0.6 }, 0.62)
      .from(photoRef.current, { x: 50, opacity: 0, duration: 0.8 }, 0.4);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-offwhite flex items-center px-20 py-16 overflow-hidden"
    >
      {/* Pulse dot top-left */}
      <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-yellow pulse-dot z-10" />

      {/* Year label top-right */}
      <span className="absolute top-10 right-16 text-[11px] font-extrabold tracking-[2px] text-[#888] uppercase z-10">
        Ref / / / 2025
      </span>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {[
          {
            icon: "⚛️",
            style: { top: "15%", left: "62%", animationDelay: "0s" },
          },
          {
            icon: "🟢",
            style: { top: "70%", left: "58%", animationDelay: "1s" },
          },
          {
            icon: "🍃",
            style: { top: "22%", left: "80%", animationDelay: "2s" },
          },
          {
            icon: "🔷",
            style: { top: "78%", left: "75%", animationDelay: "1.5s" },
          },
          {
            icon: "⚡",
            style: { top: "45%", left: "68%", animationDelay: "0.5s" },
          },
        ].map((f, i) => (
          <FloatIcon key={i} {...f} />
        ))}
      </div>

      {/* Grid */}
      <div
        className="relative z-10 w-full max-w-[1100px] mx-auto grid gap-10"
        style={{ gridTemplateColumns: "1fr 340px", alignItems: "center" }}
      >
        {/* LEFT */}
        <div>
          {/* Big quote mark */}
          <span
            ref={quoteRef}
            className="font-bebas text-yellow block"
            style={{ fontSize: 120, lineHeight: 0.7, marginBottom: -10 }}
          >
            "
          </span>

          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-block bg-yellow px-3 py-1 text-[11px] font-extrabold tracking-[2px] uppercase mb-2"
          >
            MERN Stack Developer
          </div>

          {/* Big title */}
          <h1
            className="font-bebas leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(90px,12vw,160px)" }}
          >
            <span ref={title1Ref} className="block">
              PORT
            </span>
            <span ref={title2Ref} className="block">
              FOLIO<span className="text-yellow">.</span>
            </span>
          </h1>

          {/* Name row */}
          <div ref={nameRowRef} className="flex items-center gap-5 mt-8">
            <ArrowBtn href="#about" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-dark">Aryan Sharma</span>
              <span className="text-[10px] text-[#888] font-medium tracking-[0.5px]">
                Selected Best · Full Stack Developer 2025
              </span>
            </div>
          </div>

          {/* Ticker */}
          <Ticker />
        </div>

        {/* RIGHT — photo */}
        <div ref={photoRef} className="relative h-[480px]">
          <div className="absolute bottom-0 right-0 w-[280px] h-[420px] bg-dark rounded-sm" />
          <div
            className="absolute bottom-5 right-5 w-[260px] h-[380px] rounded-sm overflow-hidden flex items-center justify-center border-[3px] border-yellow"
            style={{ background: "linear-gradient(135deg,#1a1a1a,#333)" }}
          >
            <span
              className="font-bebas text-yellow tracking-tighter opacity-40"
              style={{ fontSize: 90 }}
            >
              AS
            </span>
          </div>
          <div className="absolute top-5 left-0 bg-yellow px-3 py-1.5 text-[9px] font-extrabold tracking-[2px] uppercase">
            MERN Dev
          </div>
          <div className="absolute top-16 right-0 text-right text-[9px] font-bold text-[#888] tracking-[1px] leading-relaxed">
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
