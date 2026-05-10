import { useState } from 'react'
import '../styles/sections.css'

const CHANNELS = [
  {
    icon: '✈️',
    name: 'Telegram',
    value: '@MatrixTM26',
    href: 'https://t.me/MatrixTM26',
  },
  {
    icon: '🐙',
    name: 'GitHub',
    value: 'github.com/MatrixTM26',
    href: 'https://github.com/MatrixTM26',
  },
  {
    icon: '📸',
    name: 'Instagram',
    value: '@matrix.tm26',
    href: 'https://instagram.com/matrix.tm26',
  },
]

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'success' | 'error' | null

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      return
    }
    // Encode message for mailto fallback
    const subject = encodeURIComponent(`[Portfolio Contact] Message from ${form.name}`)
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    window.open(`mailto:matrixtm26@example.com?subject=${subject}&body=${body}`)
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contact</h2>
          <div className="glow-line" />
          <p className="section-subtitle">// ESTABLISH_CONNECTION — AWAITING HANDSHAKE</p>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <p>
              Have a security challenge, collaboration idea, or just want to talk hacking?
              I'm always open to interesting conversations. Reach out through any channel below
              and I'll get back to you ASAP.
            </p>

            <div className="contact-channels">
              {CHANNELS.map(ch => (
                <a
                  key={ch.name}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel"
                >
                  <span className="channel-icon">{ch.icon}</span>
                  <div className="channel-info">
                    <div className="channel-name">{ch.name}</div>
                    <div className="channel-value">{ch.value}</div>
                  </div>
                  <span className="channel-arrow">→</span>
                </a>
              ))}
            </div>

            {/* PGP Note */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(0,204,255,0.04)',
              border: '1px solid rgba(0,204,255,0.15)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.06em',
              lineHeight: '1.8',
            }}>
              <span style={{ color: 'var(--neon-cyan)' }}>// NOTE:</span> For sensitive security
              disclosures, use Telegram for end-to-end encrypted communication.
              Responsible disclosure always welcomed.
            </div>
          </div>

          {/* Form */}
          <div className="contact-form">
            <div className="form-group">
              <label className="form-label">Name / Handle</label>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="your_name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="user@domain.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                name="message"
                placeholder="// enter your message here..."
                value={form.message}
                onChange={handleChange}
                rows={5}
              />
            </div>

            {status === 'success' && (
              <div className="form-status success">
                ✅ Message transmitted successfully. Standing by for response.
              </div>
            )}
            {status === 'error' && (
              <div className="form-status error">
                ❌ All fields required. Please fill in the blanks.
              </div>
            )}

            <button className="btn" onClick={handleSubmit} style={{ width: '100%', justifyContent: 'center' }}>
              ⚡ Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
