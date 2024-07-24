import logoUrl from "/public/UGMA-logo.png"

const Logo = ({className = '', props}) => {
    return (
    <div className={`min-h-[48px] overflow-hidden ${className}`}>
        <img width={"300"} className={`object-cover w-full h-full object-center aspect-square`} src={logoUrl} alt="Logo UGMA" {...props}/>
    </div>
    )
}

export default Logo
