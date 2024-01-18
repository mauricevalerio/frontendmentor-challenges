import { ReactNode } from "react"

export type FormWrapperProps = {
    title: string
    instructions: string
    children: ReactNode
}

export type NavigationComponentProps = {
    stepLabel: string[]
    currentStepIndex: number
}

export type ErrorInfoTypes = {
    name: string | null
    email: string | null
    number: string | null
}

export type InfoComponentProps = {
    data: DefaultFormState
    updateData: (fields: DefaultFormState) => void
    error: ErrorInfoTypes
}

export type FormComponentProps = {
    data: DefaultFormState
    updateData: (fields: DefaultFormState) => void
}

export type AddOnComponentProps = {
    data: DefaultFormState
    addOnsData: AddOns[]
    updateAddOnsData: (id: number) => void
}

export const enum PlanType {
    ARCADE = "ARCADE",
    ADVANCED = "ADVANCED",
    PRO = "PRO"
}

export const enum PlanBilling {
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}

export enum PlanCost {
    ARCADE_MONTHLY = 9,
    ARCADE_YEARLY = 90,
    ADVANCED_MONTHLY = 12,
    ADVANCED_YEARLY = 120,
    PRO_MONTHLY = 15,
    PRO_YEARLY = 150
}

export type PersonalInfo = {
    name: string,
    email: string,
    number: string
}

export type Plan = {
    type: PlanType,
    billing: PlanBilling,
    cost: PlanCost
}

export type AddOns = {
    id: number,
    isSelected: boolean,
    service: string,
    description: string,
    monthly_cost: number,
    yearly_cost: number
}

export type DefaultFormState = {
    info: PersonalInfo
    plan: Plan
    addOns: AddOns[]
}