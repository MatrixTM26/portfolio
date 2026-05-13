import { useEffect } from "react";

export function useScrollManager() {
    useEffect(() => {
        let ticking = false;

        const SPEEDS = {
            slow: 0.06,
            med: 0.12,
            fast: 0.22,
            reverse: -0.09,
            card: 0.05,
            "card-alt": -0.04,
            subtle: 0.03
        };

        const getOffset = (el, speed) => {
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2 - window.innerHeight / 2;
            return center * speed;
        };

        const update = () => {
            Object.entries(SPEEDS).forEach(([key, speed]) => {
                document
                    .querySelectorAll(`[data-parallax="${key}"]`)
                    .forEach(el => {
                        const offset = getOffset(el, speed);
                        el.style.transform = `translateY(${offset}px)`;
                        el.style.willChange = "transform";
                    });
            });
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
