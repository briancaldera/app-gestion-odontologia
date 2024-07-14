import React from 'react';
import { Typography as MuiTypography } from '@mui/joy'
import PropTypes from 'prop-types';

export const Text = ({text, ...props}) => {
    return (
        <MuiTypography {...props}>{text}</MuiTypography>
    )
}
