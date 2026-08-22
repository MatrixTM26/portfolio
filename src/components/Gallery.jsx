import { useState, useEffect, useCallback, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/Gallery.css'

const ITEMS = [
  ...Array.from({ length: 12 }, (_, i) => ({ type: 'image', src: `/img/${i + 1}.jpg`, alt: `Gallery ${i + 1}` })),
  { type: 'video', src: '/img/1.mp4', alt: 'Video 1' },
]

function VideoSlide({ src, isActive }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setPlaying(false)
    }
  }, [isActive])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const handleEnded = () => setPlaying(false)

  return (
    <div className="video-slide-wrap">
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        onEnded={handleEnded}
        draggable={false}
      />
      <button
        className={`video-play-btn${playing ? ' playing' : ''}`}
        onClick={togglePlay}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        <i className={`fa-solid ${playing ? 'fa-pause' : 'fa-play'}`} />
      </button>
    </div>
  )
}

export default function Gallery() {
  const [current,   setCurrent]   = useState(0)
  const [flipping,  setFlipping]  = useState(null)
  const [direction, setDirection] = useState('next')
  const header  = useScrollReveal()
  const content = useScrollReveal()

  const goTo = useCallback((idx, dir) => {
    setFlipping(current)
    setDirection(dir)
    setTimeout(() => setFlipping(null), 720)
    setCurrent(idx)
  }, [current])

  const goPrev = useCallback(() => {
    goTo((current - 1 + ITEMS.length) % ITEMS.length, 'prev')
  }, [current, goTo])

  const goNext = useCallback(() => {
    goTo((current + 1) % ITEMS.length, 'next')
  }, [current, goTo])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

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
