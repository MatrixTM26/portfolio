import '../styles/sections.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          &copy; {year} <span>MatrixTM26</span> · Designed &amp; Built with{' '}
          <span style={{ color: 'var(--neon-red)' }}>♥</span> in the{' '}
          <span>Matrix</span> · Stay Ethical, Hack Responsibly
        </p>
        <p className="footer-text" style={{ marginTop: '0.4rem', opacity: 0.5 }}>
          // All security research conducted ethically and with proper authorization
        </p>
      </div>
    </footer>
  )
}
