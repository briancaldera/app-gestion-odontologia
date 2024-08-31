import {UseFormReturn} from "react-hook-form";

export const mapServerErrorsToFields = function (form: UseFormReturn, errors: Record<string, string>) {
    Object.keys(errors).forEach(key => form.setError(key, {type: 'custom', message: errors[key]}))
}
