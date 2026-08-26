import { useState, useEffect, useCallback, useRef, memo } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/Gallery.css'

const ITEMS = [
  ...Array.from({ length: 12 }, (_, i) => ({ type: 'image', src: `/img/${i + 1}.jpg`, alt: `Gallery ${i + 1}` })),
  { type: 'video', src: '/img/1.mp4', alt: 'Video' },
]

const VideoSlide = memo(function VideoSlide({ src, isActive }) {
  const videoRef  = useRef(null)
  const hideRef   = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setPlaying(false)
      setVisible(true)
    }
  }, [isActive])

  useEffect(() => () => clearTimeout(hideRef.current), [])

  const scheduleHide = useCallback(() => {
    clearTimeout(hideRef.current)
    hideRef.current = setTimeout(() => setVisible(false), 2200)
  }, [])

  const handleInteract = useCallback(() => {
    setVisible(true)
    if (playing) scheduleHide()
  }, [playing, scheduleHide])

  const togglePlay = useCallback(e => {
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
      clearTimeout(hideRef.current)
      setVisible(true)
    }
  }, [scheduleHide])

  const handleEnded = useCallback(() => {
    setPlaying(false)
    clearTimeout(hideRef.current)
    setVisible(true)
  }, [])

  return (
    <div className="video-slide-wrap" onMouseMove={handleInteract} onTouchStart={handleInteract}>
      <video ref={videoRef} src={src} playsInline preload="metadata" onEnded={handleEnded} />
      <div className={`video-controls${visible ? ' visible' : ''}`}>
        <button className="video-play-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          <i className={`fa-solid ${playing ? 'fa-pause' : 'fa-play'}`} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
})

const Lightbox = memo(function Lightbox({ item, onClose }) {
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
    <div className="lb-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image fullscreen">
      <button className="lb-close-btn" onClick={onClose} aria-label="Close fullscreen">
        <i className="fa-solid fa-xmark" aria-hidden="true" />
      </button>
      <div className="lb-content" onClick={e => e.stopPropagation()}>
        {item.type === 'video'
          ? <video src={item.src} controls autoPlay playsInline />
          : <img src={item.src} alt={item.alt} decoding="async" />
        }
      </div>
    </div>
  )
})

export default function Gallery() {
  const [current,  setCurrent]  = useState(0)
  const [flipping, setFlipping] = useState(null)
  const [direction,setDirection]= useState('next')
  const [lbOpen,   setLbOpen]   = useState(false)
  const flipTimer = useRef(null)
  const header    = useScrollReveal()
  const content   = useScrollReveal()

  useEffect(() => () => clearTimeout(flipTimer.current), [])

  const goTo = useCallback((idx, dir) => {
    clearTimeout(flipTimer.current)
    setFlipping(current)
    setDirection(dir)
    flipTimer.current = setTimeout(() => setFlipping(null), 720)
    setCurrent(idx)
  }, [current])

  const goPrev = useCallback(() => goTo((current - 1 + ITEMS.length) % ITEMS.length, 'prev'), [current, goTo])
  const goNext = useCallback(() => goTo((current + 1) % ITEMS.length, 'next'),                 [current, goTo])
  const openLb  = useCallback(() => setLbOpen(true),  [])
  const closeLb = useCallback(() => setLbOpen(false), [])

  useEffect(() => {
    const onKey = e => {
      if (lbOpen) return
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext, lbOpen])

  const getSlideClass = useCallback(i => {
    if (i === flipping) return direction === 'next' ? 'flip-out' : 'flip-out-reverse'
    if (i === current)  return 'is-active'
    return 'is-hidden'
  }, [flipping, direction, current])

  return (
    <section className="section gallery" id="gallery">
      <div className="gallery-bg-layer" data-parallax="slow" aria-hidden="true" />
      <div className="container">

        <div className={`gallery-header reveal${header.visible ? ' visible' : ''}`} ref={header.ref}>
          <p className="section-label">Archive</p>
          <h2 className="section-title">Gallery</h2>
        </div>

        <div className={`reveal${content.visible ? ' visible' : ''}`} ref={content.ref}>
          <div className="gallery-slider" role="region" aria-label="Gallery slider">
            {ITEMS.map((item, i) => (
              <div key={i} className={`gallery-slide ${getSlideClass(i)}`} aria-hidden={i !== current}>
                {item.type === 'video'
                  ? <VideoSlide src={item.src} isActive={i === current} />
                  : <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                }
              </div>
            ))}

            <button className="slider-btn prev-btn" onClick={goPrev} aria-label="Previous slide">
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            </button>
            <button className="slider-btn next-btn" onClick={goNext} aria-label="Next slide">
              <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </button>
            <button className="slider-expand-btn" onClick={openLb} aria-label="View fullscreen">
              <i className="fa-solid fa-expand" aria-hidden="true" />
            </button>

            <div className="slider-dots" role="tablist" aria-label="Slides">
              {ITEMS.map((item, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  className={`slider-dot${i === current ? ' active' : ''}${item.type === 'video' ? ' dot-video' : ''}`}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="slider-counter" aria-live="polite" aria-atomic="true">
              {current + 1} / {ITEMS.length}
            </div>
          </div>

          <div className="gallery-thumbs" role="list">
            {ITEMS.map((item, i) => (
              <div
                key={i}
                role="listitem"
                className={`gallery-thumb${i === current ? ' active' : ''}`}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              >
                {item.type === 'video' ? (
                  <div className="thumb-video-placeholder">
                    <i className="fa-solid fa-play" aria-hidden="true" />
                  </div>
                ) : (
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {lbOpen && <Lightbox item={ITEMS[current]} onClose={closeLb} />}
    </section>
  )
}
