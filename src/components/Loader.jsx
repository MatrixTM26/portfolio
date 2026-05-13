import React, { useEffect, useState } from 'react';
import "../styles/Loader.css";

export default function Loader() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setHidden(true), 6000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className={`loader-overlay${hidden ? " hidden" : ""}`}>
            <div className="loader-body">
                <img src="/loading.svg" alt="Loading" className="loader-svg" />
                <div className="loader-text-block">
                    <div className="loader-name">
                        MATRIXTM<span>26</span>
                    </div>
                    <div className="loader-bar-wrap">
                        <div className="loader-bar" />
                    </div>
                    <p className="loader-status">
                        Initializing secure connection...
                    </p>
                </div>
            </div>
        </div>
    );
}
