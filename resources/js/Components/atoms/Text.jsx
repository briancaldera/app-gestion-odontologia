import React from 'react';
import PropTypes from 'prop-types';
import { Typography as MuiTypography } from '@mui/joy'
import Colors from "@/Components/atoms/Colors.jsx";

export const Text = ({level, children, ...props}) => {
    return (
            <MuiTypography className={"dark:text-slate-300"} level={level} sx={{color: Colors["text-slate-700"]}} {...props}>{children}</MuiTypography>
    )
}
