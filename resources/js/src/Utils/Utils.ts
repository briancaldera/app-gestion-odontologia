import {UseFormReturn} from "react-hook-form";
import {usePage} from "@inertiajs/react";
import React from "react";

const mapServerErrorsToFields = function (form: UseFormReturn, errors: Record<string, string>) {
    Object.keys(errors).forEach(key => form.setError(key, {type: 'custom', message: errors[key]}))
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

const usePermission = (): ((permission: string) => boolean) => {
    const {auth: {user}} = usePage().props

    const can = React.useCallback((permission: string): boolean => (user?.permissions ?? []).some(p => p === permission), [user])
    return can
}

/**
* Stolen from https://react.dev/learn/reusing-logic-with-custom-hooks
 * 😎
*/
const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = React.useState(true);
    React.useEffect(() => {
        function handleOnline() {
            setIsOnline(true);
        }
        function handleOffline() {
            setIsOnline(false);
        }
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    return isOnline;
}

export {usePermission, useOnlineStatus, mergeDeep, isObject, mapServerErrorsToFields}
