import {Link} from '@inertiajs/react';

const NavLink = ({children, href, active = false, className = "", ...props}) => {
    return (
        <Link href={href} className={`inline-flex items-center font-bold px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none
          ${active
            ? 'text-indigo-500 dark:text-indigo-500 border-indigo-400 dark:border-indigo-600 focus:border-indigo-700 '
            : 'border-transparent text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 focus:text-slate-700 dark:focus:text-slate-300 focus:border-slate-300 dark:focus:border-slate-700'} ${className}`} {...props}>
            {children}
        </Link>
    )
}

export default NavLink
