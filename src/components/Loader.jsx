import { useEffect, useState } from 'react'
import '../styles/Loader.css'

export default function Loader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`loader-overlay${hidden ? ' hidden' : ''}`}>
      <div className="loader-body">
        <img src="/loading.svg" alt="Loading" className="loader-svg" />
        <div className="loader-name">Matrix<span>TM26</span></div>
      </div>
    </div>
  )
}
