import { TColumn, Ttask } from '@/types/types'
import { Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { IconCross } from '@/icons'
import { nanoid } from 'nanoid'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { editTask, selectCurrentBoard } from '@/features/board/dataSlice'

type TEditTaskModalProp = {
    isEditTaskModalOpen: boolean
    toggleEditTaskModal: () => void
    column: TColumn
    newColumnId: string | number
    taskData: Ttask
}

const EditTaskModal: React.FC<TEditTaskModalProp> = ({ isEditTaskModalOpen, toggleEditTaskModal, column, newColumnId, taskData }) => {

    const [editTaskData, setEditTaskData] = useState<Ttask>(taskData)
    const { columns } = useAppSelector(selectCurrentBoard)
    const dispatch = useAppDispatch()
    const [editNewColumnId, setEditNewColumnId] = useState(newColumnId)

    useEffect(() => {
        setEditTaskData(taskData)
        setEditNewColumnId(newColumnId)
    }, [isEditTaskModalOpen])

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditNewColumnId(e.target.value)
    }

    const handleTaskDataEditChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditTaskData(prevTaskData => ({
            ...prevTaskData,
            [e.target.name]: e.target.value
        }))
    }

    const handleEditSubtaskListChange = (e: React.ChangeEvent<HTMLInputElement>, subtaskId: number | string): void => {
        setEditTaskData(prevEditedTask => ({
            ...prevEditedTask,
            subtasks: prevEditedTask.subtasks.map(subtask => subtask.id === subtaskId ?
                { ...subtask, title: e.target.value } : subtask
            )
        }))
    }

    const handleAddSubtask = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        setEditTaskData(prevEditedTask => ({
            ...prevEditedTask,
            subtasks: [...prevEditedTask.subtasks, {
                id: nanoid(),
                title: '',
                isCompleted: false
            }]
        }))
    }

    const handleRemoveSubtask = (e: React.FormEvent<HTMLButtonElement>, subtaskId: number | string): void => {
        e.preventDefault()
        setEditTaskData(prevEditedTask => ({
            ...prevEditedTask,
            subtasks: prevEditedTask.subtasks.filter(subtask => subtask.id !== subtaskId)
        }))
    }

    const handleSubmitEditedTask = (e: React.FormEvent): void => {
        e.preventDefault()
        dispatch(editTask({ column, newColumnId: editNewColumnId, taskData: editTaskData }))
        toggleEditTaskModal()
    }

    const subtaskInputElements = editTaskData.subtasks.map(subtask => {
        return <div key={subtask.id} className='flex items-center gap-4'>
            <input
                required
                value={subtask.title}
                onChange={e => handleEditSubtaskListChange(e, subtask.id)}
                className='p-3 flex-1 block outline-none border-secondary-light border-1 border-opacity-25 rounded mb-2' />
            <button
                onClick={(e) => handleRemoveSubtask(e, subtask.id)}
            ><IconCross /></button>
        </div>
    })

    const dropdownColumnElements = columns.map(column => <option key={column.id} value={column.id}>{column.name}</option>)

    return (
        <Modal
            show={isEditTaskModalOpen}
            onHide={toggleEditTaskModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='p-4'>
                <Modal.Header className='block p-0 border-0'>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className='font-bold mb-4'>
                        Edit Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <form autoComplete='off'
                        onSubmit={handleSubmitEditedTask}
                    >
                        <label htmlFor='boardName' className='text-secondary-light font-bold'>Title</label>
                        <input
                            required
                            type="text"
                            id='title'
                            name='title'
                            value={editTaskData.title}
                            onChange={handleTaskDataEditChange}
                            className='w-full p-3 block outline-none border-secondary-light border-1 border-opacity-25 rounded' />

                        <label htmlFor='description' className='text-secondary-light font-bold'>Description</label>
                        <textarea id='description'
                            name='description'
                            value={editTaskData.description || ''}
                            onChange={handleTaskDataEditChange}
                            className='w-full p-3 min-h-[150px] resize-none block outline-none border-secondary-light border-1 border-opacity-25 rounded' />


                        <label className='text-secondary-light font-bold mt-4'>Subtasks</label>
                        {subtaskInputElements}
                        <button
                            onClick={handleAddSubtask}
                            className='w-full bg-[rgba(99,95,199,0.10)] text-primary font-bold rounded-2xl p-4 mb-4'
                        >+ Add New Subtask</button>

                        <label htmlFor="status" className='block text-secondary-light font-bold mb-2'>Status</label>
                        <select
                            name="status"
                            id="status"
                            value={editNewColumnId}
                            onChange={handleChangeStatus}
                            className='w-full my-4 px-2 py-4 border-2 border-[rgba(130,143,163,0.25)]'>
                            {dropdownColumnElements}
                        </select>

                        <button
                            className='w-full bg-primary text-white font-bold rounded-2xl p-4 mb-4'
                        >Save Changes</button>
                    </form>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default EditTaskModal