import React, {ClassAttributes} from "react";
import {cn} from "@/lib/utils.ts";

type ImageProps = {
    src: string | File | null
    className?: string
}

const Image = ({src, className, ...props}: ImageProps & ClassAttributes<HTMLImageElement> & React.ImgHTMLAttributes<HTMLImageElement>) => {

    const preview: string | undefined = React.useMemo(() => {

        if (!src) return

        if (typeof src === 'string') {
            return src
        } else if (src instanceof File) {
            return URL.createObjectURL(src)
        }
    }, [])

    return (
        <img src={preview} alt={''} className={cn('', className)} {...props}/>
    )
}

export {type ImageProps}
export default Image
