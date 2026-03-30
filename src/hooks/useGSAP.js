import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fade-up reveal on scroll for a ref'd container.
 * @param {React.RefObject} ref  - container ref
 * @param {object} opts          - gsap / ScrollTrigger overrides
 */
export function useScrollReveal(ref, opts = {}) {
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
          ...opts.scrollTrigger,
        },
        ...opts,
      })
    }, ref)
    return () => ctx.revert()
  }, [])
}

/**
 * Stagger children on scroll.
 * @param {React.RefObject} ref  - parent ref
 * @param {string}  selector     - child selector
 * @param {object}  opts
 */
export function useStaggerReveal(ref, selector = '[data-stagger]', opts = {}) {
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll(selector), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          ...opts.scrollTrigger,
        },
        ...opts,
      })
    }, ref)
    return () => ctx.revert()
  }, [])
}

export { gsap, ScrollTrigger }
