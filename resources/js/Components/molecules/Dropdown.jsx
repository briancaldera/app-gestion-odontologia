import React, {useContext} from "react";
import {Link} from "@inertiajs/react";

const DropdownContext = React.createContext()

const Dropdown = ({children}) => {
    const [open, setOpen] = React.useState(false)

    const toggleOpen = () => {
        setOpen(value => !value)
    }

    return (
        <DropdownContext.Provider value={{open, setOpen, toggleOpen}}>
            <div className={"absolute top-10 right-0 z-100 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"} role={"menu"} aria-orientation={"horizontal"}>
                {children}
            </div>
        </DropdownContext.Provider>
    )
}

const DropdownOption = ({href, children, className = "", ...props}) => {
    return (
        <Link href={href} className={`block w-full px-4 py-2 text-start leading-5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`} role={"menuitem"} {...props}>{children}</Link>
    )
}

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropdownContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>
            {/*Backdrop*/}
            {open && <div className="fixed inset-0 z-90" onClick={() => setOpen(false)}></div>}
        </>
    );
};

Dropdown.Option = DropdownOption
Dropdown.Trigger = Trigger

export default Dropdown
