export type TemplateHeaderProp = {
    user: {
        image: {
            png: string,
            webp: string
        },
        username: string
    },
    createdAt: string
}

export type TemplateContentProp = {
    content: string,
    replyingTo?: string | null
}

export type TemplateScoreBtnProp = {
    id: number | string,
    score: number
}

export type TemplateActionBtnProp = {
    id: number | string,
    username: string,
    handleToggleEdit: () => void
    handleToggleReply: () => void
}

export type DeletePromptProp = {
    id: number | string,
    show: boolean
    onHide: () => void
}