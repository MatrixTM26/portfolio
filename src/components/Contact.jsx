import { useState } from 'react'
import '../styles/Contact.css'

const CHANNELS = [
  {
    icon: 'fa-brands fa-telegram',
    label: 'Telegram',
    value: '@MatrixTM26',
    href:  'https://t.me/MatrixTM26',
  },
  {
    icon: 'fa-brands fa-github',
    label: 'GitHub',
    value: 'github.com/MatrixTM26',
    href:  'https://github.com/MatrixTM26',
  },
  {
    icon: 'fa-brands fa-instagram',
    label: 'Instagram',
    value: '@matrix.tm26',
    href:  'https://instagram.com/matrix.tm26',
  },
]

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      return
    }
    const sub  = encodeURIComponent(form.subject || `Message from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.open(`mailto:matrixtm26@proton.me?subject=${sub}&body=${body}`)
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <p className="section-label">Get in Touch</p>
        <h2 className="section-title">Contact Me</h2>
        <p className="section-desc">
          Have a security project, bug bounty collaboration, or just want to connect?
          Drop a message and I'll respond promptly.
        </p>

        <div className="contact-layout">
          <div className="contact-left">
            <div className="contact-channels">
              {CHANNELS.map(ch => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel"
                >
                  <div className="ch-icon-wrap">
                    <i className={ch.icon} />
                  </div>
                  <div className="ch-info">
                    <div className="ch-label">{ch.label}</div>
                    <div className="ch-value">{ch.value}</div>
                  </div>
                  <i className="fa-solid fa-arrow-right ch-arrow" />
                </a>
              ))}
            </div>

            <div className="contact-availability">
              <span className="avail-dot" />
              <span className="avail-text">
                Currently <strong>available</strong> for freelance security engagements and bug bounty collaborations.
              </span>
            </div>
          </div>

          <div className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Your name"
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
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                className="form-input"
                type="text"
                name="subject"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                name="message"
                placeholder="Describe your project or question..."
                value={form.message}
                onChange={handleChange}
                rows={5}
              />
            </div>

            {status === 'success' && (
              <div className="form-status success">
                <i className="fa-solid fa-circle-check" /> Message sent successfully. I'll get back to you soon.
              </div>
            )}

            {status === 'error' && (
              <div className="form-status error">
                <i className="fa-solid fa-circle-exclamation" /> Please fill in all required fields.
              </div>
            )}

            <button className="btn-primary form-submit" onClick={handleSubmit}>
              <i className="fa-solid fa-paper-plane" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
