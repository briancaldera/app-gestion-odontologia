import {Input as ShadcnInput, InputProps} from '@/shadcn/ui/input'
import {forwardRef} from "react";

const Input = forwardRef(({...props} : InputProps, ref) => {
    return (
        <ShadcnInput {...props}/>
    )
})

export default Input
