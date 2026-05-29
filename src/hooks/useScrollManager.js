import { useEffect } from "react";

export function useScrollManager() {
    useEffect(() => {
        const SPEEDS = { slow: 0.06, med: 0.13, reverse: -0.08 };

        let entries = [];
        let rafId = null;
        let isScrolling = false;
        let scrollTimer = null;

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
        };

        const apply = () => {
            const vh = window.innerHeight * 0.5;
            entries.forEach(({ el, speed, section }) => {
                if (!section) return;
                const rect = section.getBoundingClientRect();
                const offset = (rect.top + rect.height * 0.5 - vh) * speed;
                el.style.transform = `translateY(${offset}px) translateZ(0)`;
            });
        };

        const loop = () => {
            apply();
            if (isScrolling) rafId = requestAnimationFrame(loop);
            else rafId = null;
        };

        const onScroll = () => {
            isScrolling = true;
            clearTimeout(scrollTimer);
            if (!rafId) rafId = requestAnimationFrame(loop);
            scrollTimer = setTimeout(() => {
                isScrolling = false;
                apply();
            }, 120);
        };

        const onResize = () => {
            collect();
            apply();
        };

        collect();
        apply();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            clearTimeout(scrollTimer);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);
}
