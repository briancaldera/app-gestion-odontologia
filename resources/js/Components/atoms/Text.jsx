import React from 'react';
import PropTypes from 'prop-types';
import { Typography as MuiTypography } from '@mui/joy'

const colors = {
    "text-slate-500": 'rgb(100 116 139)',
    "text-slate-700": 'rgb(51 65 85)',
}

export const Text = ({children, ...props}) => {
    return (
            <MuiTypography className={"dark:text-white"} level={"body-md"} sx={{color: colors["text-slate-700"]}} {...props}>{children}</MuiTypography>
    )
}
