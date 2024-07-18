import {Avatar as MuiAvatar} from "@mui/joy";

const Avatar = ({picture, onClick = null, className = "", props}) => {
    return (<MuiAvatar onClick={onClick} src={picture} className={`${onClick ? 'cursor-pointer' : ''} ${className}`} {...props} variant={"outlined"}/>)
}

export default Avatar
