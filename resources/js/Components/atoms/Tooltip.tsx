import {
    Tooltip as ShadcnTooltip,
    TooltipTrigger as ShadcnTooltipTrigger,
    TooltipProvider as ShadcnTooltipProvider,
    TooltipContent as ShadcnTooltipContent
} from "@/shadcn/ui/tooltip"

const Tooltip = ({children}) => <ShadcnTooltip>{children}</ShadcnTooltip>

Tooltip.Trigger = ShadcnTooltipTrigger
Tooltip.Content = ShadcnTooltipContent

export default Tooltip

export {
    ShadcnTooltipProvider as TooltipProvider
}
