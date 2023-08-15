import { useState } from 'react'
import { globalContext } from '../context/CommentContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { CommentFormProp } from '../types/TFormTypes'

// COMPONENT FOR ADDING AND REPLYING
const CommentForm: React.FC<CommentFormProp> = ({ id, username, toggleReply, handleToggleReply }) => {

    const { screenWidth, currentUserData, handleAddComment, handleReply } = globalContext()

    const [currentUserComment, setCurrentUserComment] = useState<string>(toggleReply ? `@${username}` : '')
    const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => setCurrentUserComment(e.target.value)

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (toggleReply) {
            handleReply(id, username, currentUserComment)
            handleToggleReply?.()
        }
        else {
            handleAddComment(currentUserComment)
        }
        setCurrentUserComment('')
    }

    return (
        <>
            <Form
                autoComplete='off'
                onSubmit={handleCommentSubmit}
                className={`bg-white rounded p-3 mb-2 d-flex justify-content-between ${screenWidth < 768 ? 'align-items-center' : 'align-items-start gap-2'} ${screenWidth < 768 ? 'flex-wrap' : 'flex-nowrap'}`}
            >
                <Form.Control
                    as='textarea'
                    placeholder='Add a comment....'
                    onChange={handleChangeComment}
                    value={currentUserComment}
                    name='currentUserComment'
                    className={`rounded form-control textarea mb-2 ${screenWidth < 768 ? '' : 'order-2'}`}
                    required />

                <img
                    src={currentUserData.image.webp}
                    alt={`Circular profile picture of ${currentUserData.username}`}
                    className={`profile-picture ${screenWidth < 768 ? '' : 'order-1'}`} />

                <Button
                    type='submit'
                    className={`p-2 blue-bg text-uppercase text-white ${screenWidth < 768 ? '' : 'order-3'}`}>
                    {toggleReply ? 'Reply' : 'Send'}
                </Button>
            </Form>
        </>
    )
}

export default CommentForm