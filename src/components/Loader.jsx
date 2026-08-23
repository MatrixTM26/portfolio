import { useEffect, useState } from "react";
import "../styles/Loader.css";

export default function Loader() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setHidden(true), 2000);
        return () => clearTimeout(t);
    }, []);

    if (hidden) return null;

    return (
        <div className="loader-overlay">
            <img
                src={`${import.meta.env.BASE_URL}loading.svg`}
                alt=""
                className="loader-svg"
                width="100"
                height="100"
            />
        </div>
    );
}
