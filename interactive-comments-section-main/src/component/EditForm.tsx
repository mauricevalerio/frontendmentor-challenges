import { EditFormProp } from '../types/TFormTypes'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { globalContext } from '../context/CommentContext'

const EditForm: React.FC<EditFormProp> = ({ id, replyingTo, content, handleToggleEdit }) => {

    const { handleEditComment, currentUserData } = globalContext()
    const [modifiedContent, setModifiedContent] = useState<string>(`${currentUserData.username === replyingTo ? content : `@${replyingTo} ${content}`}`)


    const handleModifiedContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModifiedContent(e.target.value)
    }

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault()
        handleEditComment(id, replyingTo, modifiedContent)
        handleToggleEdit()
    }

    console.log(modifiedContent)
    return (
        <Form
            autoComplete='off'
            onSubmit={handleEdit}>
            <Form.Control
                as='textarea'
                placeholder='Add a comment....'
                onChange={handleModifiedContentChange}
                value={modifiedContent}
                name='currentUserComment'
                className={`rounded form-control textarea my-2`}
                required />

            <Button
                type='submit'
                className={`d-block ms-auto mb-2 p-2 blue-bg text-uppercase text-white`}>
                Update
            </Button>
        </Form>

    )
}

export default EditForm