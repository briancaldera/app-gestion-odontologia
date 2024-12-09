import React from "react";
import {Typography} from "@mui/joy";
import Colors from "@/Components/atoms/Colors.jsx";

const Heading = ({level, children, ...props}) => {
    return <Typography level={level} className={"font-bold dark:text-slate-100"} sx={{color: Colors["text-slate-900"], fontFamily: 'Inter Variable', letterSpacing: '-0.025em'}} {...props}>{children}</Typography>
}

export default Heading
