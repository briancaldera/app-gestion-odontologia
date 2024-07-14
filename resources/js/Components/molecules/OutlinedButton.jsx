import React from 'react';
import PropTypes from 'prop-types';
import {Button as MuiButton} from '@mui/joy'

export const OutlinedButton = ({label, ...props}) => {
    return (
        <MuiButton variant={"outlined"} className={'text-slate-900 dark:text-white font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50'} {...props}>{label}</MuiButton>
    )
}
