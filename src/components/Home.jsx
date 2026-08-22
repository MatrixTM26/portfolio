import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/Home.css'

const SOCIALS = [
  { icon: 'fa-brands fa-github',    href: 'https://github.com/MatrixTM26',     label: 'GitHub'    },
  { icon: 'fa-brands fa-instagram', href: 'https://instagram.com/matrix.tm26', label: 'Instagram' },
  { icon: 'fa-brands fa-x-twitter', href: 'https://x.com/X_MatrixTM26',        label: 'X'         },
  { icon: 'fa-brands fa-telegram',  href: 'https://t.me/MatrixTM26',            label: 'Telegram'  },
]

export default function Home() {
  const left  = useScrollReveal({ threshold: 0.05 })
  const right = useScrollReveal({ threshold: 0.05 })

  return (
    <section className="home" id="home">
      <div className="home-parallax-layer" data-parallax="slow" />
      <div className="home-grid-lines"     data-parallax="slow" />

      <div className="container">
        <div className="home-inner">

          <div className={`home-left reveal-left${left.visible ? ' visible' : ''}`} ref={left.ref}>
            <p className="home-role-label">Red Team Operator</p>
            <h1 className="home-headline">Teuku Maulana</h1>
            <p className="home-desc">
              Penetration tester affiliated with Emperor Security Research.
              Specialized in adversarial simulation, vulnerability research,
              and offensive tooling development.
            </p>
            <div className="home-cta">
              <a href="#projects" className="btn-primary">
                <i className="fa-solid fa-code-branch" /> Projects
              </a>
              <a href="#contact" className="btn-ghost">Contact</a>
            </div>
            <div className="home-socials">
              <span className="home-socials-label">Find me</span>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="social-icon-link" aria-label={s.label}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className={`home-right reveal-right${right.visible ? ' visible' : ''}`} ref={right.ref}>
            <div className="profile-section">
              <div className="profile-avatar-wrap" data-parallax="reverse">
                <div className="profile-circle">
                  <img src="https://github.com/MatrixTM26.png" alt="Teuku Maulana" className="profile-img" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
