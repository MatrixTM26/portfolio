import { useEffect } from "react";

export function useScrollManager() {
    useEffect(() => {
        let lastY = window.scrollY;
        let ticking = false;

        const elements = {
            parallaxSlow: '[data-parallax="slow"]',
            parallaxMed: '[data-parallax="med"]',
            parallaxFast: '[data-parallax="fast"]',
            parallaxReverse: '[data-parallax="reverse"]',
            floatY: "[data-float]"
        };

        const SPEEDS = { slow: 0.08, med: 0.18, fast: 0.32, reverse: -0.14 };

        const update = () => {
            const y = window.scrollY;

            Object.entries(SPEEDS).forEach(([key, speed]) => {
                const selector = `[data-parallax="${key}"]`;
                document.querySelectorAll(selector).forEach(el => {
                    const rect =
                        el.closest("section")?.getBoundingClientRect() ||
                        el.getBoundingClientRect();
                    const center =
                        rect.top + rect.height / 2 - window.innerHeight / 2;
                    el.style.transform = `translateY(${center * speed}px)`;
                });
            });

            document.querySelectorAll("[data-float]").forEach(el => {
                const speed = parseFloat(
                    el.getAttribute("data-float") || "0.05"
                );
                el.style.transform = `translateY(${y * speed}px)`;
            });

            lastY = y;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        update();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
}
