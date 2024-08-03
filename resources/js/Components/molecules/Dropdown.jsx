import React, {Fragment, useContext} from "react";
import {Link} from "@inertiajs/react";
import { Transition } from '@headlessui/react';

const DropdownContext = React.createContext()

const DropdownContainer = ({children}) => {
    const [open, setOpen] = React.useState(false)
    const toggleOpen = () => {
        setOpen(value => !value)
    }

    return (
        <DropdownContext.Provider value={{open, setOpen, toggleOpen}}>
            <div className={"relative"}>
                {children}
            </div>
        </DropdownContext.Provider>
    )
}

const Dropdown = ({children}) => {
    const {setOpen, open} = React.useContext(DropdownContext)

    return (
        <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div
                className={"absolute top-10 right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"}
                role={"menu"} aria-orientation={"horizontal"} onClick={() => {
                setOpen(false)
            }}>
                {children}
            </div>
        </Transition>
    )
}

const DropdownOption = ({href, children, className = "", ...props}) => {
    const {setOpen} = React.useContext(DropdownContext)

    return (
        <Link href={href} onClick={() => {setOpen(false)}}
              className={`block w-full px-4 py-2 text-start leading-5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
              role={"menuitem"} {...props}>{children}</Link>
    )
}

const DropdownStaticOption = ({children, className = "", ...props}) => {

    return (
        <div onClick={ e => e.stopPropagation()}
              className={`block w-full px-4 py-2 text-start leading-5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
              role={"menuitem"} {...props}>{children}</div>
    )
}

const DropdownTrigger = ({children}) => {
    const {open, setOpen, toggleOpen} = useContext(DropdownContext);

    return (
        <>
            <div className={"cursor-pointer"} onClick={toggleOpen}>{children}</div>
            {/*Backdrop*/}
            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

Dropdown.Option = DropdownOption
Dropdown.Trigger = DropdownTrigger
Dropdown.Container = DropdownContainer
Dropdown.StaticOption = DropdownStaticOption

export default Dropdown
