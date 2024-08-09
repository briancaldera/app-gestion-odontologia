import {Textarea as ShadcnTextarea} from "@/shadcn/ui/textarea";

import React from "react";

const Textarea = React.forwardRef(({value, ...props}, ref) => (<ShadcnTextarea value={value ?? ''} {...props}/>))

export default Textarea
