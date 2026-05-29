import { useEffect } from 'react'

export function useScrollManager() {
  useEffect(() => {
    const SPEEDS = { slow: 0.05, med: 0.10, reverse: -0.07 }

    let entries = []
    let rafId   = null
    let cur     = window.scrollY
    let tgt     = window.scrollY

    const lerp = (a, b, t) => a + (b - a) * t

    const collect = () => {
      entries = []
      Object.entries(SPEEDS).forEach(([key, speed]) => {
        document.querySelectorAll(`[data-parallax="${key}"]`).forEach(el => {
          entries.push({ el, speed })
        })
      })
    }

    const apply = () => {
      entries.forEach(({ el, speed }) => {
        const section = el.closest('section') || el.parentElement
        const rect    = section ? section.getBoundingClientRect() : { top: 0, height: 0 }
        const offset  = rect.top + rect.height * 0.5 - window.innerHeight * 0.5
        el.style.transform = `translateY(${offset * speed}px) translateZ(0)`
      })
    }

    const tick = () => {
      cur = lerp(cur, tgt, 0.08)
      apply()
      if (Math.abs(tgt - cur) > 0.3) {
        rafId = requestAnimationFrame(tick)
      } else {
        cur   = tgt
        rafId = null
      }
    }

    const onScroll = () => {
      tgt = window.scrollY
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    const onResize = () => {
      collect()
      tgt = cur = window.scrollY
      apply()
    }

    collect()
    apply()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])
}
