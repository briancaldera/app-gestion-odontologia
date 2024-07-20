const Label = ({ value, className = '', children, ...props }) => {
    return (
        <label {...props} className={`block leading-6 font-medium text-sm text-gray-700 dark:text-gray-300 ${className}`}>
            {value ? value : children}
        </label>
    )
}

export default Label
