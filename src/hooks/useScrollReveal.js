import { useEffect, useRef, useState } from "react";

const defaultOpts = { threshold: 0.1, rootMargin: "0px" };

export function useScrollReveal(options = defaultOpts) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setVisible(true);
            return;
        }
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            {
                threshold: options.threshold ?? 0.1,
                rootMargin: options.rootMargin ?? "0px"
            }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return { ref, visible };
}
