import { useState, useEffect } from 'react'
import '../styles/Navbar.css'

const NAV_ITEMS = [
  { label: 'Home',     href: '#home',     icon: 'fa-solid fa-house'       },
  { label: 'Skills',   href: '#skills',   icon: 'fa-solid fa-code'        },
  { label: 'Projects', href: '#projects', icon: 'fa-solid fa-code-branch' },
  { label: 'Gallery',  href: '#gallery',  icon: 'fa-solid fa-images'      },
  { label: 'Contact',  href: '#contact',  icon: 'fa-solid fa-envelope'    },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [active,     setActive]     = useState('#home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const ids = ['contact', 'gallery', 'projects', 'skills', 'home']
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(`#${id}`)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleLink = href => { setActive(href); setMobileOpen(false) }

  const ThemeIcon = () => (
    <i className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`} />
  )

  return (
    <>
      <div className="desktop-float-dock">
        {NAV_ITEMS.map(item => (
          <a
            key={item.href}
            href={item.href}
            className={`fdock-item${active === item.href ? ' active' : ''}`}
            onClick={() => handleLink(item.href)}
          >
            <i className={item.icon} />
            {item.label}
          </a>
        ))}
        <span className="fdock-divider" />
        <button className="fdock-theme" onClick={onToggleTheme} aria-label="Toggle theme">
          <ThemeIcon />
        </button>
      </div>

      <button
        className={`nav-mobile-toggle${mobileOpen ? ' open' : ''}`}
        onClick={() => setMobileOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span className="hamburger-lines">
          <span /><span /><span />
        </span>
      </button>

      <div className={`mobile-menu-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} />

      <div className={`mobile-dock${mobileOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <a
            key={item.href}
            href={item.href}
            className={`dock-item${active === item.href ? ' active' : ''}`}
            onClick={() => handleLink(item.href)}
          >
            <i className={item.icon} />
            <span className="dock-label">{item.label}</span>
          </a>
        ))}
        <span className="dock-divider" />
        <button className="dock-theme-mobile" onClick={onToggleTheme} aria-label="Toggle theme">
          <ThemeIcon />
          <span className="dock-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </>
  )
}
