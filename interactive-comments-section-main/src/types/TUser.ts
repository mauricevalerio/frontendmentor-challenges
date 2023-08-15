export type User = {
    image: {
        png: string,
        webp: string
    },
    username: string,
    upVotedIds: (number | string)[]
    downVotedIds: (number | string)[]
}