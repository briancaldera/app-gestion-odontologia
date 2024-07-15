import React from 'react';
import PropTypes from 'prop-types';
import {Button as MuiButton} from '@mui/joy'

export const OutlinedButton = ({label, disabled = false, loading = false, onClick = () => {},...props}) => {
    return (
        <MuiButton onClick={onClick} variant={"outlined"} disabled={disabled} loading={loading} className={'text-slate-900 dark:text-white font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50'} {...props}>{label}</MuiButton>
    )
}
