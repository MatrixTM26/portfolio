import { useEffect } from "react";

export function useScrollManager() {
    useEffect(() => {
        const SPEEDS = {
            slow: 0.06,
            med: 0.12,
            fast: 0.22,
            reverse: -0.09,
            card: 0.05,
            "card-alt": -0.04,
            subtle: 0.03
        };

        const state = new Map();
        const targets = new Map();
        let rafId = null;

        const LERP = 0.08;

        const lerp = (a, b, t) => a + (b - a) * t;

        const collect = () => {
            Object.entries(SPEEDS).forEach(([key, speed]) => {
                document
                    .querySelectorAll(`[data-parallax="${key}"]`)
                    .forEach(el => {
                        if (!targets.has(el)) {
                            targets.set(el, speed);
                            state.set(el, 0);
                        }
                    });
            });
        };

        const tick = () => {
            let anyMoving = false;

            targets.forEach((speed, el) => {
                const rect = el.getBoundingClientRect();
                const center =
                    rect.top + rect.height / 2 - window.innerHeight / 2;
                const target = center * speed;

                const current = state.get(el) ?? 0;
                const next = lerp(current, target, LERP);

                if (Math.abs(next - current) > 0.01) {
                    anyMoving = true;
                }

                state.set(el, next);
                el.style.transform = `translateY(${next}px)`;
            });

            rafId = requestAnimationFrame(tick);
        };

        collect();

        const onScroll = () => {
            collect();
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", collect, { passive: true });

        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", collect);
        };
    }, []);
}
