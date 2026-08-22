import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/Contact.css";

const CHANNELS = [
    {
        icon: "fa-brands fa-github",
        label: "GitHub",
        value: "MatrixTM26",
        href: "https://github.com/MatrixTM26"
    },
    {
        icon: "fa-brands fa-instagram",
        label: "Instagram",
        value: "matrix.tm26",
        href: "https://instagram.com/matrix.tm26"
    },
    {
        icon: "fa-brands fa-x-twitter",
        label: "X",
        value: "X_MatrixTM26",
        href: "https://x.com/X_MatrixTM26"
    },
    {
        icon: "fa-brands fa-telegram",
        label: "Telegram",
        value: "MatrixTM26",
        href: "https://t.me/MatrixTM26"
    }
];

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState(null);

    const header = useScrollReveal();
    const leftCol = useScrollReveal();
    const rightCol = useScrollReveal();

    const handleChange = e =>
        setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = () => {
        if (!form.name || !form.email || !form.message) {
            setStatus("error");
            return;
        }
        const sub = encodeURIComponent(
            form.subject || `Message from ${form.name}`
        );
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );
        window.open(`mailto:matrixtm26@proton.me?subject=${sub}&body=${body}`);
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <section className="section contact-section" id="contact">
            <div className="contact-bg-layer" data-parallax="slow" />
            <div className="container">
                <div
                    className={`reveal${header.visible ? " visible" : ""}`}
                    ref={header.ref}
                >
                    <p className="section-label">Get in Touch</p>
                    <h2 className="section-title">Contact</h2>
                    <p className="section-desc">
                        Open to security collaborations, bug bounty
                        partnerships, and red team engagements.
                    </p>
                </div>

                <div className="contact-layout">
                    <div
                        className={`reveal-left${leftCol.visible ? " visible" : ""}`}
                        ref={leftCol.ref}
                    >
                        <div className="contact-channels">
                            {CHANNELS.map((ch, i) => (
                                <a
                                    key={ch.label}
                                    href={ch.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-channel"
                                    style={{ transitionDelay: `${i * 60}ms` }}
                                >
                                    <div className="ch-icon-wrap">
                                        <i className={ch.icon} />
                                    </div>
                                    <div className="ch-info">
                                        <div className="ch-label">
                                            {ch.label}
                                        </div>
                                        <div className="ch-value">
                                            {ch.value}
                                        </div>
                                    </div>
                                    <i className="fa-solid fa-arrow-right ch-arrow" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`contact-form reveal-right${rightCol.visible ? " visible" : ""}`}
                        ref={rightCol.ref}
                    >
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    className="form-input"
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Subject</label>
                            <input
                                className="form-input"
                                type="text"
                                name="subject"
                                placeholder="What's this about?"
                                value={form.subject}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea
                                className="form-textarea"
                                name="message"
                                placeholder="Describe your project or question..."
                                value={form.message}
                                onChange={handleChange}
                                rows={5}
                            />
                        </div>
                        {status === "success" && (
                            <div className="form-status success">
                                <i className="fa-solid fa-circle-check" />{" "}
                                Message sent.
                            </div>
                        )}
                        {status === "error" && (
                            <div className="form-status error">
                                <i className="fa-solid fa-circle-exclamation" />{" "}
                                Fill in all required fields.
                            </div>
                        )}
                        <button className="form-submit" onClick={handleSubmit}>
                            <i className="fa-solid fa-paper-plane" /> Send
                            Message
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
