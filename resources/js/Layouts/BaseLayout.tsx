import {CssVarsProvider, StyledEngineProvider} from '@mui/joy/styles';
import {enqueueSnackbar, SnackbarProvider} from 'notistack'
import {usePage} from '@inertiajs/react'
import React from "react";
import {Toaster} from "@/shadcn/ui/sonner.tsx";
import {toast} from "sonner";

// todo remove context
// todo remove notistack
const BaseContext = React.createContext({
    can: (permission) => {
    }
})

const BaseLayout = ({children}) => {
    const messages = usePage().props.messages
    const {user} = usePage().props.auth

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

    const can = React.useCallback((permission) => (user?.permissions ?? []).some(p => p === permission), [user]) // todo remove this

    return (
        <BaseContext.Provider value={{can: can}}>
            <StyledEngineProvider injectFirst>
                <CssVarsProvider>
                    {/*<CssBaseline/>*/}
                    {children}
                    <Toaster expand/>
                </CssVarsProvider>
            </StyledEngineProvider>
        </BaseContext.Provider>
    )
}

export {BaseContext}
export default BaseLayout
