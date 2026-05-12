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
                threshold: options.threshold || 0.12,
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
        const onScroll = () => {
            const rect = el.parentElement?.getBoundingClientRect();
            if (!rect) return;
            const offset =
                (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
            el.style.transform = `translateY(${offset}px)`;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [speed]);

    return ref;
}
