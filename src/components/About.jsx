import '../styles/sections.css'

const STATS = [
  { number: '50+', label: 'CTF Challenges' },
  { number: '10+', label: 'Bug Reports' },
  { number: '2+',  label: 'Years Active' },
  { number: '∞',   label: 'Learning Mode' },
]

const SOCIAL_LINKS = [
  {
    icon: '📸',
    label: 'Instagram',
    value: '@matrix.tm26',
    href: 'https://instagram.com/matrix.tm26',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'MatrixTM26',
    href: 'https://github.com/MatrixTM26',
  },
  {
    icon: '✈️',
    label: 'Telegram',
    value: '@MatrixTM26',
    href: 'https://t.me/MatrixTM26',
  },
]

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <div className="glow-line" />
          <p className="section-subtitle">// SYSTEM_PROFILE — CLASSIFICATION: PUBLIC</p>
        </div>

        <div className="about-grid">
          {/* Text */}
          <div className="about-text">
            <p>
              Hello, I'm <strong>MatrixTM26</strong> — a cybersecurity enthusiast with a deep passion
              for offensive security, vulnerability research, and all things hacking. I believe
              the best way to build secure systems is to think like an attacker.
            </p>
            <p>
              My journey started with curiosity about <strong>how things break</strong>.
              That curiosity evolved into a focused path in penetration testing, CTF competitions,
              and bug bounty hunting. I continuously challenge myself with real-world scenarios
              to sharpen my skills.
            </p>
            <p>
              I'm proficient in web application security, network penetration testing, and
              vulnerability exploitation. I also enjoy <strong>sharing knowledge</strong> with
              the community because cybersecurity is stronger when we grow together.
            </p>
            <p>
              When I'm not breaking things, I'm studying new attack vectors, building security
              tools, or contributing to open-source security projects on GitHub.
            </p>

            <div className="about-stats">
              {STATS.map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar">M</div>
            <div className="profile-name">MatrixTM26</div>
            <div className="profile-title">Cybersecurity Specialist · Indonesia 🇮🇩</div>

            <div className="profile-links">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  <span className="profile-link-icon">{link.icon}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {link.label}
                  </span>
                  <span style={{ marginLeft: 'auto', color: 'var(--neon-green)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                    {link.value}
                  </span>
                </a>
              ))}

              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(0,255,136,0.04)', border: '1px solid var(--border-dim)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Current Status
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--neon-green)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-green)', display: 'inline-block', boxShadow: '0 0 8px var(--neon-green)', animation: 'blink 2s ease infinite' }} />
                  Open to Opportunities
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
