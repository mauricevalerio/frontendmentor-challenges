import { TChoices } from './TContextTypes'

export type TemplateContainerProp = {
    children: React.ReactNode,
    choice?: TChoices,
    computerChoice?: TChoices
}