import { useState, useEffect } from "react";
import { useScrollReveal, useParallax } from "../hooks/useScrollReveal";
import "../styles/Projects.css";

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
    if (lang === "Python") return "fa-brands fa-python";
    if (lang === "JavaScript" || lang === "TypeScript")
        return "fa-brands fa-js";
    if (lang === "Shell") return "fa-solid fa-terminal";
    return "fa-solid fa-code";
}

export default function Projects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const header = useScrollReveal();
    const grid = useScrollReveal();
    const parallaxBg = useParallax(0.12);

    useEffect(() => {
        fetch(
            "https://api.github.com/users/MatrixTM26/repos?sort=updated&per_page=100"
        )
            .then(r => {
                if (!r.ok) throw new Error();
                return r.json();
            })
            .then(data => {
                setRepos(
                    data
                        .filter(r => !r.fork)
                        .sort(
                            (a, b) =>
                                b.stargazers_count +
                                b.forks_count -
                                (a.stargazers_count + a.forks_count)
                        )
                );
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    const displayed = showAll ? repos : repos.slice(0, 6);

    return (
        <section className="section projects" id="projects">
            <div className="projects-parallax-bg" ref={parallaxBg} />
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
                        href="https://github.com/MatrixTM26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects-github-btn"
                    >
                        <i className="fa-brands fa-github" /> View Profile
                    </a>
                </div>

                {loading && (
                    <div className="projects-loading">
                        <i className="fa-solid fa-circle-notch" />
                        Fetching repositories...
                    </div>
                )}

                {error && (
                    <div className="projects-error">
                        <p>
                            Could not load repositories.{" "}
                            <a
                                href="https://github.com/MatrixTM26"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "var(--blue-bright)" }}
                            >
                                View on GitHub →
                            </a>
                        </p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div
                            className={`projects-grid reveal${grid.visible ? " visible" : ""}`}
                            ref={grid.ref}
                        >
                            {displayed.map((repo, i) => (
                                <div
                                    key={repo.id}
                                    className="project-card"
                                    style={{
                                        transitionDelay: `${(i % 6) * 80}ms`
                                    }}
                                >
                                    <div className="project-card-top">
                                        <div className="project-icon-wrap">
                                            <i
                                                className={getIcon(
                                                    repo.name,
                                                    repo.language
                                                )}
                                            />
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
                                    <h3 className="project-name">
                                        {repo.name}
                                    </h3>
                                    <p className="project-desc">
                                        {repo.description ||
                                            "No description provided."}
                                    </p>
                                    <div className="project-meta">
                                        {repo.language && (
                                            <span className="project-lang">
                                                <span
                                                    className="lang-dot"
                                                    style={{
                                                        background:
                                                            LANG_COLORS[
                                                                repo.language
                                                            ] || "#3b82f6"
                                                    }}
                                                />
                                                {repo.language}
                                            </span>
                                        )}
                                        <span className="project-stars">
                                            <i className="fa-solid fa-star" />
                                            {repo.stargazers_count}
                                        </span>
                                        <span className="project-fork">
                                            <i className="fa-solid fa-code-fork" />
                                            {repo.forks_count}
                                        </span>
                                    </div>
                                    {repo.topics?.length > 0 && (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: "0.4rem"
                                            }}
                                        >
                                            {repo.topics.slice(0, 4).map(t => (
                                                <span
                                                    key={t}
                                                    className="project-tag"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
