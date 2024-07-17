import Label from "@/Components/atoms/Label.jsx";
import TextInput from "@/Components/atoms/TextInput.jsx";
import ErrorText from "@/Components/atoms/ErrorText.jsx";


const InputField = ({label = '', error = '', placeholder = '', validation = '', className = '', ...props}) => {
    return (
        <div className={`flex flex-col ${className}`} {...props}>
            <Label value={label}/>
            <div className={"relative mt-2 rounded-md shadow-sm"}>
                <TextInput placeholder={placeholder} validation={validation}/>
            </div>
            <ErrorText message={error} className={'mt-1'}/>
        </div>
    )
}

export default InputField
