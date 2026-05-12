import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme") || "dark";
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    };

    return (
        <>
            <Loader />
            <Navbar theme={theme} onToggleTheme={toggleTheme} />
            <main>
                <Home />
                <Skills />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
