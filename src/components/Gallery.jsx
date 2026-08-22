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
  const [current, setCurrent] = useState(0)
  const [prev,    setPrev]    = useState(null)
  const header  = useScrollReveal()
  const content = useScrollReveal()

  const goTo = useCallback(idx => {
    setCurrent(prev => {
      setPrev(prev)
      return idx
    })
    setTimeout(() => setPrev(null), 800)
  }, [])

  const goPrev = useCallback(() => goTo((current - 1 + IMAGES.length) % IMAGES.length), [current, goTo])
  const goNext = useCallback(() => goTo((current + 1) % IMAGES.length),                  [current, goTo])

  useEffect(() => {
    const t = setInterval(goNext, 5000)
    return () => clearInterval(t)
  }, [goNext])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  return (
    <section className="section gallery" id="gallery">
      <div className="gallery-bg-layer" data-parallax="slow" />
      <div className="container">

        <div className={`gallery-header reveal${header.visible ? ' visible' : ''}`} ref={header.ref}>
          <p className="section-label">Archive</p>
          <h2 className="section-title">Gallery</h2>
        </div>

        <div className={`reveal${content.visible ? ' visible' : ''}`} ref={content.ref}>
          <div className="gallery-slider">
            {IMAGES.map((img, i) => (
              <div
                key={i}
                className={`gallery-slide${i === current ? ' active' : ''}${i === prev ? ' prev' : ''}`}
              >
                <img src={img.src} alt={img.alt} draggable={false} />
              </div>
            ))}

            <button className="slider-btn prev-btn" onClick={goPrev} aria-label="Previous">
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button className="slider-btn next-btn" onClick={goNext} aria-label="Next">
              <i className="fa-solid fa-chevron-right" />
            </button>

            <div className="slider-dots">
              {IMAGES.map((_, i) => (
                <button
                  key={i}
                  className={`slider-dot${i === current ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="slider-counter">
              {current + 1} / {IMAGES.length}
            </div>
          </div>

          <div className="gallery-thumbs">
            {IMAGES.map((img, i) => (
              <div
                key={i}
                className={`gallery-thumb${i === current ? ' active' : ''}`}
                onClick={() => goTo(i)}
              >
                <img src={img.src} alt={img.alt} draggable={false} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
