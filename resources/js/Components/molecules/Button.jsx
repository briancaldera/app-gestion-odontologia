import React from 'react';
import PropTypes from 'prop-types';
import {Button as MuiButton} from '@mui/joy'

export const Button = ({label, disabled = false, loading = false,...props}) => {
    return (
        <MuiButton variant={"solid"} disabled={disabled} loading={loading} className={'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'} {...props}>{label}</MuiButton>
    )
}
