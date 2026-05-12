import { useState, useEffect, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/Projects.css";

const GITHUB_USER = "MatrixTM26";

const LANG_COLORS = {
    Python: "#3572A5",
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Shell: "#89e051",
    PHP: "#4F5D95",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Java: "#b07219",
    Go: "#00ADD8",
    Ruby: "#701516",
    C: "#555555",
    "C++": "#f34b7d",
    Rust: "#dea584"
};

const FALLBACK = [
    {
        id: 1,
        name: "auto-recon",
        description:
            "Automated recon framework chaining OSINT and scanning tools for subdomain enum, port scanning, and vuln detection.",
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        topics: ["recon", "osint", "automation"],
        html_url: `https://github.com/${GITHUB_USER}`,
        homepage: ""
    },
    {
        id: 2,
        name: "web-vuln-scanner",
        description:
            "Custom web vulnerability scanner targeting OWASP Top 10. Features XSS, SQLi, IDOR detection and auth bypass testing.",
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        topics: ["web-security", "owasp", "scanner"],
        html_url: `https://github.com/${GITHUB_USER}`,
        homepage: ""
    },
    {
        id: 3,
        name: "ctf-writeups",
        description:
            "Writeups for HackTheBox, TryHackMe, PicoCTF covering web exploitation, binary pwn, cryptography and forensics.",
        language: "Shell",
        stargazers_count: 0,
        forks_count: 0,
        topics: ["ctf", "hackthebox", "tryhackme"],
        html_url: `https://github.com/${GITHUB_USER}`,
        homepage: ""
    },
    {
        id: 4,
        name: "password-audit-tool",
        description:
            "Password auditing tool integrating Hashcat and John the Ripper for accelerated cracking with custom rule sets.",
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        topics: ["security", "hashcat", "cracking"],
        html_url: `https://github.com/${GITHUB_USER}`,
        homepage: ""
    },
    {
        id: 5,
        name: "network-traffic-analyzer",
        description:
            "Packet capture and analysis tool built with Scapy. Detects anomalous traffic and flags security threats in real-time.",
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        topics: ["network", "scapy", "forensics"],
        html_url: `https://github.com/${GITHUB_USER}`,
        homepage: ""
    },
    {
        id: 6,
        name: "phishing-simulation-kit",
        description:
            "Educational phishing simulation for authorized security awareness training with detailed campaign reporting dashboards.",
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        topics: ["social-engineering", "red-team"],
        html_url: `https://github.com/${GITHUB_USER}`,
        homepage: ""
    }
];

function getIcon(name, lang) {
    const n = (name || "").toLowerCase();
    if (n.includes("ctf") || n.includes("hack") || n.includes("pwn"))
        return "fa-solid fa-flag";
    if (n.includes("web") || n.includes("http") || n.includes("sql"))
        return "fa-solid fa-globe";
    if (n.includes("scan") || n.includes("recon") || n.includes("osint"))
        return "fa-solid fa-magnifying-glass";
    if (n.includes("exploit") || n.includes("vuln") || n.includes("cve"))
        return "fa-solid fa-bug";
    if (n.includes("tool") || n.includes("script") || n.includes("auto"))
        return "fa-solid fa-screwdriver-wrench";
    if (n.includes("crack") || n.includes("pass") || n.includes("hash"))
        return "fa-solid fa-key";
    if (n.includes("network") || n.includes("traffic") || n.includes("packet"))
        return "fa-solid fa-network-wired";
    if (n.includes("phish") || n.includes("social")) return "fa-solid fa-fish";
    if (lang === "Python") return "fa-brands fa-python";
    if (lang === "JavaScript" || lang === "TypeScript")
        return "fa-brands fa-js";
    if (lang === "Shell") return "fa-solid fa-terminal";
    return "fa-solid fa-code";
}

function Card({ repo, index }) {
    const { ref, visible } = useScrollReveal({ threshold: 0.08 });
    return (
        <div
            ref={ref}
            className={`project-card reveal${visible ? " visible" : ""}`}
            style={{ transitionDelay: `${(index % 3) * 100}ms` }}
        >
            <div className="project-card-top">
                <div className="project-icon-wrap">
                    <i className={getIcon(repo.name, repo.language)} />
                </div>
                <div className="project-links">
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                        title="GitHub"
                    >
                        <i className="fa-brands fa-github" />
                    </a>
                    {repo.homepage && (
                        <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link-btn"
                            title="Live"
                        >
                            <i className="fa-solid fa-arrow-up-right-from-square" />
                        </a>
                    )}
                </div>
            </div>
            <h3 className="project-name">{repo.name}</h3>
            <p className="project-desc">
                {repo.description || "No description provided."}
            </p>
            <div className="project-meta">
                {repo.language && (
                    <span className="project-lang">
                        <span
                            className="lang-dot"
                            style={{
                                background:
                                    LANG_COLORS[repo.language] || "#3b82f6"
                            }}
                        />
                        {repo.language}
                    </span>
                )}
                <span className="project-stars">
                    <i className="fa-solid fa-star" /> {repo.stargazers_count}
                </span>
                <span className="project-fork">
                    <i className="fa-solid fa-code-fork" /> {repo.forks_count}
                </span>
            </div>
            {repo.topics?.length > 0 && (
                <div className="project-topics">
                    {repo.topics.slice(0, 4).map(t => (
                        <span key={t} className="project-tag">
                            {t}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Projects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usingFallback, setUsingFallback] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const header = useScrollReveal();

    useEffect(() => {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 8000);

        fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`,
            {
                signal: ctrl.signal,
                headers: { Accept: "application/vnd.github.v3+json" }
            }
        )
            .then(r => {
                clearTimeout(timer);
                if (!r.ok) throw new Error(`${r.status}`);
                return r.json();
            })
            .then(data => {
                const list = Array.isArray(data)
                    ? data
                          .filter(r => !r.fork && r.name !== GITHUB_USER)
                          .sort(
                              (a, b) =>
                                  new Date(b.pushed_at) - new Date(a.pushed_at)
                          )
                    : [];
                setRepos(list.length > 0 ? list : FALLBACK);
                setUsingFallback(list.length === 0);
                setLoading(false);
            })
            .catch(() => {
                clearTimeout(timer);
                setRepos(FALLBACK);
                setUsingFallback(true);
                setLoading(false);
            });

        return () => {
            clearTimeout(timer);
            ctrl.abort();
        };
    }, []);

    const displayed = showAll ? repos : repos.slice(0, 6);

    return (
        <section className="section projects" id="projects">
            <div className="projects-bg-layer" data-parallax="slow" />
            <div className="projects-bg-layer-2" data-parallax="med" />

            <div className="container">
                <div
                    className={`projects-header reveal${header.visible ? " visible" : ""}`}
                    ref={header.ref}
                >
                    <div>
                        <p className="section-label">Open Source</p>
                        <h2 className="section-title">GitHub Projects</h2>
                    </div>
                    <a
                        href={`https://github.com/${GITHUB_USER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects-github-btn"
                    >
                        <i className="fa-brands fa-github" /> View Profile
                    </a>
                </div>

                {usingFallback && !loading && (
                    <div className="projects-notice">
                        <i className="fa-solid fa-circle-info" />
                        Showing featured projects. GitHub API may be
                        rate-limited.
                    </div>
                )}

                {loading ? (
                    <div className="projects-loading">
                        <i className="fa-solid fa-circle-notch" />
                        Fetching repositories...
                    </div>
                ) : (
                    <>
                        <div className="projects-grid">
                            {displayed.map((repo, i) => (
                                <Card key={repo.id} repo={repo} index={i} />
                            ))}
                        </div>

                        {repos.length > 6 && (
                            <div className="projects-show-more">
                                <button
                                    className="btn-ghost"
                                    onClick={() => setShowAll(v => !v)}
                                >
                                    <i
                                        className={`fa-solid ${showAll ? "fa-chevron-up" : "fa-chevron-down"}`}
                                    />
                                    {showAll
                                        ? "Show Less"
                                        : `Show All ${repos.length} Repos`}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
