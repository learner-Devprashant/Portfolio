import { useRef, memo } from "react";
import { useStaggerReveal, useScrollReveal } from "../../hooks/useGSAP";
import {
  SKILLS_PRIMARY,
  SKILLS_ALSO,
  EXPERIENCE,
  EDUCATION,
} from "../../utils/data";
import SectionHeader from "../shared/SectionHeader";

/* ── Skill Chip ── */
const SkillChip = memo(({ label, yellow }) => (
  <span
    className={`skill-chip text-[9px] font-extrabold px-3 py-1 tracking-[1px] uppercase rounded-sm cursor-default
      ${
        yellow
          ? "bg-yellow text-dark hover:bg-dark hover:text-yellow"
          : "bg-dark text-offwhite hover:bg-yellow hover:text-dark"
      }`}
  >
    {label}
  </span>
));
SkillChip.displayName = "SkillChip";

/* ── Experience item ── */
const ExpItem = memo(({ role, company, period }) => (
  <div className="border-l-2 border-yellow pl-3 mb-4">
    <p className="text-[11px] font-bold">{role}</p>
    <p className="text-[10px] text-[#888] mb-0.5">{company}</p>
    <p className="text-[9px] text-[#888] tracking-[0.5px]">{period}</p>
  </div>
));
ExpItem.displayName = "ExpItem";

/* ── Education item ── */
const EduItem = memo(({ year, title, school, sub }) => (
  <div className="mb-4">
    <span className="inline-block bg-yellow text-[9px] font-extrabold px-2 py-0.5 tracking-[1px] mb-1">
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
EduItem.displayName = "EduItem";

export default function AboutSection() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const gridRef = useRef(null);

  useScrollReveal(leftRef);
  useScrollReveal(rightRef, { scrollTrigger: { start: "top 90%" } });
  useStaggerReveal(gridRef, "[data-stagger]");

  return (
    <section id="about">
      <SectionHeader label="About" id="about-header" />

      <div
        className="grid gap-16 px-20 py-10 pb-16"
        style={{ gridTemplateColumns: "200px 1fr", alignItems: "start" }}
      >
        {/* LEFT col */}
        <div ref={leftRef} className="gsap-target">
          {/* Photo placeholder */}
          <div
            className="relative w-[190px] h-[230px] rounded-sm flex items-center justify-center overflow-hidden border-2 border-dark"
            style={{ background: "linear-gradient(160deg,#222,#444)" }}
          >
            <span
              className="font-bebas text-yellow opacity-50"
              style={{ fontSize: 60 }}
            >
              AS
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-yellow opacity-[0.15]" />
          </div>

          {/* Contact box */}
          <div className="mt-5 bg-dark p-4 rounded-sm">
            <h4 className="text-yellow text-[10px] font-extrabold tracking-[2px] uppercase mb-3">
              Let's Work Together
            </h4>
            {[
              { icon: "✉", text: "aryan@example.com" },
              { icon: "📞", text: "+91 98765 43210" },
              { icon: "🌐", text: "aryandev.io" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 mb-2 text-offwhite text-[9px] font-medium"
              >
                <div className="w-5 h-5 bg-yellow rounded-sm flex items-center justify-center text-[10px] text-dark flex-shrink-0">
                  {icon}
                </div>
                {text}
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              {["in", "GH", "tw"].map((s) => (
                <div
                  key={s}
                  className="w-7 h-7 bg-[#222] rounded-full flex items-center justify-center text-[11px] text-offwhite cursor-pointer transition-colors duration-200 hover:bg-yellow hover:text-dark"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT col */}
        <div ref={rightRef} className="gsap-target">
          {/* Hello */}
          <div
            className="font-bebas flex items-center gap-2 leading-none mb-4"
            style={{ fontSize: 54 }}
          >
            <span
              className="text-yellow"
              style={{ fontSize: 80, lineHeight: 0.6 }}
            >
              "
            </span>
            HELLO.
          </div>

          <p className="text-[11.5px] leading-[1.85] text-[#333] max-w-[520px] mb-4">
            I'm <strong className="text-dark font-bold">Aryan Sharma</strong>, a
            self-taught MERN Stack Developer with over 3 years of experience
            building scalable, full-stack web applications. I love crafting
            digital products that don't just function well — they deliver
            exceptional user experiences.
          </p>
          <p className="text-[11.5px] leading-[1.85] text-[#333] max-w-[520px] mb-6">
            I also work with cloud services and DevOps practices to ensure my
            apps are fast, secure, and always available. For me, development is
            about connecting clean code with real-world solutions.
          </p>

          {/* 4-col grid */}
          <div ref={gridRef} className="grid grid-cols-2 gap-x-12 gap-y-6">
            {/* Education */}
            <div data-stagger>
              <p className="text-[13px] font-extrabold tracking-[1px] mb-3 underline underline-offset-4 decoration-yellow">
                Education
              </p>
              {EDUCATION.map((e) => (
                <EduItem key={e.year} {...e} />
              ))}
            </div>

            {/* Skills */}
            <div data-stagger>
              <p className="text-[13px] font-extrabold tracking-[1px] mb-3 underline underline-offset-4 decoration-yellow">
                Software Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS_PRIMARY.map((s, i) => (
                  <SkillChip key={s} label={s} yellow={i % 3 === 0} />
                ))}
              </div>
            </div>

            {/* Experience */}
            <div data-stagger>
              <p className="text-[13px] font-extrabold tracking-[1px] mb-3 underline underline-offset-4 decoration-yellow">
                Working Experience
              </p>
              {EXPERIENCE.map((e) => (
                <ExpItem key={e.role} {...e} />
              ))}
            </div>

            {/* Also know */}
            <div data-stagger>
              <p className="text-[13px] font-extrabold tracking-[1px] mb-3 underline underline-offset-4 decoration-yellow">
                Also Know
              </p>
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
