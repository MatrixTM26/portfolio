import "../styles/Footer.css";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-inner">
                <p className="footer-copy">
                    &copy; {year} <span>MatrixTM26</span>. All rights reserved.
                </p>
                <div className="footer-links">
                    <a
                        href="https://github.com/MatrixTM26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        <i className="fa-brands fa-github" /> GitHub
                    </a>
                    <a
                        href="https://t.me/MatrixTM26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        <i className="fa-brands fa-telegram" /> Telegram
                    </a>
                    <a
                        href="https://instagram.com/matrix.tm26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        <i className="fa-brands fa-instagram" /> Instagram
                    </a>
                </div>
            </div>
        </footer>
    );
}
