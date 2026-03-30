import { memo } from 'react'

const ArrowBtn = memo(({ href = '#', onClick, light = false, className = '' }) => (
  <a
    href={href}
    onClick={onClick}
    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-all duration-200 font-bold text-sm no-underline
      ${light
        ? 'border-white text-white hover:bg-yellow hover:border-yellow hover:text-dark'
        : 'border-dark text-dark hover:bg-yellow hover:border-yellow'
      } ${className}`}
  >
    ›
  </a>
))

ArrowBtn.displayName = 'ArrowBtn'
export default ArrowBtn
