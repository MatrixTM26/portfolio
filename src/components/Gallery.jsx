import { useState, useEffect, useCallback, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/Gallery.css'

const ITEMS = [
  ...Array.from({ length: 12 }, (_, i) => ({ type: 'image', src: `/img/${i + 1}.jpg`, alt: `Gallery ${i + 1}` })),
  { type: 'video', src: '/img/1.mp4', alt: 'Video 1' },
]

export default function Gallery() {
  const [current,   setCurrent]   = useState(0)
  const [flipping,  setFlipping]  = useState(null)
  const [direction, setDirection] = useState('next')
  const autoRef = useRef(null)
  const header  = useScrollReveal()
  const content = useScrollReveal()

  const clearAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current)
  }

  const startAuto = useCallback(() => {
    clearAuto()
    autoRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % ITEMS.length
        setFlipping(c)
        setDirection('next')
        setTimeout(() => setFlipping(null), 720)
        return next
      })
    }, 4500)
  }, [])

  const goTo = useCallback((idx, dir) => {
    clearAuto()
    setFlipping(current)
    setDirection(dir)
    setTimeout(() => setFlipping(null), 720)
    setCurrent(idx)
    startAuto()
  }, [current, startAuto])

  const goPrev = useCallback(() => {
    goTo((current - 1 + ITEMS.length) % ITEMS.length, 'prev')
  }, [current, goTo])

  const goNext = useCallback(() => {
    goTo((current + 1) % ITEMS.length, 'next')
  }, [current, goTo])

  useEffect(() => {
    startAuto()
    return clearAuto
  }, [startAuto])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  const getSlideClass = (i) => {
    if (i === flipping) return direction === 'next' ? 'flip-out' : 'flip-out-reverse'
    if (i === current)  return 'is-active'
    return 'is-hidden'
  }

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
            {ITEMS.map((item, i) => (
              <div key={i} className={`gallery-slide ${getSlideClass(i)}`}>
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    autoPlay={i === current}
                    loop
                    muted
                    playsInline
                    draggable={false}
                  />
                ) : (
                  <img src={item.src} alt={item.alt} draggable={false} />
                )}
              </div>
            ))}

            <button className="slider-btn prev-btn" onClick={goPrev} aria-label="Previous">
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button className="slider-btn next-btn" onClick={goNext} aria-label="Next">
              <i className="fa-solid fa-chevron-right" />
            </button>

            <div className="slider-dots">
              {ITEMS.map((item, i) => (
                <button
                  key={i}
                  className={`slider-dot${i === current ? ' active' : ''}${item.type === 'video' ? ' dot-video' : ''}`}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="slider-counter">{current + 1} / {ITEMS.length}</div>
          </div>

          <div className="gallery-thumbs">
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className={`gallery-thumb${i === current ? ' active' : ''}`}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              >
                {item.type === 'video' ? (
                  <div className="thumb-video-placeholder">
                    <i className="fa-solid fa-play" />
                  </div>
                ) : (
                  <img src={item.src} alt={item.alt} draggable={false} />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
