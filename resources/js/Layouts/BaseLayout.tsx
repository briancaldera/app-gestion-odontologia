import {CssVarsProvider, StyledEngineProvider} from '@mui/joy/styles';
import {usePage} from '@inertiajs/react'
import React from "react";
import {Toaster} from "@/shadcn/ui/sonner.tsx";
import {toast} from "sonner";
import {CircleX} from "lucide-react";

const BaseLayout = ({children}) => {
    const messages = usePage().props.messages as Message[]

    useMessage(messages)

    return (
        <StyledEngineProvider injectFirst>
            <CssVarsProvider>
                {/*<CssBaseline/>*/}
                {children}
                <Toaster expand duration={10000}/>
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
                    toast.success(message.content, cancelToastAction)
                    break
                case 'info':
                    toast.info(message.content, cancelToastAction)
                    break
                case 'error':
                    toast.error(message.content, cancelToastAction)
                    break
                case 'warning':
                    toast.warning(message.content, cancelToastAction)
                    break
                case 'default':
                default:
                    toast.message(message.content, cancelToastAction)
                    break
            }
        })
    })
}

const cancelToastAction = {cancel: {label: <CircleX className={'size-4'}/>, onClick: () => {}}}

export default BaseLayout
