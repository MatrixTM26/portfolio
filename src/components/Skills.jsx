import { useEffect, useRef, useState } from 'react'
import '../styles/sections.css'

const SKILL_CATEGORIES = [
  {
    icon: '🎯',
    name: 'Offensive Security',
    items: ['Penetration Testing', 'Red Teaming', 'Exploit Development', 'Privilege Escalation', 'Post Exploitation', 'OSINT', 'Social Engineering'],
  },
  {
    icon: '🌐',
    name: 'Web Security',
    items: ['SQL Injection', 'XSS / CSRF', 'SSRF / XXE', 'IDOR', 'Authentication Bypass', 'API Security', 'JWT Attacks', 'Business Logic Flaws'],
  },
  {
    icon: '🔍',
    name: 'Reconnaissance',
    items: ['Subdomain Enumeration', 'Port Scanning', 'Fingerprinting', 'Google Dorking', 'Shodan / Censys', 'DNS Enumeration', 'Network Mapping'],
  },
  {
    icon: '🏆',
    name: 'CTF & Research',
    items: ['Binary Exploitation', 'Reverse Engineering', 'Cryptography', 'Forensics', 'Steganography', 'Web Challenges', 'OSCP Style Labs'],
  },
  {
    icon: '💻',
    name: 'Programming',
    items: ['Python', 'Bash Scripting', 'JavaScript', 'PHP', 'PowerShell', 'SQL', 'YAML / JSON'],
  },
  {
    icon: '🛡️',
    name: 'Defensive / Blue Team',
    items: ['Log Analysis', 'Incident Response', 'Threat Intelligence', 'SIEM Basics', 'Malware Analysis', 'Network Forensics'],
  },
]

const CORE_SKILLS = [
  { name: 'Web Application Penetration Testing', pct: 88 },
  { name: 'Network Scanning & Enumeration',      pct: 82 },
  { name: 'CTF / Capture the Flag',              pct: 85 },
  { name: 'Bug Bounty Hunting',                  pct: 78 },
  { name: 'Python Scripting',                    pct: 75 },
  { name: 'OSINT & Reconnaissance',              pct: 80 },
]

const TOOLS = [
  { icon: '🗡️', name: 'Burp Suite' },
  { icon: '🔎', name: 'Nmap' },
  { icon: '🕷️', name: 'Metasploit' },
  { icon: '🌐', name: 'Gobuster' },
  { icon: '🔐', name: 'Hashcat' },
  { icon: '🐉', name: 'Kali Linux' },
  { icon: '🦝', name: 'SQLMap' },
  { icon: '📡', name: 'Wireshark' },
  { icon: '⚙️', name: 'Nikto' },
  { icon: '🧩', name: 'John the Ripper' },
  { icon: '🕵️', name: 'theHarvester' },
  { icon: '🌩️', name: 'Hydra' },
  { icon: '🔭', name: 'Shodan' },
  { icon: '🐝', name: 'Ffuf' },
  { icon: '📦', name: 'Docker' },
  { icon: '🖥️', name: 'VirtualBox' },
]

function SkillBar({ name, pct, visible }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-info">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct">{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: visible ? `${pct}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills & Arsenal</h2>
          <div className="glow-line" />
          <p className="section-subtitle">// CAPABILITIES_SCAN — INITIALIZING...</p>
        </div>

        {/* Skill Categories */}
        <div className="skills-grid">
          {SKILL_CATEGORIES.map(cat => (
            <div key={cat.name} className="skill-category">
              <div className="skill-cat-header">
                <span className="skill-cat-icon">{cat.icon}</span>
                <span className="skill-cat-name">{cat.name}</span>
              </div>
              <div className="skill-items">
                {cat.items.map(item => (
                  <span key={item} className="skill-item">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency Bars */}
        <div className="skill-bars" ref={ref}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9rem',
            color: 'var(--neon-cyan)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem'
          }}>
            // Core Proficiency
          </h3>
          {CORE_SKILLS.map(s => (
            <SkillBar key={s.name} name={s.name} pct={s.pct} visible={visible} />
          ))}
        </div>

        {/* Tools */}
        <div style={{ marginTop: '3.5rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9rem',
            color: 'var(--neon-cyan)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem'
          }}>
            // Tools & Weaponry
          </h3>
          <div className="tools-grid">
            {TOOLS.map(tool => (
              <div key={tool.name} className="tool-card">
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-name">{tool.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
