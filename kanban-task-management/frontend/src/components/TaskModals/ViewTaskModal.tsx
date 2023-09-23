import { TColumn, Ttask } from '@/types/types'
import { countCompletedSubtasks } from '@/utils'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { editTask, selectCurrentBoard } from '@/features/board/dataSlice'
import { IconVerticalEllipsis } from '@/icons'
import BsDropdown from 'react-bootstrap/Dropdown'
import DeleteTaskModal from './DeleteTaskModal'
import EditTaskModal from './EditTaskModal'

type ViewTaskModalProps = {
    isTaskModalOpen: boolean
    toggleTaskModal: () => void
    task: Ttask
    column: TColumn
}

const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ isTaskModalOpen, toggleTaskModal, task, column }) => {
    const [taskData, setTaskData] = useState<Ttask>(task)
    const [newColumnId, setNewColumnId] = useState(column.id)
    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState<boolean>(false)
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    //fetches list of columns for drop down elements
    const { columns } = useAppSelector(selectCurrentBoard)

    useEffect(() => {
        dispatch(editTask({ column, newColumnId, taskData }))
    }, [taskData, newColumnId])

    useEffect(() => {
        setTaskData(task)
    }, [isTaskModalOpen])

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>, subtaskId: number | string) => {
        setTaskData(prevTaskData => ({
            ...prevTaskData,
            subtasks: prevTaskData.subtasks.map(subtask => subtask.id === subtaskId ?
                { ...subtask, isCompleted: e.target.checked }
                : subtask
            )
        }))
    }

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewColumnId(e.target.value)
    }

    const toggleDeleteTaskModal = () => {
        toggleTaskModal()
        setIsDeleteTaskModalOpen(prevStatus => !prevStatus)
    }

    const toggleEditTaskModal = () => {
        toggleTaskModal()
        setIsEditTaskModalOpen(prevStatus => !prevStatus)
    }

    const subtaskElements = taskData.subtasks.map(subtask => <div key={subtask.id} className='bg-light-bg mb-4 p-4 flex gap-4'>
        <input
            type='checkbox'
            id={subtask.id.toString()}
            name={subtask.id.toString()}
            onChange={e => handleChecked(e, subtask.id)}
            checked={subtask.isCompleted} />
        <label htmlFor={subtask.id.toString()} className={` font-bold text-light opacity-50 ${subtask.isCompleted ? 'line-through' : ''}`}>{subtask.title}</label>
    </div>)

    const dropdownColumnElements = columns.map(column => <option key={column.id} value={column.id}>{column.name}</option>)

    return (
        <>
            <Modal
                show={isTaskModalOpen}
                onHide={toggleTaskModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className='p-4'>
                    <Modal.Header className='items-center p-0 mb-4 border-0'>
                        <Modal.Title
                            id="contained-modal-title-vcenter"
                            className='font-bold max-w-[90%]'>
                            {taskData.title}
                        </Modal.Title>

                        <BsDropdown>
                            <BsDropdown.Toggle className='bg-transparent border-none border-0 after:content-none'>
                                <IconVerticalEllipsis />
                            </BsDropdown.Toggle>

                            <BsDropdown.Menu className='mt-4'>
                                <BsDropdown.Item
                                    as='button'
                                    className='font-bold mb-2 text-secondary-light'
                                    onClick={toggleEditTaskModal}
                                >Edit Task
                                </BsDropdown.Item>

                                <BsDropdown.Item
                                    as='button'
                                    className='text-destructive font-bold'
                                    onClick={toggleDeleteTaskModal}
                                >Delete Task</BsDropdown.Item>
                            </BsDropdown.Menu>
                        </BsDropdown>

                    </Modal.Header>
                    <Modal.Body className='p-0'>
                        <p className='my-4 text-secondary-light leading-loose'>{taskData.description}</p>
                        <p className='my-4 text-secondary-light font-bold'>Subtasks ({`${countCompletedSubtasks(task.subtasks)} of ${task.subtasks.length}`})</p>

                        {subtaskElements}

                        <label htmlFor="status" className='block text-secondary-light font-bold mb-2'>Current Status</label>
                        <select
                            name="status"
                            id="status"
                            value={newColumnId}
                            onChange={handleChangeStatus}
                            className='w-full my-4 px-2 py-4 border-2 border-[rgba(130,143,163,0.25)]'>
                            {dropdownColumnElements}
                        </select>
                    </Modal.Body>
                </div>
            </Modal>

            <DeleteTaskModal
                isDeleteTaskModalOpen={isDeleteTaskModalOpen}
                toggleDeleteTaskModal={toggleDeleteTaskModal}
                columnId={newColumnId}
                taskData={taskData}
            />

            <EditTaskModal
                isEditTaskModalOpen={isEditTaskModalOpen}
                toggleEditTaskModal={toggleEditTaskModal}
                column={column}
                newColumnId={newColumnId}
                taskData={taskData}
            />
        </>
    )
}

export default ViewTaskModal