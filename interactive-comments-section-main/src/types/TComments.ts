export type Comment = {
    id: number | string,
    content: string,
    createdAt: string,
    score: number,
    replyingTo?: string,
    user: {
        image: {
            png: string,
            webp: string,
        },
        username: string
    },
    replies?: Comment[]
}