import { useState, useEffect, useCallback, memo } from 'react'
import '../styles/Navbar.css'

const NAV_ITEMS = [
  { label: 'Home',     href: '#home',     icon: 'fa-solid fa-house'       },
  { label: 'Skills',   href: '#skills',   icon: 'fa-solid fa-code'        },
  { label: 'Projects', href: '#projects', icon: 'fa-solid fa-code-branch' },
  { label: 'Gallery',  href: '#gallery',  icon: 'fa-solid fa-images'      },
  { label: 'Contact',  href: '#contact',  icon: 'fa-solid fa-envelope'    },
]

const SECTION_IDS = ['contact', 'gallery', 'projects', 'skills', 'home']

const ThemeIcon = memo(function ThemeIcon({ theme }) {
  return <i className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`} aria-hidden="true" />
})

export default function Navbar({ theme, onToggleTheme }) {
  const [active,     setActive]     = useState('#home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(`#${id}`); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleLink = useCallback(href => { setActive(href); setMobileOpen(false) }, [])
  const toggleMenu = useCallback(() => setMobileOpen(v => !v), [])

  return (
    <>
      <nav className="desktop-float-dock" aria-label="Main navigation">
        {NAV_ITEMS.map(item => (
          <a key={item.href} href={item.href}
            className={`fdock-item${active === item.href ? ' active' : ''}`}
            onClick={() => handleLink(item.href)}
            aria-current={active === item.href ? 'page' : undefined}
          >
            <i className={item.icon} aria-hidden="true" />
            {item.label}
          </a>
        ))}
        <span className="fdock-divider" aria-hidden="true" />
        <button className="fdock-theme" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          <ThemeIcon theme={theme} />
        </button>
      </nav>

      <button
        className={`nav-mobile-toggle${mobileOpen ? ' open' : ''}`}
        onClick={toggleMenu}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
      >
        <span className="hamburger-lines" aria-hidden="true">
          <span /><span /><span />
        </span>
      </button>

      <div className={`mobile-menu-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} aria-hidden="true" />

      <nav className={`mobile-dock${mobileOpen ? ' open' : ''}`} aria-label="Mobile navigation" aria-hidden={!mobileOpen}>
        {NAV_ITEMS.map(item => (
          <a key={item.href} href={item.href}
            className={`dock-item${active === item.href ? ' active' : ''}`}
            onClick={() => handleLink(item.href)}
            aria-current={active === item.href ? 'page' : undefined}
          >
            <i className={item.icon} aria-hidden="true" />
            <span className="dock-label">{item.label}</span>
          </a>
        ))}
        <span className="dock-divider" aria-hidden="true" />
        <button className="dock-theme-mobile" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          <ThemeIcon theme={theme} />
          <span className="dock-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </nav>
    </>
  )
}
