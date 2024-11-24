import React from "react";

const Pin = ({color}: {color: string}) => {
    return (
        <span className="relative flex size-3">
            <span style={{backgroundColor: color}} className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`}></span>
            <span style={{backgroundColor: color}} className={`relative inline-flex rounded-full size-3`}></span>
        </span>
    )
}

export default Pin
