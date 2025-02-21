import {Avatar} from "@mui/joy";
import Dropzone from "react-dropzone";
import React from "react";

const pictureFileFormats = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
}

type FileWithPreview = File & {preview: ReturnType<typeof URL.createObjectURL>}

interface ProfilePicturePickerProps {
    readonly src: string | FileWithPreview | null,
    readonly onDrop: (files: File[]) => void,
    readonly className: string,
    readonly disabled?: boolean
}

const ProfilePicturePicker = ({src, onDrop, className, disabled = false}: ProfilePicturePickerProps) => {

    let preview: string | null = ''
    if (src === null) {
        preview = null
    } else if (typeof src === 'string') {
        preview = src
    } else if ('preview' in src) {
        preview = src.preview
    }
    // const preview: string | undefined = React.useMemo<string | undefined>(() => {
    //     if (!src) {
    //         return undefined
    //     } else if (typeof src === 'string') {
    //         return src
    //     } else {
    //         return URL.createObjectURL(src)
    //     }
    // }, [src])
    //

    return (
        <Dropzone onDrop={onDrop} accept={pictureFileFormats} maxFiles={1} disabled={disabled}>
            {({getRootProps, getInputProps}) => (
                <>
                    <input {...getInputProps()} />
                    <Avatar src={preview} {...getRootProps()} variant={"outlined"} className={`cursor-pointer ${className}`}/>
                </>
            )}
        </Dropzone>
    )
}

export {pictureFileFormats}
export default ProfilePicturePicker
