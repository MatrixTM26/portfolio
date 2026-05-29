import { useEffect } from "react";

export function useScrollManager() {
    useEffect(() => {
        const SPEEDS = { slow: 0.06, med: 0.13, reverse: -0.08 };

        let entries = [];
        let rafId = null;

        const getDocTop = el => {
            let top = 0;
            while (el) {
                top += el.offsetTop;
                el = el.offsetParent;
            }
            return top;
        };

        const collect = () => {
            entries = [];
            Object.entries(SPEEDS).forEach(([key, speed]) => {
                document
                    .querySelectorAll(`[data-parallax="${key}"]`)
                    .forEach(el => {
                        const section =
                            el.closest("section") || el.parentElement;
                        entries.push({ el, speed, section });
                    });
            });
            remeasure();
        };

        const remeasure = () => {
            entries.forEach(e => {
                e.top = getDocTop(e.section);
                e.height = e.section.offsetHeight;
            });
        };

        const apply = () => {
            const sy = window.scrollY;
            const vh = window.innerHeight * 0.5;
            entries.forEach(({ el, speed, top, height }) => {
                const mid = top + height * 0.5;
                const offset = (mid - sy - vh) * speed;
                el.style.transform = `translateY(${offset}px) translateZ(0)`;
            });
        };

        const loop = () => {
            apply();
            rafId = requestAnimationFrame(loop);
        };

        const onResize = () => {
            remeasure();
            apply();
        };

        collect();
        apply();
        rafId = requestAnimationFrame(loop);

        window.addEventListener("resize", onResize, { passive: true });

        return () => {
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(rafId);
        };
    }, []);
}
