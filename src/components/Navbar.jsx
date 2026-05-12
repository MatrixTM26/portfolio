import React, { useEffect, useState } from 'react';
import "../styles/Navbar.css";

const NAV_ITEMS = [
    { label: "Home", href: "#home", icon: "fa-solid fa-house" },
    { label: "Skills", href: "#skills", icon: "fa-solid fa-shield-halved" },
    { label: "Projects", href: "#projects", icon: "fa-solid fa-code-branch" },
    { label: "Contact", href: "#contact", icon: "fa-solid fa-envelope" }
];

export default function Navbar({ theme, onToggleTheme }) {
    const [active, setActive] = useState("#home");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const ids = ["contact", "projects", "skills", "home"];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActive(`#${id}`);
                    break;
                }
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const handleLink = href => {
        setActive(href);
        setMobileOpen(false);
    };

    return (
        <>
            <div className="desktop-float-dock">
                <a
                    href="#home"
                    className="fdock-logo"
                    onClick={() => handleLink("#home")}
                >
                    <i className="fa-solid fa-shield-halved" />
                    <span>
                        Matrix<span className="fdock-logo-accent">TM26</span>
                    </span>
                </a>

                <span className="fdock-divider" />

                {NAV_ITEMS.map(item => (
                    <a
                        key={item.href}
                        href={item.href}
                        className={`fdock-item${active === item.href ? " active" : ""}`}
                        onClick={() => handleLink(item.href)}
                    >
                        <i className={item.icon} />
                        {item.label}
                    </a>
                ))}

                <span className="fdock-divider" />

                <button
                    className="fdock-theme"
                    onClick={onToggleTheme}
                    aria-label="Toggle theme"
                >
                    <i
                        className={`fa-solid ${theme === "dark" ? "fa-moon" : "fa-sun"}`}
                    />
                    <span className="fdock-theme-track">
                        <span className="fdock-theme-thumb" />
                    </span>
                </button>

                <a
                    href="#contact"
                    className="fdock-cta"
                    onClick={() => handleLink("#contact")}
                >
                    <i className="fa-solid fa-paper-plane" />
                    Let's Talk
                </a>
            </div>

            <button
                className={`nav-mobile-toggle${mobileOpen ? " open" : ""}`}
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Toggle menu"
            >
                <span className="hamburger-lines">
                    <span />
                    <span />
                    <span />
                </span>
            </button>

            <div
                className={`mobile-menu-overlay${mobileOpen ? " open" : ""}`}
                onClick={() => setMobileOpen(false)}
            />

            <div className={`mobile-dock${mobileOpen ? " open" : ""}`}>
                {NAV_ITEMS.map(item => (
                    <a
                        key={item.href}
                        href={item.href}
                        className={`dock-item${active === item.href ? " active" : ""}`}
                        onClick={() => handleLink(item.href)}
                    >
                        <i className={item.icon} />
                        <span className="dock-label">{item.label}</span>
                    </a>
                ))}
                <span className="dock-divider" />
                <a
                    href="#contact"
                    className="dock-cta"
                    onClick={() => handleLink("#contact")}
                >
                    <i className="fa-solid fa-paper-plane" />
                    <span className="dock-label">Talk</span>
                </a>
            </div>
        </>
    );
}
