import { useState, useEffect } from 'react'
import '../styles/Loader.css'

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [hidden,   setHidden]   = useState(false)

  useEffect(() => {
    let p = 0
    const steps = [
      { target: 40,  delay: 80  },
      { target: 70,  delay: 120 },
      { target: 90,  delay: 180 },
      { target: 100, delay: 100 },
    ]

    let idx = 0
    const next = () => {
      if (idx >= steps.length) return
      const { target, delay } = steps[idx++]
      const diff = target - p
      let count  = 0
      const tick = setInterval(() => {
        count++
        p = Math.min(target, p + Math.ceil(diff / 8))
        setProgress(p)
        if (count >= 8 || p >= target) {
          clearInterval(tick)
          if (idx < steps.length) setTimeout(next, delay)
          else setTimeout(() => setHidden(true), 300)
        }
      }, delay / 8)
    }
    next()
  }, [])

  if (hidden) return null

  return (
    <div className={`loader-overlay${progress >= 100 ? ' hidden' : ''}`}>
      <div className="loader-logo">
        <i className="fa-solid fa-shield-halved" />
        Matrix<span className="loader-logo-accent">TM26</span>
      </div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="loader-text">Initializing... {progress}%</span>
    </div>
  )
}
