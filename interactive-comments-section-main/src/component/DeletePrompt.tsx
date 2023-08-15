import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { globalContext } from '../context/CommentContext'
import { DeletePromptProp } from '../types/TTemplateTypes'

const DeletePrompt: React.FC<DeletePromptProp> = ({ id, show, onHide }) => {
  const { handleDeleteComment } = globalContext()

  return (
    <Modal
      show={show}
      onHide={onHide}
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
        <Button onClick={onHide} variant="secondary" className="text-uppercase">no, cancel</Button>
        <Button onClick={() => handleDeleteComment(id)} variant="danger" className="text-uppercase">yes, delete</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeletePrompt