import { useState, useEffect, useCallback, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/Gallery.css'

const ITEMS = [
  ...Array.from({ length: 12 }, (_, i) => ({ type: 'image', src: `/img/${i + 1}.jpg`, alt: `Gallery ${i + 1}` })),
  { type: 'video', src: '/img/1.mp4', alt: 'Video 1' },
]

function VideoSlide({ src, isActive }) {
  const videoRef  = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(true)
  const hideTimer = useRef(null)

  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setPlaying(false)
      setVisible(true)
    }
  }, [isActive])

  const scheduleHide = () => {
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setVisible(false), 2200)
  }

  const handleMouseMove = () => {
    setVisible(true)
    if (playing) scheduleHide()
  }

  const togglePlay = e => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
      scheduleHide()
    } else {
      v.pause()
      setPlaying(false)
      clearTimeout(hideTimer.current)
      setVisible(true)
    }
  }

  const handleEnded = () => {
    setPlaying(false)
    clearTimeout(hideTimer.current)
    setVisible(true)
  }

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  return (
    <div className="video-slide-wrap" onMouseMove={handleMouseMove} onTouchStart={handleMouseMove}>
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        onEnded={handleEnded}
        draggable={false}
      />
      <div className={`video-controls${visible ? ' visible' : ''}`}>
        <button className="video-play-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          <i className={`fa-solid ${playing ? 'fa-pause' : 'fa-play'}`} />
        </button>
      </div>
    </div>
  )
}

function Lightbox({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="lb-overlay" onClick={onClose}>
      <button className="lb-close-btn" onClick={onClose} aria-label="Close">
        <i className="fa-solid fa-xmark" />
      </button>
      <div className="lb-content" onClick={e => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video src={item.src} controls autoPlay playsInline />
        ) : (
          <img src={item.src} alt={item.alt} />
        )}
      </div>
    </div>
  )
}

export default function Gallery() {
  const [current,   setCurrent]   = useState(0)
  const [flipping,  setFlipping]  = useState(null)
  const [direction, setDirection] = useState('next')
  const [lbOpen,    setLbOpen]    = useState(false)
  const header  = useScrollReveal()
  const content = useScrollReveal()

  const goTo = useCallback((idx, dir) => {
    setFlipping(current)
    setDirection(dir)
    setTimeout(() => setFlipping(null), 720)
    setCurrent(idx)
  }, [current])

  const goPrev = useCallback(() => goTo((current - 1 + ITEMS.length) % ITEMS.length, 'prev'), [current, goTo])
  const goNext = useCallback(() => goTo((current + 1) % ITEMS.length, 'next'),                 [current, goTo])

  useEffect(() => {
    const onKey = e => {
      if (lbOpen) return
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext, lbOpen])

  const getSlideClass = i => {
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
                  <VideoSlide src={item.src} isActive={i === current} />
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

            <button
              className="slider-expand-btn"
              onClick={() => setLbOpen(true)}
              aria-label="Expand"
            >
              <i className="fa-solid fa-expand" />
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

      {lbOpen && <Lightbox item={ITEMS[current]} onClose={() => setLbOpen(false)} />}
    </section>
  )
}
