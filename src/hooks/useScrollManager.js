import { useEffect } from "react";

export function useScrollManager() {
    useEffect(() => {
        const SPEEDS = {
            "depth-1": 0.04,
            "depth-2": 0.1,
            "depth-3": 0.18,
            reverse: -0.08
        };

        const entries = [];

        const collect = () => {
            entries.length = 0;
            Object.keys(SPEEDS).forEach(key => {
                document
                    .querySelectorAll(`[data-parallax="${key}"]`)
                    .forEach(el => {
                        entries.push({ el, speed: SPEEDS[key] });
                    });
            });
        };

        let current = 0;
        let target = 0;
        let rafId = null;

        const lerp = (a, b, t) => a + (b - a) * t;

        const update = () => {
            current = lerp(current, target, 0.08);
            const delta = Math.abs(current - target);

            entries.forEach(({ el, speed }) => {
                const section = el.closest("section") || el.parentElement;
                if (!section) return;
                const rect = section.getBoundingClientRect();
                const centerY =
                    rect.top + rect.height * 0.5 - window.innerHeight * 0.5;
                el.style.transform = `translateY(${centerY * speed}px) translateZ(0)`;
            });

            if (delta > 0.05) {
                rafId = requestAnimationFrame(update);
            } else {
                rafId = null;
            }
        };

        const onScroll = () => {
            target = window.scrollY;
            if (!rafId) {
                rafId = requestAnimationFrame(update);
            }
        };

        const onResize = () => {
            collect();
            target = window.scrollY;
            current = target;
            update();
        };

        collect();
        target = window.scrollY;
        current = target;
        update();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);
}
