const Label = ({ value, className = '', children, ...props }) => {
    return (
        <label {...props} className={`block font-medium text-sm text-slate-700 dark:text-slate-300 ${className}`}>
            {value ? value : children}
        </label>
    )
}

export default Label
