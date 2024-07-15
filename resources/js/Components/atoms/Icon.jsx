import React from 'react'
import {AcademicCapIcon} from "@heroicons/react/24/outline/index.js";

export const Icon = ({children, ...props}) => {
    return (
        <span className={"text-slate-400 dark:text-white"} {...props}>
            {children || <AcademicCapIcon className="size-6 text-slate-400"/>}
        </span>
    )
}
