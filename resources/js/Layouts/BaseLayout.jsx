import {CssVarsProvider, StyledEngineProvider} from '@mui/joy/styles';
import {enqueueSnackbar, SnackbarProvider} from 'notistack'
import {usePage} from '@inertiajs/react'
import React from "react";

const BaseContext = React.createContext({
    can: (permission) => {
    }
})

const BaseLayout = ({children}) => {
    const messages = usePage().props.messages
    const {user} = usePage().props.auth

    React.useEffect(() => {
        messages.forEach(message => enqueueSnackbar(message.content, {variant: message.type}))
    })

    const can = React.useCallback((permission) => (user?.permissions ?? []).some(p => p === permission), [user])

    return (
        <BaseContext.Provider value={{can: can}}>
            <StyledEngineProvider injectFirst>
                <CssVarsProvider>
                    {/*<CssBaseline/>*/}

                    <SnackbarProvider anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                        {children}
                    </SnackbarProvider>
                </CssVarsProvider>
            </StyledEngineProvider>
        </BaseContext.Provider>
    )
}

export {BaseContext}
export default BaseLayout
