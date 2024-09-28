import React from 'react'
import {NoSymbolIcon} from "@heroicons/react/24/outline";
import {cn} from "@/lib/utils.ts";

const Icon = ({className = "", onClick = null, children, ...props}) => {
    const defaultStyle = `size-fit text-slate-400 dark:text-white ${onClick && 'cursor-pointer'}`
    return (
        <div className={cn(defaultStyle, className)} onClick={onClick} {...props}>
            {children || <NoSymbolIcon/>}
        </div>
    )
}

export {Icon}
export default Icon
