import {Text} from "@/Components/atoms/Text.jsx";
import {Icon} from "@/Components/atoms/Icon.jsx";
import DocumentIcon from "@heroicons/react/24/outline/DocumentArrowDownIcon.js"
import Dropzone from "react-dropzone";
import React from "react";

const defaultFileFormats = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
}

const DragAndDrop = ({handleDrop = (files) => {}, maxFiles = 1, accept = defaultFileFormats, ...props}) => {

    const [isdragging, setDragging] = React.useState(false)

    return (
        <Dropzone accept={accept} maxFiles={maxFiles} onDrop={handleDrop} onDragEnter={() => setDragging(true)} onDragLeave={() => setDragging(false)} onDropAccepted={() => setDragging(false)} onDropRejected={() => setDragging(false)} {...props}>
            {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}
                    className={`select-none min-h-22 h-48 min-w-12 w-full p-6 flex flex-col gap-2 justify-center items-center w-full border-dashed rounded-lg hover:border-gray-500 cursor-pointer ${isdragging ? "border-4 border-indigo-400 bg-indigo-100" : "border-2 border-gray-400"}`}>
                    <input {...getInputProps()} />
                    <Icon><DocumentIcon/></Icon>
                    <Text level={"title-sm"} className={"text-center"}>Arrastra archivos aquí o haz click para seleccionar archivos</Text>
                </div>
            )}
        </Dropzone>
    )
}

export default DragAndDrop
