import { useEffect } from 'react'

export function useScrollManager() {
  useEffect(() => {
    const SPEEDS = {
      slow:    0.12,
      med:     0.22,
      reverse: -0.10,
    }

    const cache = new Map()

    const collect = () => {
      cache.clear()
      Object.entries(SPEEDS).forEach(([key, speed]) => {
        document.querySelectorAll(`[data-parallax="${key}"]`).forEach(el => {
          cache.set(el, speed)
        })
      })
    }

    const update = () => {
      cache.forEach((speed, el) => {
        const rect   = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2 - window.innerHeight / 2
        el.style.transform = `translateY(${center * speed}px)`
      })
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false })
        ticking = true
      }
    }

    collect()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => { collect(); update() }, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', collect)
    }
  }, [])
}
