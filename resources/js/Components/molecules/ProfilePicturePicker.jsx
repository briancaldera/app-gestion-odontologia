import {Avatar} from "@mui/joy";
import Dropzone from "react-dropzone";
import React from "react";

const pictureFileFormats = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
}

const ProfilePicturePicker = ({src, onDrop, className}) => {

    return (
        <Dropzone onDrop={onDrop} accept={pictureFileFormats} maxFiles={1}>
            {({getRootProps, getInputProps}) => (
                <>
                    <input {...getInputProps()} />
                    <Avatar src={src} {...getRootProps()} variant={"outlined"} className={`cursor-pointer ${className}`}/>
                </>
            )}
        </Dropzone>
    )
}

export default ProfilePicturePicker
