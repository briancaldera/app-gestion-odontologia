import React from "react";
import {Typography} from "@mui/joy";
import Colors from "@/Components/atoms/Colors.jsx";
import {cn} from "@/lib/utils.ts";

const Title = ({level, children = "", className, ...props}) => {
    const defaultClassName = "font-medium dark:text-slate-100"
    return <Typography level={level} className={cn(defaultClassName, className)} sx={{color: Colors["text-slate-900"], fontFamily: 'Inter Variable'}} {...props}>{children}</Typography>
}

export default Title
