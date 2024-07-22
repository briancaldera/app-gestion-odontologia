import Label from "@/Components/atoms/Label.jsx";
import TextInput from "@/Components/atoms/TextInput.jsx";
import ErrorText from "@/Components/atoms/ErrorText.jsx";


const InputField = ({value, label = '', id = '', type = "text", name="", error = '', placeholder = '', autocomplete = null, isFocused = false, required = false, onChange=() => {}, className = '', ...props}) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <Label value={label} htmlFor={id}/>
            <div className={"relative mt-2 rounded-md shadow-sm"}>
                <TextInput type={type} onChange={onChange} value={value} id={id} name={name} placeholder={placeholder} autoComplete={autocomplete} isFocused={isFocused} required={required} {...props}/>
            </div>
            <ErrorText message={error} className={'mt-1'}/>
        </div>
    )
}

export default InputField
