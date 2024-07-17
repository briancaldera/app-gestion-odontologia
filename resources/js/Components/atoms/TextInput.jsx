import {forwardRef, useEffect, useRef} from 'react';

const TextInput = forwardRef(({type = 'text', className = '', isFocused  = false, ...props}, ref) => {
    const input = ref ? ref : useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, []);

    return (
        <input type={type} className={`block w-full rounded-md dark:bg-gray-900 border-0 py-1.5 dark:text-gray-300 text-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:focus:ring-indigo-600 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
 ${className}`} {...props}/>
    )
})

export default TextInput
