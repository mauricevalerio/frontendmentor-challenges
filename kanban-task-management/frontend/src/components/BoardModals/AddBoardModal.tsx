import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { IconCross } from '@/icons'
import { useAppDispatch } from '@/app/hooks'
import { addBoard } from '@/features/board/dataSlice'
import { TColumn } from '@/types/types'
import { generateColumnsData } from '@/utils'
import { nanoid } from 'nanoid'
import { globalThemeContext } from '@/context/ThemeContext'

type TAddBoardModalProps = {
    isAddBoardModalOpen: boolean,
    toggleAddBoardModal: () => void
}

const AddBoardModal: React.FC<TAddBoardModalProps> = ({ isAddBoardModalOpen, toggleAddBoardModal }) => {

    const { themeValueBg, themeValueText, themeValueTextInput, themeValueBtnBg } = globalThemeContext()
    const [boardName, setBoardName] = useState<string>('')
    const [columnValues, setColumnValues] = useState<TColumn[]>(() => generateColumnsData())
    const dispatch = useAppDispatch()

    const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => setBoardName(e.target.value)

    const handleColumnInputChange = (e: React.ChangeEvent<HTMLInputElement>, columnId: number | string): void => {
        setColumnValues(prevColumnValues => prevColumnValues.map(column =>
            column.id === columnId ? { ...column, name: e.target.value } : column
        ))
    }

    const handleAddColumn = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        setColumnValues(prevColumnValues => [...prevColumnValues, {
            id: nanoid(),
            name: '',
            tasks: []
        }])
    }

    const handleRemoveColumn = (e: React.FormEvent<HTMLButtonElement>, columnId: number | string): void => {
        e.preventDefault()
        setColumnValues(prevColumnValues => prevColumnValues.filter(column => column.id !== columnId))
    }

    const handleAddBoard = (e: React.FormEvent): void => {
        e.preventDefault()
        const newBoardId = nanoid()

        dispatch(addBoard({
            id: newBoardId,
            name: boardName,
            columns: columnValues
        }))
        setBoardName('')
        setColumnValues(generateColumnsData())
        toggleAddBoardModal()
    }

    const columnInputElements = columnValues.map(column => <div key={column.id} className='flex items-center gap-4'>
        <input
            required
            value={column.name}
            onChange={e => handleColumnInputChange(e, column.id)}
            className={`${themeValueTextInput} ${themeValueBg} p-3 flex-1 block outline-none border-secondary-light border-1 border-opacity-25 rounded mb-2`} />
        <button onClick={(e) => handleRemoveColumn(e, column.id)}><IconCross /></button>
    </div>
    )

    return (
        <Modal
            show={isAddBoardModalOpen}
            onHide={toggleAddBoardModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className={`p-4 ${themeValueBg}`}>
                <Modal.Header className='items-center p-0 mb-4 border-0'>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className={`font-bold ${themeValueText}`}>
                        Add New Board
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <form autoComplete='off' onSubmit={handleAddBoard}>

                        <label htmlFor='boardName' className={`${themeValueText} font-bold`}>Board Name</label>
                        <div className='relative after:absolute after:top-1/2 after:-translate-y-1/2 after:right-5 after:required:invalid:content-["Cannot_be_empty"] after:text-sm after:text-destructive'>
                            <input
                                required
                                type="text"
                                id='boardName'
                                value={boardName}
                                onChange={handleBoardNameChange}
                                className={`${themeValueBg} w-full p-3 block outline-none border-secondary-light border-1 border-opacity-25 rounded
                             required:invalid:focus:border-destructive`} />
                        </div>

                        <label className={`${themeValueText} font-bold mt-4`}>Board Columns</label>
                        {columnInputElements}
                        <button
                            onClick={handleAddColumn}
                            className={`${themeValueBtnBg} w-full text-primary font-bold rounded-3xl p-4 mb-4`}
                        >+ Add New Column</button>
                        <button
                            className='w-full bg-primary text-white font-bold rounded-3xl p-4 mb-4'
                        >Create New Board</button>
                    </form>
                </Modal.Body>
            </div>
        </Modal >
    )

}

export default AddBoardModal