import { memo } from 'react'

const Footer = memo(() => (
  <footer className="bg-yellow px-20 py-10 flex items-center justify-between">
    <span className="font-bebas text-dark tracking-[2px]" style={{ fontSize: 36 }}>
      ARYAN SHARMA.
    </span>
    <div className="text-right text-[11px] font-semibold text-dark opacity-70 leading-[1.8]">
      MERN Stack Developer<br />
      Available for Freelance &amp; Full-time<br />
      aryan@example.com
    </div>
  </footer>
))

Footer.displayName = 'Footer'
export default Footer
