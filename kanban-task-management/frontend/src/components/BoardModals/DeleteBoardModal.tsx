import Modal from 'react-bootstrap/Modal'
import { deleteBoard, selectCurrentBoard } from '@/features/board/dataSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

type TDeleteBoardModalProps = {
    isDeleteBoardModalOpen: boolean,
    toggleDeleteBoardModal: () => void
}

const DeleteBoardModal: React.FC<TDeleteBoardModalProps> = ({ isDeleteBoardModalOpen, toggleDeleteBoardModal }) => {
    const currentBoard = useAppSelector(selectCurrentBoard)
    const dispatch = useAppDispatch()

    const handleDeleteBoard = () => {
        dispatch(deleteBoard(currentBoard.id))
        toggleDeleteBoardModal()
    }

    return (
        <Modal
            show={isDeleteBoardModalOpen}
            onHide={toggleDeleteBoardModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='p-4'>
                <Modal.Header className='block p-0 border-0'>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className='font-bold mb-4 text-destructive'>
                        Delete this board?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <p className='text-secondary-light my-4'>Are you sure you want to delete the '{currentBoard.name}' board? This action will remove all columns and tasks and cannot be reversed.</p>
                    <button
                        onClick={handleDeleteBoard}
                        className='p-2 my-4 block w-full font-bold text-white rounded-full bg-destructive'>Delete</button>
                    <button
                        onClick={toggleDeleteBoardModal}
                        className='p-2 mt-2 block w-full font-bold text-primary rounded-full bg-[rgba(99,95,199,0.10)]'>Cancel</button>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default DeleteBoardModal