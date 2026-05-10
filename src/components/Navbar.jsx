import { useState, useEffect } from 'react'
import '../styles/Navbar.css'

const NAV_ITEMS = [
  { label: 'Home',    href: '#home'    },
  { label: 'Skills',  href: '#skills'  },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const ids = ['contact', 'skills', 'home']
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${id}`)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#home" className="nav-logo" onClick={close}>
          <span className="nav-logo-icon">
            <i className="fa-solid fa-shield-halved" />
          </span>
          <span className="nav-logo-text">Matrix<span>TM26</span></span>
        </a>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className={active === item.href ? 'active' : ''}
                onClick={close}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="nav-cta desktop" onClick={close}>
          Let's Talk
        </a>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} />
        </button>
      </div>
    </nav>
  )
}
