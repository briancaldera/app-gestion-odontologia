import {CssVarsProvider, StyledEngineProvider} from '@mui/joy/styles';
import {usePage} from '@inertiajs/react'
import React from "react";
import {Toaster} from "@/shadcn/ui/sonner.tsx";
import {toast} from "sonner";

const BaseLayout = ({children}) => {
    const messages = usePage().props.messages as Message[]

    useMessage(messages)

    return (
        <StyledEngineProvider injectFirst>
            <CssVarsProvider>
                {/*<CssBaseline/>*/}
                {children}
                <Toaster expand/>
            </CssVarsProvider>
        </StyledEngineProvider>
    )
}

type Message = {
    type: 'success' | 'info' | 'error' | 'warning' | 'default'
    content: string
}

const useMessage = (messages: Message[]) => {
    React.useEffect(() => {
        messages.forEach(message => {
            switch (message.type) {
                case 'success':
                    toast.success(message.content)
                    break
                case 'info':
                    toast.info(message.content)
                    break
                case 'error':
                    toast.error(message.content)
                    break
                case 'warning':
                    toast.warning(message.content)
                    break
                case 'default':
                default:
                    toast.message(message.content)
                    break
            }
        })
    })
}

export default BaseLayout
