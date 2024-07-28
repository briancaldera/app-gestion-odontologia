import React from "react";
import {Switch as MuiSwitch} from '@mui/joy';

const Switch = ({iconOn = null, iconOff = null, checked = false, onClick = () => {}, size = 'md', ...props}) => {

    return (
        <MuiSwitch
            onChange={onClick}
            checked={checked}
            size={size}
            slotProps={{
                thumb: {
                    children: (checked ? iconOn : iconOff),
                },
            }}
            {...props}
        />
    )
}


export default Switch
