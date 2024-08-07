import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";
import Input from "@/Components/atoms/Input";
import React from "react";

const Field = ({label, name, control, type = 'text', description = '', placeholder = undefined, disabled = false, ...props}) => {
    return (
        <FormField name={name} control={control} disabled={disabled} render={({field, fieldState, formState,}) => {
            return (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder={placeholder} type={type} {...props}/>
                    </FormControl>
                    {description !== '' && (
                        <FormDescription>
                            {description}
                        </FormDescription>
                    )}
                    <FormMessage/>
                </FormItem>
            )
        }}/>
    )
}

export default Field
