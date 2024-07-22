const Label = ({ value, htmlFor = null, className = '', children, ...props }) => {
    return (
        <label {...props} className={`block leading-6 font-medium text-sm text-gray-700 dark:text-gray-300 ${className}`} htmlFor={htmlFor}>
            {value ? value : children}
        </label>
    )
}

export default Label
