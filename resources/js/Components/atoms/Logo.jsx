const Logo = ({className = '', props}) => {
    return (
    <div className={`grid grid-cols-1 min-h-[48px] w-full ${className}`}>
        <img width={"300"} className={`object-cover object-center aspect-square`} src="/public/UGMA-logo.png" alt="Logo UGMA" {...props}/>
    </div>
    )
}

export default Logo
