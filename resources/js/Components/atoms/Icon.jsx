import React from 'react'
import {NoSymbolIcon} from "@heroicons/react/24/outline/index.js";

export const Icon = ({className = "", onClick = null, children, props}) => {
    return (
        <div className={`flex justify-center items-center size-6 text-slate-400 dark:text-white ${className} ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick} {...props}>
            {children || <NoSymbolIcon className="text-slate-400 dark:text-white"/>}
        </div>
    )
}
