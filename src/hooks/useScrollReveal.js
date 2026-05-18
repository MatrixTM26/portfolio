import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(options = {}) {
  const ref     = useRef(null)
  const [state, setState] = useState('hidden')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const threshold  = options.threshold  || 0.15
    const rootMargin = options.rootMargin || '0px'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible')
        } else {
          setState('hidden')
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible: state === 'visible' }
}
