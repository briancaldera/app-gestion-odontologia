import React, {ClassAttributes} from "react";

type ImageProps = {
    src: string | File | null
}

const Image = ({
                   src,
                   ...props
               }: ImageProps & ClassAttributes<HTMLImageElement> & React.ImgHTMLAttributes<HTMLImageElement>) => {

    const preview: string | undefined = React.useMemo(() => {
        if (src instanceof File) {
            return URL.createObjectURL(src)
        } else if (typeof src === 'string') {
            return src
        }
    }, [])

    React.useEffect(() => {
        return () => {
            // if (src instanceof File) URL.revokeObjectURL(preview)
        }
    }, [])

    return (
        <img src={preview} alt={''} {...props}/>
    )
}

export {type ImageProps}
export default Image
