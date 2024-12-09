import {UseFormReturn} from "react-hook-form";
import {router, usePage} from "@inertiajs/react";
import React from "react";
import axios from "axios";
import Profile from "@/src/models/Profile.ts";

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

const useLoading = () => {

    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        let timeout = null
        const onStartListener = router.on('start', () => {
            timeout = setTimeout(() => setLoading(true), 250)
        })
        const onFinishListener = router.on('finish', () => {
            clearTimeout(timeout)
            setLoading(false)
        })

        return () => {
            onStartListener()
            onFinishListener()
        }
    }, [])

    return loading
}

const formatTelephone = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Check if we have exactly 11 digits
    if (digits.length !== 11) {
        return digits
    }

    // Format the phone number
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
}

const useProfile = (id: string, deps: any[] = []): Profile | null => {

    const [profile, setProfile] = React.useState<Profile | null>(null)
    const endpoint = route('api.v1.profiles.show', {
        profile: id
    })

    React.useEffect(() => {

        const controller =  new AbortController()

        const getProfile = async () => {
            try {
                const res = await axios.get(endpoint, {signal: controller.signal})
                setProfile(res.data.data)
            } catch (e) {
                // Request cancelled
            }
        }

        getProfile()

        return () => {
            controller.abort()
        }
    }, deps)

    return profile
}

export {usePermission, useOnlineStatus, useLoading, mergeDeep, isObject, useProfile, mapServerErrorsToFields, formatTelephone}


