import {Typography} from "@mui/joy";
import Colors from "@/Components/atoms/Colors.jsx";

export const ErrorText = ({ message, className = '', ...props }) => {
    return message ? (
        <p className={`text-sm text-rose-600 dark:text-rose-500 ${className}`} {...props}>
            {message}
        </p>
    ) : null;
}

export default ErrorText
