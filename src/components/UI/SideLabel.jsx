import { memo } from "react";

const SideLabel = memo(() => (
  <span className="fixed right-[-28px] top-[140px] writing-vertical text-[10px] font-extrabold tracking-[3px] text-[#888] uppercase z-50 pointer-events-none">
    Portfolio 2025
  </span>
));

SideLabel.displayName = "SideLabel";
export default SideLabel;
