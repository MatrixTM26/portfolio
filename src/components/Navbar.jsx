import React, { useEffect, useState } from 'react';
import "../styles/Navbar.css";

const NAV_ITEMS = [
    { label: "Home", href: "#home", icon: "fa-solid fa-house" },
    { label: "Skills", href: "#skills", icon: "fa-solid fa-shield-halved" },
    { label: "Projects", href: "#projects", icon: "fa-solid fa-code-branch" },
    { label: "Contact", href: "#contact", icon: "fa-solid fa-envelope" }
];

export default function Navbar({ theme, onToggleTheme }) {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("#home");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showFDock, setShowFDock] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
            setShowFDock(window.scrollY > 300);
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
        document.body.style.overflow = mobileOpen || drawerOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen, drawerOpen]);

    const closeMobile = () => setMobileOpen(false);
    const closeDrawer = () => setDrawerOpen(false);

    const handleLink = href => {
        setActive(href);
        closeMobile();
        closeDrawer();
    };

    return (
        <>
            <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
                <div className="navbar-inner">
                    <a
                        href="#home"
                        className="nav-logo"
                        onClick={() => handleLink("#home")}
                    >
                        <span className="nav-logo-icon">
                            <i className="fa-solid fa-shield-halved" />
                        </span>
                        <span className="nav-logo-text">
                            Matrix<span>TM26</span>
                        </span>
                    </a>

                    <div className="nav-desktop">
                        <ul className="nav-links-desktop">
                            {NAV_ITEMS.map(item => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className={
                                            active === item.href ? "active" : ""
                                        }
                                        onClick={() => handleLink(item.href)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="nav-right">
                            <button
                                className="theme-toggle"
                                onClick={onToggleTheme}
                                aria-label="Toggle theme"
                            >
                                <div className="theme-toggle-thumb">
                                    <i
                                        className={`fa-solid ${theme === "dark" ? "fa-moon" : "fa-sun"}`}
                                    />
                                </div>
                            </button>
                            <a
                                href="#contact"
                                className="nav-cta-desktop"
                                onClick={() => handleLink("#contact")}
                            >
                                Let's Talk
                            </a>
                            <button
                                className="nav-burger-desktop"
                                onClick={() => setDrawerOpen(v => !v)}
                                aria-label="Menu"
                            >
                                <span className="burger-icon">
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </button>
                        </div>
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
                </div>
            </nav>

            <div
                className={`desktop-float-dock${showFDock ? "" : " hidden-dock"}`}
            >
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
                <a
                    href="#contact"
                    className="fdock-cta"
                    onClick={() => handleLink("#contact")}
                >
                    <i className="fa-solid fa-paper-plane" />
                    Contact
                </a>
            </div>

            <div
                className={`nav-drawer-overlay${drawerOpen ? " open" : ""}`}
                onClick={closeDrawer}
            />
            <div className={`nav-drawer${drawerOpen ? " open" : ""}`}>
                <div className="drawer-header">
                    <span className="drawer-title">Navigation</span>
                    <button className="drawer-close" onClick={closeDrawer}>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>
                <ul className="drawer-links">
                    {NAV_ITEMS.map(item => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={active === item.href ? "active" : ""}
                                onClick={() => handleLink(item.href)}
                            >
                                <i className={item.icon} />
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="drawer-footer">
                    <a
                        href="#contact"
                        className="drawer-cta"
                        onClick={() => handleLink("#contact")}
                    >
                        <i className="fa-solid fa-paper-plane" />
                        Let's Talk
                    </a>
                </div>
            </div>

            <div
                className={`mobile-menu-overlay${mobileOpen ? " open" : ""}`}
                onClick={closeMobile}
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
