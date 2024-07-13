import React from 'react';
import PropTypes from 'prop-types';
import {Button as MuiButton} from '@mui/joy'
import { StyledEngineProvider } from '@mui/joy/styles';

export const Button = ({label, ...props}) => {
    return (
        <StyledEngineProvider injectFirst>
            <MuiButton className={'bg-amber-600 text-black'} {...props}>{label}</MuiButton>
        </StyledEngineProvider>
    )
}
