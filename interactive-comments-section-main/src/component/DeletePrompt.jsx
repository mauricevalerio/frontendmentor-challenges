import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useContext } from 'react'
import { CommentContext } from '../context/CommentContext'

export default function DeletePrompt({id, ...props}) {
  const { handleDeleteComment } = useContext(CommentContext)
  
  return (
    <Modal
    {...props}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="gray-text">
          Are you sure you want to delete this comment? 
          This will remove the comment and can't be undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary" className="text-uppercase">no, cancel</Button>
        <Button onClick={() => handleDeleteComment(id)} variant="danger" className="text-uppercase">yes, delete</Button>
      </Modal.Footer>
    </Modal>
  )
}