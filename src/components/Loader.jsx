import { useEffect, useState } from 'react'
import '../styles/Loader.css'

export default function Loader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`loader-overlay${hidden ? ' hidden' : ''}`}>
      <img src="/loading.svg" alt="Loading" className="loader-svg" />
    </div>
  )
}
