import { memo } from "react";

const Footer = memo(() => (
  <footer
    className="
      bg-yellow 
      px-5 sm:px-10 md:px-16 lg:px-20 
      py-8 sm:py-10 
      flex flex-col md:flex-row 
      items-center md:items-start 
      justify-between 
      gap-6
    "
  >
    {/* Name */}
    <span className="font-bebas text-dark tracking-[2px] text-3xl sm:text-4xl text-center md:text-left">
      Prashant Kumar.
    </span>

    {/* Info */}
    <div className="text-center md:text-right text-xs sm:text-sm font-semibold text-dark opacity-70 leading-relaxed">
      MERN Stack Developer
      <br />
      Available for Freelance &amp; Full-time
      <br />
      prashanttkumar12@gmail.com
    </div>
  </footer>
));

Footer.displayName = "Footer";
export default Footer;
