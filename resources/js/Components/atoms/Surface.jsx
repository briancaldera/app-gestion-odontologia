import React from "react";
import {cn} from "@/lib/utils";

export const Surface = ({ children, className = "", ...props }) => {

    const defaultStyle = 'pointer-events-auto rounded-lg bg-white px-3.5 py-2.5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10 dark:bg-slate-800'

    return (
        <div
            className={cn(defaultStyle, className)}
            {...props}
        >
            {children}
        </div>
    );
};

export default Surface;
