import IconReply from '../../assets/icon-reply.svg'
import IconDelete from '../../assets/icon-delete.svg'
import IconEdit from '../../assets/icon-edit.svg'
import DeletePrompt from '../DeletePrompt'
import { useState } from 'react'

import Button from 'react-bootstrap/Button'

//id used for DeletePrompt
//Component purpose is to flip true/false states of reply, edit, and delete
export default function TemplateActionButtons({id, isCurrentUser, setIsReplyToggled, setIsEditToggled }) {
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    return (
        <>
            {
                /* Renders either Reply or Delete/Edit Button */
                isCurrentUser() ?
                <div>
                    <Button 
                    variant="light"
                    className="d-inline-flex gap-2 align-items-center fw-bold text-danger"
                    type="button"
                    onClick={() => setDeleteModalShow(true)}
                    >
                        <img src={IconDelete} alt="Trash bin for deleting your own comments" />
                        <span>Delete</span>
                    </Button>

                    <Button 
                    variant="light"
                    className="d-inline-flex gap-2 align-items-center fw-bold blue-text"
                    onClick={() => setIsEditToggled(prevState => !prevState)}>
                        <img src={IconEdit} alt="Pencil for editing your own comments" />
                        <span>Edit</span>
                    </Button>
                </div>
                :
                    <Button 
                    variant="light"
                    className="d-flex gap-2 align-items-center fw-bold blue-text"
                    onClick={() => setIsReplyToggled(prevState => !prevState)}>
                        <img src={IconReply} alt="Curved arrow for replying to comments" />
                        <span>Reply</span>
                    </Button>
                }

                {            
                /* Renders only if comment/reply is owned by current user */
                isCurrentUser() ?
                <DeletePrompt 
                id={id}
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                />
                : 
                null
            }
        </>
    )
}