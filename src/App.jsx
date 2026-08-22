import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useScrollManager } from "./hooks/useScrollManager";

export default function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("portfolio-theme") || "dark";
    });

    useScrollManager();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("portfolio-theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

    return (
        <>
            <Loader />
            <Navbar theme={theme} onToggleTheme={toggleTheme} />
            <main>
                <Home />
                <Skills />
                <Projects />
                <Gallery />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
