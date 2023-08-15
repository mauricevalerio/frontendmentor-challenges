import IconReply from '../../assets/icon-reply.svg'
import IconDelete from '../../assets/icon-delete.svg'
import IconEdit from '../../assets/icon-edit.svg'
import DeletePrompt from '../DeletePrompt'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { globalContext } from '../../context/CommentContext'
import { TemplateActionBtnProp } from '../../types/TTemplateTypes'

//Component purpose is to flip true/false states of reply, edit, and delete prompt
const TemplateActionButtons: React.FC<TemplateActionBtnProp> = ({ id, username, handleToggleEdit, handleToggleReply }) => {
    const [deleteModalShow, setDeleteModalShow] = useState(false)

    const { currentUserData } = globalContext()

    return (
        <>
            {
                /* Renders either Reply or Delete/Edit Button */
                currentUserData.username === username ?
                    <>
                        <Button
                            variant='light'
                            className='d-inline-flex gap-2 align-items-center fw-bold text-danger'
                            type='button'
                            onClick={() => setDeleteModalShow(true)}
                        >
                            <img src={IconDelete} alt='Trash bin for deleting your own comments' />
                            <span>Delete</span>
                        </Button>

                        <Button
                            variant='light'
                            className='d-inline-flex gap-2 align-items-center fw-bold blue-text'
                            onClick={handleToggleEdit}
                        >
                            <img src={IconEdit} alt='Pencil for editing your own comments' />
                            <span>Edit</span>
                        </Button>
                    </>
                    :
                    <Button
                        variant='light'
                        className='d-inline-flex gap-2 align-items-center fw-bold blue-text'
                        onClick={handleToggleReply}
                    >
                        <img src={IconReply} alt='Curved arrow for replying to comments' />
                        <span>Reply</span>
                    </Button>
            }

            <DeletePrompt id={id} show={deleteModalShow} onHide={() => setDeleteModalShow(false)} />
        </>
    )
}

export default TemplateActionButtons