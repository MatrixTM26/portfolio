import { useState, useEffect } from 'react'
import '../styles/Navbar.css'

const NAV_ITEMS = [
  { label: 'About',    href: '#about',    prefix: '01.' },
  { label: 'Skills',   href: '#skills',   prefix: '02.' },
  { label: 'Projects', href: '#projects', prefix: '03.' },
  { label: 'Contact',  href: '#contact',  prefix: '04.' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active,   setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)

      // Active section tracking
      const sections = ['about','skills','projects','contact']
      for (const id of sections.reverse()) {
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

  const handleLink = (href) => {
    setMenuOpen(false)
    setActive(href)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <a href="#" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <span className="nav-logo-icon">M</span>
          MatrixTM26
        </a>

        {/* Links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                data-prefix={item.prefix}
                className={active === item.href ? 'active' : ''}
                onClick={() => handleLink(item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Status */}
        <div className="nav-status">
          <span className="status-dot" />
          <span>ONLINE</span>
        </div>

        {/* Burger */}
        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
