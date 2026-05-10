import '../styles/Home.css'

const BADGES = [
  { icon: 'fa-solid fa-bug',            label: 'Bug Hunter'          },
  { icon: 'fa-solid fa-terminal',       label: 'Pen Tester'          },
  { icon: 'fa-solid fa-flag',           label: 'CTF Player'          },
  { icon: 'fa-solid fa-magnifying-glass', label: 'OSINT Researcher'  },
]

const SOCIALS = [
  { icon: 'fa-brands fa-github',    href: 'https://github.com/MatrixTM26',          label: 'GitHub'    },
  { icon: 'fa-brands fa-instagram', href: 'https://instagram.com/matrix.tm26',      label: 'Instagram' },
  { icon: 'fa-brands fa-telegram',  href: 'https://t.me/MatrixTM26',                label: 'Telegram'  },
]

export default function Home() {
  return (
    <section className="home" id="home">
      <div className="home-bg" />
      <div className="home-grid-lines" />

      <div className="container">
        <div className="home-inner">
          <div className="home-left">
            <div className="home-greeting">
              <span className="home-greeting-line" />
              Hello, I'm MatrixTM26
            </div>

            <h1 className="home-headline">
              Providing the Best<br />
              <span className="accent-word">Cyber</span> Solutions<br />
              for Your <span className="outline-word">Security</span>
            </h1>

            <p className="home-desc">
              I'm ready to protect your data from hackers. I specialize in penetration testing,
              vulnerability research, bug bounty hunting, and CTF competitions — keeping
              your systems one step ahead of threats.
            </p>

            <div className="home-badges">
              {BADGES.map(b => (
                <span key={b.label} className="home-badge">
                  <i className={b.icon} />
                  {b.label}
                </span>
              ))}
            </div>

            <div className="home-cta">
              <a href="#contact" className="btn-primary">
                Get Started
                <i className="fa-solid fa-arrow-right" />
              </a>
              <a href="#skills" className="btn-ghost">
                Learn More
              </a>
            </div>

            <div className="home-socials">
              <span className="home-socials-label">Follow</span>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label={s.label}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="home-right">
            <div className="profile-wrap">
              <div className="profile-bg-shape" />
              <div className="profile-img-container">
                <img
                  src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80&fit=crop&crop=face"
                  alt="Security Researcher"
                  className="profile-img"
                  onError={e => {
                    e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&q=80&fit=crop'
                  }}
                />
              </div>

              <div className="profile-card-floating card-top">
                <div className="floating-card-icon">
                  <i className="fa-solid fa-shield-halved" />
                </div>
                <div className="floating-card-text">
                  <span className="floating-card-label">Status</span>
                  <span className="floating-card-value">Open to Work</span>
                </div>
              </div>

              <div className="profile-card-floating card-bottom">
                <div className="floating-card-icon">
                  <i className="fa-solid fa-trophy" />
                </div>
                <div className="floating-card-text">
                  <span className="floating-card-label">CTF Solved</span>
                  <span className="floating-card-value">50+ Challenges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
