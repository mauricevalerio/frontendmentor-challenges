import { Ttask } from '@/types/types'
import Modal from 'react-bootstrap/Modal'
import { useAppDispatch } from '@/app/hooks'
import { deleteTask } from '@/features/dataSlice'
import { globalThemeContext } from '@/context/ThemeContext'

type TDeleteTaskModalProp = {
    isDeleteTaskModalOpen: boolean
    toggleDeleteTaskModal: () => void
    columnId: string | number
    taskData: Ttask
}

const DeleteTaskModal: React.FC<TDeleteTaskModalProp> = ({ isDeleteTaskModalOpen, toggleDeleteTaskModal, columnId, taskData }) => {
    const { themeValueBg } = globalThemeContext()
    const dispatch = useAppDispatch()

    const handleDeleteTask = () => {
        dispatch(deleteTask({ columnId, taskData }))
    }

    return (
        <Modal
            show={isDeleteTaskModalOpen}
            onHide={toggleDeleteTaskModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className={`p-4 ${themeValueBg}`}>
                <Modal.Header className='block p-0 border-0'>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className='font-bold mb-4 text-destructive'>
                        Delete this task?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <p className='text-secondary-light my-4'>Are you sure you want to delete the '{taskData.title}' task and its subtasks? This action cannot be reversed.</p>
                    <button
                        onClick={handleDeleteTask}
                        className='p-2 my-4 block w-full font-bold text-white rounded-full bg-destructive'>Delete</button>
                    <button
                        onClick={toggleDeleteTaskModal}
                        className='p-2 mt-2 block w-full font-bold text-primary rounded-full bg-[rgba(99,95,199,0.10)]'>Cancel</button>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default DeleteTaskModal