import { useEffect, useState } from 'react'
import '../styles/Loader.css'

export default function Loader() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`loader-overlay${hidden ? ' hidden' : ''}`}>
      <div className="loader-body">
        <div className="loader-icon">
          <i className="fa-solid fa-shield-halved" />
        </div>
        <div className="loader-name">Matrix<span>TM26</span></div>
      </div>
    </div>
  )
}
