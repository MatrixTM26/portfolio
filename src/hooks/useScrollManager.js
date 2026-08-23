import { useEffect } from "react";

const SPEEDS = { slow: 0.05, med: 0.12, fast: 0.25, reverse: -0.08 };

export function useScrollManager() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        let entries = [];
        let rafId = null;
        let ticking = false;

        const getDocTop = el => {
            let top = 0;
            while (el) {
                top += el.offsetTop;
                el = el.offsetParent;
            }
            return top;
        };

        const remeasure = () => {
            entries.forEach(e => {
                e.sectionTop = getDocTop(e.section);
                e.sectionHeight = e.section.offsetHeight;
            });
        };

        const collect = () => {
            entries = [];
            for (const [key, speed] of Object.entries(SPEEDS)) {
                document
                    .querySelectorAll(`[data-parallax="${key}"]`)
                    .forEach(el => {
                        const section =
                            el.closest("section") || el.parentElement;
                        entries.push({ el, speed, section });
                    });
            }
            remeasure();
        };

        const apply = () => {
            const sy = window.scrollY;
            const vh = window.innerHeight * 0.5;
            for (const { el, speed, sectionTop, sectionHeight } of entries) {
                const mid = sectionTop + sectionHeight * 0.5;
                const offset = (mid - sy - vh) * speed;
                el.style.transform = `translateY(${offset.toFixed(2)}px) translateZ(0)`;
            }
            ticking = false;
        };

        const loop = () => {
            if (!ticking) {
                ticking = true;
                rafId = requestAnimationFrame(apply);
            }
        };

        let resizeTimer;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                remeasure();
                apply();
            }, 120);
        };

        collect();
        apply();
        window.addEventListener("scroll", loop, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });

        return () => {
            window.removeEventListener("scroll", loop);
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(rafId);
            clearTimeout(resizeTimer);
        };
    }, []);
}
