import { useState, useEffect, useCallback, memo } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/Projects.css'

const GITHUB_USER = 'MatrixTM26'
const INITIAL_COUNT = 6

const LANG_COLORS = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#2b7489',
  Shell: '#89e051', PHP: '#4F5D95', HTML: '#e34c26', CSS: '#563d7c',
  Java: '#b07219', Go: '#00ADD8', Ruby: '#701516',
  C: '#555555', 'C++': '#f34b7d', Rust: '#dea584', Kotlin: '#A97BFF',
}

function getIcon(name = '', lang) {
  const n = name.toLowerCase()
  if (n.includes('ctf')  || n.includes('hack')   || n.includes('pwn'))   return 'fa-solid fa-flag'
  if (n.includes('web')  || n.includes('http')   || n.includes('sql'))   return 'fa-solid fa-globe'
  if (n.includes('scan') || n.includes('recon')  || n.includes('osint')) return 'fa-solid fa-magnifying-glass'
  if (n.includes('exploit') || n.includes('vuln') || n.includes('cve'))  return 'fa-solid fa-bug'
  if (n.includes('tool') || n.includes('script') || n.includes('auto'))  return 'fa-solid fa-screwdriver-wrench'
  if (n.includes('crack') || n.includes('pass')  || n.includes('hash'))  return 'fa-solid fa-key'
  if (n.includes('raven') || n.includes('bird')  || n.includes('crow'))  return 'fa-solid fa-crow'
  if (lang === 'Python')                               return 'fa-brands fa-python'
  if (lang === 'JavaScript' || lang === 'TypeScript')  return 'fa-brands fa-js'
  if (lang === 'Shell')                                return 'fa-solid fa-terminal'
  if (lang === 'Java' || lang === 'Kotlin')            return 'fa-brands fa-java'
  if (lang === 'PHP')                                  return 'fa-brands fa-php'
  if (lang === 'Ruby')                                 return 'fa-solid fa-gem'
  return 'fa-solid fa-code'
}

const Card = memo(function Card({ repo, index }) {
  const { ref, visible } = useScrollReveal({ threshold: 0.06 })
  return (
    <div
      ref={ref}
      className={`project-card reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <div className="project-card-top">
        <i className={`${getIcon(repo.name, repo.language)} project-icon-wrap`} aria-hidden="true" />
        <div className="project-links">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
            className="project-link-btn" aria-label="GitHub repo">
            <i className="fa-brands fa-github" aria-hidden="true" />
          </a>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
              className="project-link-btn" aria-label="Live site">
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
      <h3 className="project-name">{repo.name}</h3>
      <p className="project-desc">{repo.description || 'No description provided.'}</p>
      <div className="project-meta">
        {repo.language && (
          <span className="project-lang">
            <span className="lang-dot" style={{ background: LANG_COLORS[repo.language] || '#555' }} />
            {repo.language}
          </span>
        )}
        <span className="project-stars">
          <i className="fa-solid fa-star" aria-hidden="true" /> {repo.stargazers_count}
        </span>
        <span className="project-fork">
          <i className="fa-solid fa-code-fork" aria-hidden="true" /> {repo.forks_count}
        </span>
      </div>
      {repo.topics?.length > 0 && (
        <div className="project-topics">
          {repo.topics.slice(0, 4).map(t => <span key={t} className="project-tag">{t}</span>)}
        </div>
      )}
    </div>
  )
})

export default function Projects() {
  const [repos,   setRepos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const header = useScrollReveal()

  useEffect(() => {
    const ctrl  = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 8000)

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`, {
      signal: ctrl.signal,
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
      .then(r => { clearTimeout(timer); if (!r.ok) throw new Error(); return r.json() })
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data
            .filter(r => !r.fork && r.name !== GITHUB_USER)
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          )
        }
        setLoading(false)
      })
      .catch(() => { clearTimeout(timer); setLoading(false) })

    return () => { clearTimeout(timer); ctrl.abort() }
  }, [])

  const toggleShowAll = useCallback(() => setShowAll(v => !v), [])
  const displayed = showAll ? repos : repos.slice(0, INITIAL_COUNT)

  return (
    <section className="section projects" id="projects">
      <div className="projects-bg-layer" data-parallax="med" aria-hidden="true" />
      <div className="container">

        <div className={`projects-header reveal${header.visible ? ' visible' : ''}`} ref={header.ref}>
          <div>
            <p className="section-label">Open Source</p>
            <h2 className="section-title">GitHub Repos</h2>
          </div>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank"
            rel="noopener noreferrer" className="projects-github-btn">
            <i className="fa-brands fa-github" aria-hidden="true" /> View Profile
          </a>
        </div>

        {loading ? (
          <div className="projects-loading" aria-live="polite">
            <i className="fa-solid fa-circle-notch" aria-hidden="true" />
            Fetching repositories...
          </div>
        ) : (
          <>
            {repos.length === 0 && (
              <div className="projects-notice" role="status">
                <i className="fa-solid fa-circle-info" aria-hidden="true" />
                GitHub API rate-limited — try again shortly.
              </div>
            )}
            <div className="projects-grid">
              {displayed.map((repo, i) => <Card key={repo.id} repo={repo} index={i} />)}
            </div>
            {repos.length > INITIAL_COUNT && (
              <div className="projects-show-more">
                <button className="btn-ghost" onClick={toggleShowAll}>
                  <i className={`fa-solid ${showAll ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true" />
                  {showAll ? 'Show Less' : `Show All ${repos.length} Repos`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
