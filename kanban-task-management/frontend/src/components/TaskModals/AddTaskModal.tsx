import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react'
import { IconCross } from '@/icons'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addTask, selectCurrentBoard } from '@/features/board/dataSlice'
import { TSubtask } from '@/types/types'
import { generateSubtasksData } from '@/utils'
import { nanoid } from 'nanoid'
import { globalThemeContext } from '@/context/ThemeContext'

type TAddTaskModalProps = {
    isAddTaskModalOpen: boolean,
    toggleAddTaskModal: () => void
}

type TTaskDetails = {
    title: string,
    description: string
    status: string | number
}

const AddTaskModal: React.FC<TAddTaskModalProps> = ({ isAddTaskModalOpen, toggleAddTaskModal }) => {

    const { themeValueBg, themeValueText, themeValueTextInput, themeValueBtnBg } = globalThemeContext()
    const selector = useAppSelector(selectCurrentBoard)
    const dispatch = useAppDispatch()

    const [taskDetails, setTaskDetails] = useState<TTaskDetails>({
        title: '',
        description: '',
        status: selector.columns[0].id
    })
    const [subtaskValues, setSubtaskValues] = useState<TSubtask[]>(() => generateSubtasksData())

    //if currentboard changes, set initial status to the first element of the column's current board
    useEffect(() => {
        setTaskDetails(prevTaskDetails => ({
            ...prevTaskDetails,
            status: selector.columns[0].id
        }))
    }, [selector])

    const handleTaskDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target
        setTaskDetails(prevTaskDetails => ({
            ...prevTaskDetails,
            [name]: value
        }))
    }

    const handleSubtaskInputChange = (e: React.ChangeEvent<HTMLInputElement>, subtaskId: number | string): void => {
        setSubtaskValues(prevSubtaskValues => prevSubtaskValues.map(subtask =>
            subtask.id === subtaskId ? { ...subtask, title: e.target.value } : subtask
        ))
    }

    const handleAddSubtask = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        setSubtaskValues(prevSubtaskValues => [...prevSubtaskValues, {
            id: nanoid(),
            title: '',
            isCompleted: false
        }])
    }

    const handleRemoveSubtask = (e: React.FormEvent<HTMLButtonElement>, subtaskId: number | string): void => {
        e.preventDefault()
        setSubtaskValues(prevSubtaskValues => prevSubtaskValues.filter(subtask => subtask.id !== subtaskId))
    }

    const handleAddTask = (e: React.FormEvent): void => {
        e.preventDefault()

        dispatch(addTask({
            id: nanoid(),
            title: taskDetails.title,
            description: taskDetails.description,
            status: taskDetails.status, //task status contains the column id
            subtasks: subtaskValues
        }))

        setTaskDetails({
            title: '',
            description: '',
            status: ''
        })
        setSubtaskValues(generateSubtasksData())
        toggleAddTaskModal()
    }

    const subtaskInputElements = subtaskValues.map(subtask => <div key={subtask.id} className='flex items-center gap-4'>
        <input
            required
            value={subtask.title}
            onChange={e => handleSubtaskInputChange(e, subtask.id)}
            className={`${themeValueBg} ${themeValueTextInput} p-3 flex-1 block outline-none border-secondary-light border-1 border-opacity-25 rounded mb-2`} />
        <button onClick={(e) => handleRemoveSubtask(e, subtask.id)}><IconCross /></button>
    </div>
    )

    const statusDropdownElements = selector.columns.map(column => <option key={column.id} value={column.id}>{column.name}</option>)

    return (
        <Modal
            show={isAddTaskModalOpen}
            onHide={toggleAddTaskModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className={`p-4 ${themeValueBg}`}>
                <Modal.Header className='items-center p-0 mb-4 border-0'>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className={`font-bold ${themeValueText}`}>
                        Add New Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <form autoComplete='off' onSubmit={handleAddTask}>

                        <label htmlFor='title' className={`${themeValueText} font-bold`}>Title</label>
                        <input
                            required
                            type='text'
                            id='title'
                            name='title'
                            value={taskDetails.title}
                            onChange={handleTaskDetailsChange}
                            className={`${themeValueBg} ${themeValueTextInput} w-full p-3 block outline-none border-secondary-light border-1 border-opacity-25 rounded`} />

                        <label htmlFor='description' className={`${themeValueText} font-bold`}>Description</label>
                        <input
                            type='text'
                            id='description'
                            name='description'
                            value={taskDetails.description}
                            onChange={handleTaskDetailsChange}
                            className={`${themeValueBg} ${themeValueTextInput} w-full p-3 block outline-none border-secondary-light border-1 border-opacity-25 rounded`} />

                        <label className={`font-bold mt-4 ${themeValueText}`}>Subtasks</label>
                        {subtaskInputElements}
                        <button
                            onClick={handleAddSubtask}
                            className={`${themeValueBtnBg} w-full text-primary font-bold rounded-3xl p-4 mb-4`}
                        >+ Add New Subtask</button>

                        <label className={`font-bold mt-4 ${themeValueText}`} htmlFor="status">Status</label>
                        <select
                            id='status'
                            name='status'
                            value={taskDetails.status} //contains column id and not the column name
                            className={`${themeValueTextInput} ${themeValueBg} cursor-pointer w-full my-4 px-2 py-4 border-2 border-[rgba(130,143,163,0.25)]`}
                            onChange={handleTaskDetailsChange}>
                            {statusDropdownElements}
                        </select>

                        <button
                            className='w-full bg-primary text-white font-bold rounded-3xl p-4 mb-4'
                        >Create Task</button>
                    </form>
                </Modal.Body>
            </div>
        </Modal >
    )

}

export default AddTaskModal