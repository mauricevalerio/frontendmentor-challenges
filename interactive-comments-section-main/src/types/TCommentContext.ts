import { User } from '../types/TUser'
import { Comment } from '../types/TComments'

export type ContextProviderProps = {
    children: React.ReactNode
}

export type CommentContextDefaultType = {
    commentData: Comment[],
    setCommentData: React.Dispatch<React.SetStateAction<Comment[]>>,
    currentUserData: User,
    screenWidth: number,
    upVote: (id: number | string) => void,
    downVote: (id: number | string) => void,
    handleAddComment: (userComment: string) => void,
    handleDeleteComment: (id: number | string) => void,
    handleReply: (id: number | string | undefined, username: string | undefined, replyText: string) => void,
    handleEditComment: (id: number | string, replyingTo: string, modifiedContent: string) => void

}