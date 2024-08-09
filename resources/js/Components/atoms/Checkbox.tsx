import {Checkbox as ShadcnCheckbox} from "@/shadcn/ui/checkbox";
import React from "react";

const Checkbox = React.forwardRef(({...props}, ref) => {
    return <ShadcnCheckbox {...props}/>
})

export default Checkbox
