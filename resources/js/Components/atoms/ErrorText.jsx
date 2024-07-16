import {Typography} from "@mui/joy";
import Colors from "@/Components/atoms/Colors.jsx";

export const ErrorText = ({ message, className = '', ...props }) => {
    return message ? (
        <Typography level={"body-xs"} className={`dark:text-rose-600 ${className}`} sx={{color: Colors["text-rose-600"]}} {...props}>
            {message}
        </Typography>
    ) : null;
}

export default ErrorText
