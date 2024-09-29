import React from 'react'
import {cn} from "@/lib/utils.ts";

const Icon = ({className = "", onClick = null, children, ...props}: { className?: string, onClick?: () => void }) => {
    const defaultStyle = `size-fit text-slate-400 dark:text-white ${onClick && 'cursor-pointer'}`
    return (
        <span className={cn(defaultStyle, className)} onClick={onClick} {...props}>
            {children}
        </span>
    )
}

export {Icon}
export default Icon
