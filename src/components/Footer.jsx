import "../styles/Footer.css";

const LINKS = [
    {
        href: "https://github.com/MatrixTM26",
        icon: "fa-brands fa-github",
        label: "GitHub"
    },
    {
        href: "https://instagram.com/matrix.tm26",
        icon: "fa-brands fa-instagram",
        label: "Instagram"
    },
    {
        href: "https://x.com/X_MatrixTM26",
        icon: "fa-brands fa-x-twitter",
        label: "X"
    }
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <p className="footer-copy">
                    &copy; {new Date().getFullYear()} <span>MatrixTM26</span>{" "}
                    &mdash; Emperor Security Research
                </p>
                <nav className="footer-links" aria-label="Social links">
                    {LINKS.map(l => (
                        <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                            aria-label={l.label}
                        >
                            <i className={l.icon} aria-hidden="true" />{" "}
                            {l.label}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
