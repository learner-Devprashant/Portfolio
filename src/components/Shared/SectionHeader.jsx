import { memo } from "react";
import ArrowBtn from "./ArrowBtn";

const SectionHeader = memo(({ label, light = false, id }) => (
  <div
    id={id}
    className={`flex items-center gap-4 px-20 pt-5 text-[11px] font-extrabold tracking-[3px] uppercase
      ${light ? "text-offwhite" : "text-dark"}`}
  >
    <ArrowBtn light={light} />
    <span>{label}</span>
    <div className={`flex-1 h-px ${light ? "bg-white/20" : "bg-[#ccc]"}`} />
  </div>
));

SectionHeader.displayName = "SectionHeader";
export default SectionHeader;
