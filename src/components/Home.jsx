import React, { useEffect, useRef } from 'react';
import "../styles/Home.css";

const SOCIALS = [
    {
        icon: "fa-brands fa-github",
        href: "https://github.com/MatrixTM26",
        label: "GitHub"
    },
    {
        icon: "fa-brands fa-instagram",
        href: "https://instagram.com/matrix.tm26",
        label: "Instagram"
    },
    {
        icon: "fa-brands fa-telegram",
        href: "https://t.me/MatrixTM26",
        label: "Telegram"
    }
];

const STATS = [
    { number: "50+", label: "CTF Solved" },
    { number: "20+", label: "Bugs Reported" },
    { number: "4+", label: "Years Active" }
];

export default function Home() {
    const bgRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            if (bgRef.current) {
                bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section className="home" id="home">
            <div className="home-parallax-bg" ref={bgRef} />
            <div className="home-grid-lines" />

            <div className="container">
                <div className="home-inner">
                    <div className="home-left">
                        <div className="home-headline-block">
                            <p className="home-role-label">
                                Cybersecurity Specialist
                            </p>
                            <h1 className="home-headline">
                                Providing the Best
                                <br />
                                <span className="blue-word">Cyber</span>{" "}
                                Solutions
                                <br />
                                for Your Security
                            </h1>
                        </div>

                        <p className="home-desc">
                            I'm ready to protect your data from hackers.
                            Specialized in penetration testing, vulnerability
                            research, and bug bounty hunting — keeping your
                            systems one step ahead of threats.
                        </p>

                        <div className="home-stats">
                            {STATS.map((s, i) => (
                                <div key={s.label} className="home-stat">
                                    <span className="home-stat-number">
                                        {s.number}
                                    </span>
                                    <span className="home-stat-label">
                                        {s.label}
                                    </span>
                                    {i < STATS.length - 1 && (
                                        <span className="stat-divider" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="home-cta">
                            <a href="#contact" className="btn-primary">
                                Get Started{" "}
                                <i className="fa-solid fa-arrow-right" />
                            </a>
                            <a href="#skills" className="btn-ghost">
                                Learn More
                            </a>
                        </div>

                        <div className="home-socials">
                            <span className="home-socials-label">Follow</span>
                            {SOCIALS.map(s => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon-link"
                                    aria-label={s.label}
                                >
                                    <i className={s.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="home-right">
                        <div className="profile-section">
                            <div className="profile-avatar-wrap">
                                <div className="profile-ring" />
                                <div className="profile-circle">
                                    <img
                                        src="https://images.unsplash.com/photo-1674049404913-2005c02245fa?q=80&w=762&auto=format&fit=crop"
                                        alt="MatrixTM26"
                                        className="profile-img"
                                        onError={e => {
                                            e.target.src =
                                                "https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&q=80&fit=crop";
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="profile-info">
                                <h2 className="profile-name">TEUKU MAULANA</h2>
                                <p className="profile-title">
                                    Penetration Tester · Bug Hunter
                                </p>
                                <div className="profile-badges">
                                    <div className="profile-badge">
                                        <i className="fa-solid fa-shield-halved" />
                                        <span>Open to Work</span>
                                    </div>
                                    <div className="profile-badge">
                                        <i className="fa-solid fa-trophy" />
                                        <span>50+ CTF Solved</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
