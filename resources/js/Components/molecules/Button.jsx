import React from 'react';
import PropTypes from 'prop-types';
import {Button as MuiButton} from '@mui/joy'

export const Button = ({label, ...props}) => {
    return (
        <MuiButton className={'bg-amber-500 text-white'} {...props}>{label}</MuiButton>
    )
}
