import {Select as MuiSelect, Option as MuiOption} from '@mui/joy'

const Select = ({value, id, onChange = (_) => {}, disabled = false, required = false, children}) => {
    return (
        <MuiSelect value={value} id={id} onChange={(e, value) => onChange(value)} disabled={disabled} required={required}>
            {children}
        </MuiSelect>
    )
}

const Option = ({value, children}) => {
    return (
        <MuiOption value={value}>{children}</MuiOption>
    )
}

Select.Option = Option

export default Select
