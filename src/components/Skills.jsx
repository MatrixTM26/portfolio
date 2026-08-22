import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/Skills.css'

const ALL_SKILLS = [
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',               name: 'C'          },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', name: 'C++'       },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',       name: 'C#'        },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',           name: 'Rust'      },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',               name: 'Go'        },
  { fa:  'fa-solid fa-memory',                                                                   name: 'Assembly'  },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',           name: 'Java'      },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',       name: 'Kotlin'    },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',           name: 'Dart'      },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',     name: '.NET'      },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',       name: 'Python'    },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',           name: 'Bash'      },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg',           name: 'Perl'      },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',             name: 'PHP'       },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',           name: 'Ruby'      },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg',             name: 'Lua'       },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', name: 'PostgreSQL' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',     name: 'MongoDB'   },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',       name: 'SQLite'    },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg', name: 'Kafka', inv: true },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',       name: 'Docker'    },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',       name: 'Node.js'   },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg',       name: 'Gradle'    },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg',         name: 'Maven'     },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cmake/cmake-original.svg',         name: 'CMake'     },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',       name: 'GH Actions', inv: true },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',       name: 'GitLab CI' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',             name: 'Git'       },
  { fa:  'fa-solid fa-code-branch',                                                               name: 'Clang/LLVM'},
]

const CATEGORIES = [
  { icon: 'fa-solid fa-crosshairs', name: 'Offensive Security',  tags: ['Pen Testing','Red Team','Exploit Dev','Priv Esc','Post-Exploitation'] },
  { icon: 'fa-solid fa-globe',      name: 'Web Security',        tags: ['SQLi','XSS/CSRF','SSRF/XXE','IDOR','JWT Attacks','Auth Bypass']        },
  { icon: 'fa-solid fa-search',     name: 'Reconnaissance',      tags: ['Subdomain Enum','Port Scan','Google Dork','DNS Enum','Shodan']         },
  { icon: 'fa-solid fa-lock',       name: 'Crypto & Forensics',  tags: ['Hash Cracking','Steganography','Packet Analysis','Log Analysis']       },
]

function Chip({ item }) {
  return (
    <div className="skill-chip">
      {item.img
        ? <img src={item.img} alt={item.name} className={item.inv ? 'icon-invert' : ''} />
        : <i className={`${item.fa} skill-fa`} />
      }
      <span>{item.name}</span>
    </div>
  )
}

function Belt({ items, dir }) {
  const doubled = [...items, ...items]
  return (
    <div className={`skill-belt ${dir}`}>
      {doubled.map((item, i) => <Chip key={`${item.name}-${i}`} item={item} />)}
    </div>
  )
}

const ROW_SIZE = Math.ceil(ALL_SKILLS.length / 3)
const rows = [
  ALL_SKILLS.slice(0, ROW_SIZE),
  ALL_SKILLS.slice(ROW_SIZE, ROW_SIZE * 2),
  ALL_SKILLS.slice(ROW_SIZE * 2),
]

export default function Skills() {
  const header = useScrollReveal()
  const belts  = useScrollReveal()
  const cats   = useScrollReveal()

  return (
    <section className="section skills" id="skills">
      <div className="skills-bg-layer" data-parallax="slow" />
      <div className="container">

        <div className={`skills-header reveal${header.visible ? ' visible' : ''}`} ref={header.ref}>
          <p className="section-label">What I Work With</p>
          <h2 className="section-title">Skills &amp; Stack</h2>
          <p className="section-desc">
            A focused toolkit built through real-world practice — from CTF competitions
            to live bug bounty programs and red team engagements.
          </p>
        </div>

        <div className={`skill-belt-wrap reveal${belts.visible ? ' visible' : ''}`} ref={belts.ref}>
          <Belt items={rows[0]} dir="ltr" />
          <Belt items={rows[1]} dir="rtl" />
          <Belt items={rows[2]} dir="ltr" />
        </div>

        <div className={`skill-categories-grid reveal${cats.visible ? ' visible' : ''}`} ref={cats.ref}>
          {CATEGORIES.map((cat, i) => (
            <div key={cat.name} className="skill-cat-card"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="skill-cat-top">
                <i className={`${cat.icon} skill-cat-icon`} />
                <span className="skill-cat-name">{cat.name}</span>
              </div>
              <div className="skill-tag-list">
                {cat.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
