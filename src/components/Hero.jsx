import { useEffect, useRef } from 'react'
import '../styles/Hero.css'

/* ── Matrix Rain ── */
function MatrixRain({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF0123456789<>{}[]'
    const fontSize = 13
    let cols = Math.floor(canvas.width / fontSize)
    let drops = Array(cols).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(2,4,8,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff88'
      ctx.font = `${fontSize}px Share Tech Mono, monospace`

      cols = Math.floor(canvas.width / fontSize)
      if (drops.length !== cols) drops = Array(cols).fill(1)

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * fontSize, y * fontSize)
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef])

  return null
}

const TERMINAL_LINES = [
  { type: 'prompt', cmd: 'whoami' },
  { type: 'out',    parts: [{ cls: 't-val', text: 'MatrixTM26' }] },
  { type: 'prompt', cmd: 'cat profile.json' },
  { type: 'out',    parts: [{ cls: 't-key', text: '"role"' }, { cls: '', text: ': ' }, { cls: 't-val', text: '"Cybersecurity Specialist"' }] },
  { type: 'out',    parts: [{ cls: 't-key', text: '"focus"' }, { cls: '', text: ': ' }, { cls: 't-val', text: '"Penetration Testing & Bug Bounty"' }] },
  { type: 'out',    parts: [{ cls: 't-key', text: '"status"' }, { cls: '', text: ': ' }, { cls: 't-val', text: '"Open to Opportunities"' }] },
  { type: 'out',    parts: [{ cls: 't-key', text: '"location"' }, { cls: '', text: ': ' }, { cls: 't-val', text: '"Indonesia 🇮🇩"' }] },
  { type: 'prompt', cmd: 'ls skills/' },
  { type: 'out',    parts: [{ cls: 't-val', text: 'pentest/  recon/  exploit/  web-sec/  ctf/' }] },
  { type: 'empty' },
]

export default function Hero() {
  const canvasRef = useRef(null)

  return (
    <section className="hero" id="hero">
      <canvas className="hero-canvas" ref={canvasRef} />
      <MatrixRain canvasRef={canvasRef} />

      <div className="container">
        <div className="hero-content">
          {/* Left Text */}
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for Engagements
            </div>

            <h1 className="hero-name">MatrixTM26</h1>

            <p className="hero-role">
              Penetration Tester
              <span className="hero-role-separator">//</span>
              Bug Hunter
              <span className="hero-role-separator">//</span>
              Security Researcher
            </p>

            <p className="hero-desc">
              Specialized in offensive security, vulnerability research, and ethical hacking.
              I break things to make them stronger — one CVE at a time.
              Passionate about CTF challenges, web application security, and building a safer digital world.
            </p>

            <div className="hero-cta">
              <a href="#projects" className="btn">View Projects</a>
              <a href="#contact"  className="btn btn-outline">Get in Touch</a>
            </div>
          </div>

          {/* Right Terminal */}
          <div className="hero-terminal">
            <div className="terminal">
              <div className="terminal-header">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
                <span className="terminal-title">bash — matrix@sec:~</span>
              </div>
              <div className="terminal-body">
                {TERMINAL_LINES.map((line, i) => {
                  if (line.type === 'empty') return <div key={i} style={{ height: '0.8rem' }} />
                  if (line.type === 'prompt') return (
                    <div key={i} className="t-line">
                      <span className="t-prompt">matrix@sec:~$</span>
                      <span className="t-cmd">{line.cmd}</span>
                    </div>
                  )
                  return (
                    <div key={i} className="t-out">
                      {line.parts.map((p, j) => (
                        <span key={j} className={p.cls}>{p.text}</span>
                      ))}
                    </div>
                  )
                })}
                <div className="t-line">
                  <span className="t-prompt">matrix@sec:~$</span>
                  <span className="t-cursor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-bar" />
        <span>SCROLL</span>
      </div>
    </section>
  )
}
