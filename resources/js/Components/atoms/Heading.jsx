import React from "react";
import {Typography} from "@mui/joy";
import Colors from "@/Components/atoms/Colors.jsx";

const Heading = ({level, children, ...props}) => {
    return <Typography level={level} className={"font-extrabold dark:text-slate-100"} sx={{color: Colors["text-slate-900"], fontFamily: 'Inter Variable'}} {...props}>{children}</Typography>
}

export default Heading
