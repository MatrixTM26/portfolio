import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { useScrollManager } from "./hooks/useScrollManager";

const Home = lazy(() => import("./components/Home"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Gallery = lazy(() => import("./components/Gallery"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("portfolio-theme") || "dark"
    );

    useScrollManager();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("portfolio-theme", theme);
    }, [theme]);

    const toggleTheme = useCallback(
        () => setTheme(t => (t === "dark" ? "light" : "dark")),
        []
    );

    return (
        <>
            <Loader />
            <Navbar theme={theme} onToggleTheme={toggleTheme} />
            <main>
                <Suspense fallback={null}>
                    <Home />
                    <Skills />
                    <Projects />
                    <Gallery />
                    <Contact />
                </Suspense>
            </main>
            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </>
    );
}
