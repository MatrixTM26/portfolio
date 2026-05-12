import { useEffect, useRef, useState } from "react";

export function useScrollReveal(options = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || "0px"
            }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return { ref, visible };
}

export function useParallax(speed = 0.3) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let ticking = false;

        const update = () => {
            const parent = el.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            const center = rect.top + rect.height / 2 - window.innerHeight / 2;
            el.style.transform = `translateY(${center * speed}px)`;
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
    }, [speed]);

    return ref;
}
