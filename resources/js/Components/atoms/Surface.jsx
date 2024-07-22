import React from "react";

export const Surface = ({ children, className = "", ...props }) => {
    return (
        <div
            className={`pointer-events-auto rounded-lg bg-white px-3.5 py-2.5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10 dark:bg-slate-800 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Surface;
