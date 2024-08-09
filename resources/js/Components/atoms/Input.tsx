import {Input as ShadcnInput} from '@/shadcn/ui/input'
import {forwardRef} from "react";

const Input = forwardRef(({value, ...props}, ref) => {
    return (
        <ShadcnInput value={value ?? ''} {...props}/>
    )
})

export default Input
