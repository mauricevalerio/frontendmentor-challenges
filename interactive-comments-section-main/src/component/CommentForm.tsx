import { useState, useContext } from 'react'
import { CommentContext } from '../context/CommentContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// COMPONENT FOR ADDING REPLYING, ADDING, EDITING COMMENTS
export default function CommentForm({
    id, replyingTo, 
    isReplyToggled, setIsReplyToggled,
    isEditToggled, setIsEditToggled
    }) 
    {
        
    const { 
        commentData : {currentUser: {image, username}, comments}, 
        handleAddComment,
        handleReply,
        handleEditComment,
        screenWidth } = useContext(CommentContext)

    const content = () => {
        if (isReplyToggled) {
            return `@${replyingTo}`
        } else if (isEditToggled) {
            let text = ""
            
            if (comments.find(comment => comment.id === id)) {
                text = comments.find(comment => comment.id === id) 
            }
            comments.forEach(comment => {
                    if (comment.replies.find(reply => reply.id === id))
                        text = comment.replies.find(reply => reply.id === id)
                })

            return `${text.replyingTo ? `@${text.replyingTo}` : ""} ${text.content}` 
        } else {
            return ""
        }
    }
    
    const [currentUserComment, setCurrentUserComment] = useState(content())
    const [validated, setValidated] = useState(false)

    const handleChangeComment = e => setCurrentUserComment(e.target.value)

    const handleCommentSubmit = e => {
        const form = e.currentTarget
        
        setValidated(true)

        if (form.checkValidity() === false) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
         
        if (isReplyToggled) {
            handleReply(e, id, replyingTo, currentUserComment)
            setIsReplyToggled(prevState => !prevState)
        } else if (isEditToggled) {
            handleEditComment(e, id, replyingTo, currentUserComment)
            setIsEditToggled(prevState => !prevState)
        } else {
            handleAddComment(e, currentUserComment)
        }
        setValidated(false)
        setCurrentUserComment("")
    }

    const buttonFormText = () => isReplyToggled ? "Reply" : isEditToggled ? "Update" : "Send"

    return (
        <div className="bg-white rounded p-2 mb-2">
            <Form
            autoComplete="off"
            noValidate
            validated={validated}
            onSubmit={handleCommentSubmit}
            >
                {screenWidth <= 768 ?
                    <Form.Group>
                        <Form.Control 
                        as="textarea" 
                        placeholder="Add a comment...."
                        onChange={handleChangeComment}
                        value={currentUserComment}
                        name="currentUserComment"
                        className="w-100 d-block rounded form-control textarea"
                        required/>
                    </Form.Group>
                :
                    null}

                <div className={`d-flex pt-2 ${!isEditToggled ? "justify-content-between" : "justify-content-end"} ${screenWidth > 768 ? "align-items-start" : ""}`}>
                            
                    {!isEditToggled && <img 
                    src={image.webp} 
                    alt={`Circular profile picture of ${username}`}
                    className="profile-picture"/>}

                    {screenWidth > 768 ?
                        <div className='flex-grow-1 mx-2'>
                            <Form.Group>
                                <Form.Control 
                                as="textarea" 
                                placeholder="Add a comment...."
                                onChange={handleChangeComment}
                                value={currentUserComment}
                                name="currentUserComment"
                                className="w-100 d-block rounded form-control textarea"
                                required/>
                            </Form.Group>
                        </div>
                    :
                        null
                    }

                    <Button 
                    type="submit"
                    className={`blue-bg text-uppercase text-white ${isEditToggled ? "align-self-end" : ""}`}>
                    {buttonFormText()}
                    </Button>
                </div>
            </Form>
        </div>
    )
}