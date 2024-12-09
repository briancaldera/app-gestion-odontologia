import {CssVarsProvider, StyledEngineProvider} from '@mui/joy/styles';
import {usePage} from '@inertiajs/react'
import React from "react";
import {Toaster} from "@/shadcn/ui/sonner.tsx";
import {toast} from "sonner";
import {CircleX} from "lucide-react";
import {useTernaryDarkMode} from "usehooks-ts";
import {useLoading} from "@/src/Utils/Utils.ts";
import Loader from "@/Components/atoms/Loader.tsx";

const BaseContext = React.createContext({
    isDarkMode: false, toggleDarkMode: () => {
    }
})

const BaseLayout = ({children}) => {
    const messages = usePage().props.messages as Message[]
    const {isDarkMode, ternaryDarkMode, setTernaryDarkMode} = useTernaryDarkMode({defaultValue: 'light'})
    const isLoading = useLoading()

    const toggleDarkMode = React.useCallback(() => {
        if (ternaryDarkMode === 'light') {
            setTernaryDarkMode('dark')
        } else {
            setTernaryDarkMode('light')
        }
    }, [])

    useMessage(messages)

    return (
        <StyledEngineProvider injectFirst>
            <CssVarsProvider>
                {/*<CssBaseline/>*/}
                <BaseContext.Provider value={{isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode}}>
                    <div className={`${isDarkMode ? 'dark' : 'light'}`}>
                        {children}
                        <Toaster expand/>
                        <div className={'z-50 fixed bottom-0 left-0 p-4'} hidden={!isLoading}>
                            <Loader/>
                        </div>
                    </div>
                </BaseContext.Provider>
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
    }, [messages])
}

const cancelToastAction = {
    cancel: {
        label: <CircleX className={'size-4'}/>, onClick: () => {
        }
    }
}

export {BaseContext}
export default BaseLayout
