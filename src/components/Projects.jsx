import '../styles/sections.css'

const PROJECTS = [
  {
    icon: '🔍',
    title: 'Auto Recon Tool',
    desc: 'An automated reconnaissance framework written in Python that chains together multiple OSINT and scanning tools. Performs subdomain enumeration, port scanning, web crawling, and vulnerability detection in a single pipeline.',
    tags: ['Python', 'OSINT', 'Automation', 'Recon'],
    github: 'https://github.com/MatrixTM26',
  },
  {
    icon: '🕷️',
    title: 'Web Vuln Scanner',
    desc: 'A custom web vulnerability scanner targeting common OWASP Top 10 vulnerabilities. Features XSS detection, SQL injection testing, IDOR checks, and authentication bypass attempts with detailed reporting.',
    tags: ['Python', 'Web Security', 'OWASP', 'Scanner'],
    github: 'https://github.com/MatrixTM26',
  },
  {
    icon: '🏴‍☠️',
    title: 'CTF Writeups',
    desc: 'Comprehensive writeups and solutions for various CTF competitions including HackTheBox, TryHackMe, and PicoCTF. Covering categories: web exploitation, binary pwn, cryptography, forensics, and reverse engineering.',
    tags: ['CTF', 'Writeups', 'HackTheBox', 'TryHackMe'],
    github: 'https://github.com/MatrixTM26',
  },
  {
    icon: '🔐',
    title: 'Password Audit Tool',
    desc: 'A Python-based tool for auditing password strength and performing wordlist-based attacks in authorized environments. Integrates with Hashcat and John the Ripper for accelerated cracking with custom rule sets.',
    tags: ['Python', 'Cryptography', 'Hashcat', 'Security Audit'],
    github: 'https://github.com/MatrixTM26',
  },
  {
    icon: '📡',
    title: 'Network Traffic Analyzer',
    desc: 'A lightweight packet capture and analysis tool built with Scapy. Detects anomalous traffic patterns, performs protocol dissection, and flags potential security threats in real-time on local networks.',
    tags: ['Python', 'Scapy', 'Network', 'Forensics'],
    github: 'https://github.com/MatrixTM26',
  },
  {
    icon: '🛡️',
    title: 'Phishing Simulation Kit',
    desc: 'An educational phishing simulation framework for authorized security awareness training. Includes email templates, landing page cloners, credential capturing, and detailed campaign reporting dashboards.',
    tags: ['Python', 'Social Engineering', 'Awareness Training', 'Red Team'],
    github: 'https://github.com/MatrixTM26',
  },
]

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <div className="glow-line" />
          <p className="section-subtitle">// ACTIVE_OPERATIONS — LISTING DEPLOYMENTS</p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map(proj => (
            <div key={proj.title} className="project-card">
              <div className="project-header">
                <span className="project-icon">{proj.icon}</span>
                <div className="project-links">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    GitHub →
                  </a>
                </div>
              </div>

              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.desc}</p>

              <div className="project-tags">
                {proj.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Link */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="https://github.com/MatrixTM26"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            🐙 View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
