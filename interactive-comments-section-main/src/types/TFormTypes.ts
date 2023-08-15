export type CommentFormProp = {
    id?: number | string,
    username?: string,
    toggleReply?: boolean,
    handleToggleReply?: () => void
}

export type EditFormProp = {
    id: number | string,
    replyingTo: string,
    content: string,
    handleToggleEdit: () => void
}