import { useEffect, useState } from 'react'
import '../styles/Loader.css'

export default function Loader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2000)
    return () => clearTimeout(t)
  }, [])

  if (hidden) return null

  return (
    <div className="loader-overlay">
      <img src="/loading.svg" alt="" className="loader-svg" width="120" height="120" />
    </div>
  )
}
