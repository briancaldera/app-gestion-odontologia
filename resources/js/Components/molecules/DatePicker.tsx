import * as React from "react"
import {format, Locale} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/shadcn/ui/button"
import {Calendar} from "@/shadcn/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/shadcn/ui/popover"
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/ui/form";

const DatePicker = ({label, name, control, description = '', disabled = false}) => {

    return (
        <FormField name={name} control={control} disabled={disabled} render={({field, fieldState, formState,}) => {
            return (
                <FormItem className="flex flex-col gap-y-1 mt-1.5">
                    <FormLabel>{label}</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                <Button
                                    disabled={field.disabled}
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Seleccione una fecha</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    disabled={field.disabled}
                                    fromYear={1900}
                                    toYear={2100}
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    captionLayout="dropdown"
                                    initialFocus
                                    classNames={{
                                        day_hidden: "invisible",
                                        dropdown: "rounded-md bg-popover text-popover-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                                        caption_dropdowns: "flex gap-4",
                                        vhidden: "hidden",
                                        caption_label: "hidden",
                                    }}
                                />
                            </PopoverContent>
                        </Popover>

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

export default DatePicker
