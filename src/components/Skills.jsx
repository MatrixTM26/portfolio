import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/Skills.css'

const TECH_STACKS = [
  {
    header: 'fa-solid fa-microchip',
    label: 'Systems & Low-Level',
    items: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',               name: 'C'        },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', name: 'C++'     },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',       name: 'C#'      },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',           name: 'Rust'    },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',               name: 'Go'      },
      { fa: 'fa-solid fa-memory',                                                                    name: 'Assembly'},
    ],
  },
  {
    header: 'fa-solid fa-layer-group',
    label: 'JVM & Mobile',
    items: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',       name: 'Java'       },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',   name: 'Kotlin'     },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',       name: 'Dart'       },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg', name: '.NET'       },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg',   name: 'Gradle'     },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg',     name: 'Maven'      },
    ],
  },
  {
    header: 'fa-solid fa-terminal',
    label: 'Scripting',
    items: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', name: 'Python' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',     name: 'Bash'   },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg',     name: 'Perl'   },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',       name: 'PHP'    },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',     name: 'Ruby'   },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg',       name: 'Lua'    },
    ],
  },
  {
    header: 'fa-solid fa-database',
    label: 'Data & Infra',
    items: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',   name: 'PostgreSQL', },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',         name: 'MongoDB'     },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',           name: 'SQLite'      },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg', name: 'Kafka', inv: true },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',           name: 'Docker'      },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',           name: 'Node.js'     },
    ],
  },
  {
    header: 'fa-solid fa-arrows-rotate',
    label: 'Build & CI/CD',
    items: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cmake/cmake-original.svg',          name: 'CMake'      },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',        name: 'GH Actions', inv: true },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',        name: 'GitLab CI'  },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',              name: 'Git'        },
      { fa: 'fa-solid fa-code-branch',                                                                name: 'Clang/LLVM' },
    ],
  },
]

const CATEGORIES = [
  { icon: 'fa-solid fa-crosshairs', name: 'Offensive Security',  tags: ['Pen Testing','Red Team','Exploit Dev','Priv Esc','Post-Exploitation'] },
  { icon: 'fa-solid fa-globe',      name: 'Web Security',        tags: ['SQLi','XSS/CSRF','SSRF/XXE','IDOR','JWT Attacks','Auth Bypass']        },
  { icon: 'fa-solid fa-search',     name: 'Reconnaissance',      tags: ['Subdomain Enum','Port Scan','Google Dork','DNS Enum','Shodan']         },
  { icon: 'fa-solid fa-lock',       name: 'Crypto & Forensics',  tags: ['Hash Cracking','Steganography','Packet Analysis','Log Analysis']       },
]

const TOOLS = [
  { icon: 'fa-solid fa-spider',            name: 'Burp Suite'    },
  { icon: 'fa-solid fa-satellite-dish',    name: 'Nmap'          },
  { icon: 'fa-solid fa-bomb',              name: 'Metasploit'    },
  { icon: 'fa-solid fa-key',               name: 'Hashcat'       },
  { icon: 'fa-solid fa-database',          name: 'SQLMap'        },
  { icon: 'fa-solid fa-wave-square',       name: 'Wireshark'     },
  { icon: 'fa-solid fa-robot',             name: 'Nikto'         },
  { icon: 'fa-solid fa-magnifying-glass',  name: 'theHarvester'  },
  { icon: 'fa-solid fa-water',             name: 'Hydra'         },
  { icon: 'fa-solid fa-eye',               name: 'Shodan'        },
  { icon: 'fa-solid fa-terminal',          name: 'Ffuf'          },
  { icon: 'fa-brands fa-linux',            name: 'Kali Linux'    },
]

export default function Skills() {
  const header   = useScrollReveal()
  const stacks   = useScrollReveal()
  const cats     = useScrollReveal()
  const toolsRow = useScrollReveal()

  return (
    <section className="section skills" id="skills">
      <div className="container">

        <div className={`skills-header reveal${header.visible ? ' visible' : ''}`} ref={header.ref}>
          <p className="section-label">What I Do</p>
          <h2 className="section-title">Skills &amp; Stack</h2>
          <p className="section-desc">
            A focused toolkit built through real-world practice — from CTF competitions
            to live bug bounty programs and red team engagements.
          </p>
        </div>

        <div className={`skills-layout reveal${stacks.visible ? ' visible' : ''}`} ref={stacks.ref}>
          {TECH_STACKS.map(group => (
            <div key={group.label}>
              <div className="skill-group-header">
                <i className={group.header} />
                {group.label}
              </div>
              <div className="skill-list">
                {group.items.map(item => (
                  <div key={item.name} className="skill-item">
                    {item.img
                      ? <img src={item.img} alt={item.name} className={item.inv ? 'icon-invert' : ''} />
                      : <i className={`${item.fa} skill-fa`} />
                    }
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`skill-categories-grid reveal${cats.visible ? ' visible' : ''}`} ref={cats.ref}
          style={{ marginTop: '3rem' }}>
          {CATEGORIES.map(cat => (
            <div key={cat.name} className="skill-cat-card">
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

        <div className={`tools-block reveal${toolsRow.visible ? ' visible' : ''}`} ref={toolsRow.ref}>
          <p className="tools-block-title">
            <i className="fa-solid fa-screwdriver-wrench" /> Tools &amp; Arsenal
          </p>
          <div className="tools-row">
            {TOOLS.map(tool => (
              <span key={tool.name} className="tool-pill">
                <i className={tool.icon} /> {tool.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
