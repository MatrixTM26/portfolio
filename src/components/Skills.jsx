import { useState, useEffect, useRef } from "react";
import "../styles/Skills.css";

const PROFICIENCY = [
    { icon: "fa-solid fa-globe", name: "Web App Penetration Testing", pct: 88 },
    {
        icon: "fa-solid fa-network-wired",
        name: "Network Scanning & Recon",
        pct: 82
    },
    { icon: "fa-solid fa-flag", name: "CTF Competitions", pct: 85 },
    { icon: "fa-solid fa-bug", name: "Bug Bounty Hunting", pct: 78 },
    { icon: "fa-brands fa-python", name: "Python Scripting", pct: 75 },
    {
        icon: "fa-solid fa-magnifying-glass",
        name: "OSINT & Intelligence",
        pct: 80
    }
];

const CATEGORIES = [
    {
        icon: "fa-solid fa-crosshairs",
        name: "Offensive Security",
        tags: [
            "Pen Testing",
            "Red Team",
            "Exploit Dev",
            "Priv Esc",
            "Post Exploitation"
        ]
    },
    {
        icon: "fa-solid fa-globe",
        name: "Web Security",
        tags: [
            "SQLi",
            "XSS/CSRF",
            "SSRF/XXE",
            "IDOR",
            "JWT Attacks",
            "Auth Bypass"
        ]
    },
    {
        icon: "fa-solid fa-magnifying-glass",
        name: "Reconnaissance",
        tags: [
            "Subdomain Enum",
            "Port Scan",
            "Google Dork",
            "DNS Enum",
            "Shodan"
        ]
    },
    {
        icon: "fa-solid fa-lock",
        name: "Crypto & Forensics",
        tags: [
            "Hash Cracking",
            "Steganography",
            "Packet Analysis",
            "Log Analysis"
        ]
    }
];

const TOOLS = [
    { icon: "fa-solid fa-spider", name: "Burp Suite" },
    { icon: "fa-solid fa-satellite-dish", name: "Nmap" },
    { icon: "fa-solid fa-bomb", name: "Metasploit" },
    { icon: "fa-solid fa-key", name: "Hashcat" },
    { icon: "fa-solid fa-database", name: "SQLMap" },
    { icon: "fa-solid fa-wave-square", name: "Wireshark" },
    { icon: "fa-solid fa-robot", name: "Nikto" },
    { icon: "fa-solid fa-magnifying-glass", name: "theHarvester" },
    { icon: "fa-solid fa-water", name: "Hydra" },
    { icon: "fa-solid fa-eye", name: "Shodan" },
    { icon: "fa-solid fa-terminal", name: "Ffuf" },
    { icon: "fa-brands fa-linux", name: "Kali Linux" }
];

function SkillBar({ icon, name, pct, visible }) {
    return (
        <div className="skill-bar-item">
            <div className="skill-bar-meta">
                <span className="skill-bar-name">
                    <i className={icon} />
                    {name}
                </span>
                <span className="skill-bar-pct">{pct}%</span>
            </div>
            <div className="skill-bar-track">
                <div
                    className="skill-bar-fill"
                    style={{ width: visible ? `${pct}%` : "0%" }}
                />
            </div>
        </div>
    );
}

export default function Skills() {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="section skills" id="skills">
            <div className="container">
                <div className="skills-header">
                    <p className="section-label">What I Do</p>
                    <h2 className="section-title">Skills & Expertise</h2>
                    <p className="section-desc">
                        A focused toolkit built through real-world practice —
                        from CTF competitions to live bug bounty programs and
                        hands-on penetration testing engagements.
                    </p>
                </div>

                <div className="skills-layout">
                    <div className="skills-proficiency" ref={ref}>
                        {PROFICIENCY.map(s => (
                            <SkillBar
                                key={s.name}
                                icon={s.icon}
                                name={s.name}
                                pct={s.pct}
                                visible={visible}
                            />
                        ))}
                    </div>

                    <div className="skills-categories">
                        {CATEGORIES.map(cat => (
                            <div key={cat.name} className="skill-cat-card">
                                <div className="skill-cat-top">
                                    <div className="skill-cat-icon">
                                        <i className={cat.icon} />
                                    </div>
                                    <span className="skill-cat-name">
                                        {cat.name}
                                    </span>
                                </div>
                                <div className="skill-tag-list">
                                    {cat.tags.map(tag => (
                                        <span key={tag} className="skill-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tools-block">
                    <p className="tools-block-title">
                        <i className="fa-solid fa-screwdriver-wrench" />
                        Tools & Arsenal
                    </p>
                    <div className="tools-row">
                        {TOOLS.map(tool => (
                            <span key={tool.name} className="tool-pill">
                                <i className={tool.icon} />
                                {tool.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
