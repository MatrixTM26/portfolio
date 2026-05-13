import { useEffect } from "react";

export function useScrollManager() {
    useEffect(() => {
        const SPEEDS = {
            slow: 0.05,
            med: 0.1,
            reverse: -0.07
        };

        const state = new Map();
        let rafId = null;

        const tick = () => {
            Object.entries(SPEEDS).forEach(([key, speed]) => {
                document
                    .querySelectorAll(`[data-parallax="${key}"]`)
                    .forEach(el => {
                        const rect = el.getBoundingClientRect();
                        const center =
                            rect.top + rect.height / 2 - window.innerHeight / 2;
                        const target = center * speed;
                        const cur = state.get(el) ?? target;
                        const next = cur + (target - cur) * 0.09;

                        state.set(el, next);
                        el.style.transform = `translateY(${next}px)`;
                    });
            });
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []);
}
