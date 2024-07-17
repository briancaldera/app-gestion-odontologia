const Logo = ({className = '', props}) => {
    return (
    <div className={`grid grid-cols-1 min-h-[48px] w-full place-items-center`}>
        <img className={`object-cover object-center w-full aspect-square`} src="/public/UGMA-logo.png" alt="Logo UGMA" {...props}/>
    </div>)
}

export default Logo
