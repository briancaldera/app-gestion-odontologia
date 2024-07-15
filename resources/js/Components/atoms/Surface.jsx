import React from "react";
import {Button} from "@/Components/molecules/Button.jsx";

export const Surface = ({children, ...props}) => {
    return (
        <div
            className={'bg-white dark:bg-slate-800 px-3.5 py-2.5 rounded-lg pointer-events-auto shadow-xl shadow-black/5 ring-1 ring-slate-700/10'} {...props}>
            {children}
        </div>
    )
}

export default Surface
