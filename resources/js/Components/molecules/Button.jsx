import React from 'react';
import PropTypes from 'prop-types';
import {Button as MuiButton} from '@mui/joy'

export const Button = ({label, ...props}) => {
    return (
        <MuiButton variant={"solid"} className={'bg-indigo-600 hover:bg-indigo-500'} {...props}>{label}</MuiButton>
    )
}
