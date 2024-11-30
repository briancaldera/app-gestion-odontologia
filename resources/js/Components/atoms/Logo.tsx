import logoUrl from "/public/assets/images/logo/UGMA-LOGO.png"
import {cn} from "@/lib/utils.ts";

const Logo = ({className = ''}: { className?: string }) => {
    const defaultStyle = 'overflow-hidden'
    return (
        <div className={cn(defaultStyle, className)}>
            <img className={`object-contain w-full aspect-square`} src={logoUrl} alt="Logo UGMA"/>
        </div>
    )
}

export default Logo
