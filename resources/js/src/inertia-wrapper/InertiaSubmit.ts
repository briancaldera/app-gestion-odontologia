import React from "react";
import {router} from '@inertiajs/react'

function useInertiaSubmit () {
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false)

    React.useEffect(() => {
        const onStartListener = router.on('start', (_) => {
            setIsProcessing(true)
        })

        const onFinishListener = router.on('finish', (_) => {
            setIsProcessing(false)
        })

        return () => {
            onStartListener()
            onFinishListener()
        }
    }, [])

    return {
        isProcessing: isProcessing,
        router: router,
    }
}

export default useInertiaSubmit
