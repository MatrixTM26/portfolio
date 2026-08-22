import { useState, useEffect, useCallback } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/Gallery.css'

const IMAGES = [
  { src: '/img/1.jpg', alt: 'Gallery 1' },
  { src: '/img/2.jpg', alt: 'Gallery 2' },
  { src: '/img/3.jpg', alt: 'Gallery 3' },
  { src: '/img/4.jpg', alt: 'Gallery 4' },
]

export default function Gallery() {
  const [lbOpen,   setLbOpen]   = useState(false)
  const [lbIndex,  setLbIndex]  = useState(0)
  const header = useScrollReveal()
  const grid   = useScrollReveal()

  const openLb = i => { setLbIndex(i); setLbOpen(true); document.body.style.overflow = 'hidden' }
  const closeLb = useCallback(() => { setLbOpen(false); document.body.style.overflow = '' }, [])
  const prev = useCallback(() => setLbIndex(i => (i - 1 + IMAGES.length) % IMAGES.length), [])
  const next = useCallback(() => setLbIndex(i => (i + 1) % IMAGES.length), [])

  useEffect(() => {
    const onKey = e => {
      if (!lbOpen) return
      if (e.key === 'Escape')     closeLb()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lbOpen, closeLb, prev, next])

  return (
    <section className="section gallery" id="gallery">
      <div className="container">

        <div className={`gallery-header reveal${header.visible ? ' visible' : ''}`} ref={header.ref}>
          <p className="section-label">Archive</p>
          <h2 className="section-title">Gallery</h2>
        </div>

        <div className={`gallery-grid reveal${grid.visible ? ' visible' : ''}`} ref={grid.ref}>
          {IMAGES.map((img, i) => (
            <div key={i} className="gallery-item" onClick={() => openLb(i)}>
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-overlay">
                <i className="fa-solid fa-expand" />
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className={`lightbox${lbOpen ? ' active' : ''}`} onClick={e => e.target === e.currentTarget && closeLb()}>
        <button className="lb-btn lb-close" onClick={closeLb} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>
        <button className="lb-btn lb-prev" onClick={prev} aria-label="Previous">
          <i className="fa-solid fa-chevron-left" />
        </button>
        <button className="lb-btn lb-next" onClick={next} aria-label="Next">
          <i className="fa-solid fa-chevron-right" />
        </button>
        <div className="lb-canvas">
          {lbOpen && <img src={IMAGES[lbIndex].src} alt={IMAGES[lbIndex].alt} />}
        </div>
      </div>
    </section>
  )
}
