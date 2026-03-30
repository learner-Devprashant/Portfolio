import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { gsap } from 'gsap'
import { setPreloaderDone } from '../../store/portfolioSlice'

export default function Preloader() {
  const el = useRef(null)
  const textRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        dispatch(setPreloaderDone(true))
      }
    })

    // Reveal text chars
    tl.from(textRef.current, {
      y: 80,
      opacity: 0,
      duration: 0.6,
      ease: 'power4.out',
    })
    .to(textRef.current, {
      letterSpacing: '20px',
      duration: 0.5,
      ease: 'power2.inOut',
    }, '+=0.2')
    // Slide entire preloader up
    .to(el.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    }, '+=0.1')
  }, [])

  return (
    <div
      ref={el}
      className="fixed inset-0 bg-dark flex items-center justify-center z-[9999] overflow-hidden"
    >
      <div className="overflow-hidden">
        <p
          ref={textRef}
          className="font-bebas text-yellow"
          style={{ fontSize: 'clamp(60px,12vw,120px)', letterSpacing: '4px' }}
        >
          PORTFOLIO
        </p>
      </div>
    </div>
  )
}
