import {CssVarsProvider, StyledEngineProvider} from '@mui/joy/styles';
import {enqueueSnackbar, SnackbarProvider} from 'notistack'
import {usePage} from '@inertiajs/react'
import React from "react";

const BaseLayout = ({children}) => {
    const messages = usePage().props.messages

    React.useEffect(() => {
        messages.forEach(message => enqueueSnackbar(message.content, {variant: message.type}))
    }, [])

    return (
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
    )
}

export default BaseLayout
