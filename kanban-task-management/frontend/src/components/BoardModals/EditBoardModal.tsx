import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react'
import { IconCross } from '@/icons'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { TBoard } from '@/types/types'
import { editBoard, selectCurrentBoard } from '@/features/board/dataSlice'
import { nanoid } from 'nanoid'

type TEditBoardModalProps = {
    isEditBoardModalOpen: boolean,
    toggleEditBoardModal: () => void,
}

const EditBoardModal: React.FC<TEditBoardModalProps> = ({ isEditBoardModalOpen, toggleEditBoardModal }) => {
    const currentBoard = useAppSelector(selectCurrentBoard)
    const [editedBoard, setEditedBoard] = useState<TBoard>(currentBoard)
    const dispatch = useAppDispatch()

    //isEditBoardModalOpen is on dependency array
    //to refetch default columns of the current board if user does not save changes and just closes the modal
    useEffect(() => {
        setEditedBoard(currentBoard)
    }, [currentBoard, isEditBoardModalOpen])

    const handleEditBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditedBoard(prevEditedBoard => ({ ...prevEditedBoard, name: e.target.value }))
    }

    const handleEditBoardColumnListChange = (e: React.ChangeEvent<HTMLInputElement>, columnId: number | string): void => {
        setEditedBoard(prevEditedBoard => ({
            ...prevEditedBoard,
            columns: prevEditedBoard.columns.map(column => column.id === columnId ?
                { ...column, name: e.target.value } : column
            )
        }))
    }

    const handleAddColumn = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        setEditedBoard(prevEditedBoard => ({
            ...prevEditedBoard,
            columns: [...prevEditedBoard.columns, {
                id: nanoid(),
                name: '',
                tasks: []
            }]
        }))
    }

    const handleRemoveColumn = (e: React.FormEvent<HTMLButtonElement>, columnId: number | string): void => {
        e.preventDefault()
        setEditedBoard(prevEditedBoard => ({
            ...prevEditedBoard,
            columns: prevEditedBoard.columns.filter(column => column.id !== columnId)
        }))
    }

    const handleSubmitEditedBoard = (e: React.FormEvent): void => {
        e.preventDefault()
        dispatch(editBoard(editedBoard))
        toggleEditBoardModal()
    }

    const columnInputElements = editedBoard.columns.map(column => {
        return <div key={column.id} className='flex items-center gap-4'>
            <input
                required
                value={column.name}
                onChange={e => handleEditBoardColumnListChange(e, column.id)}
                className='p-3 flex-1 block outline-none border-secondary-light border-1 border-opacity-25 rounded mb-2' />
            <button
                onClick={(e) => handleRemoveColumn(e, column.id)}
            ><IconCross /></button>
        </div>
    })

    return (
        <Modal
            show={isEditBoardModalOpen}
            onHide={toggleEditBoardModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='p-4'>
                <Modal.Header className='block p-0 border-0'>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className='font-bold mb-4'>
                        Edit Board
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <form autoComplete='off' onSubmit={handleSubmitEditedBoard}>
                        <label htmlFor='boardName' className='text-secondary-light font-bold'>Board Name</label>
                        <input
                            required
                            type="text"
                            id='boardName'
                            value={editedBoard.name}
                            onChange={handleEditBoardNameChange}
                            className='w-full p-3 block outline-none border-secondary-light border-1 border-opacity-25 rounded' />

                        <label className='text-secondary-light font-bold mt-4'>Board Columns</label>
                        {columnInputElements}
                        <button
                            onClick={handleAddColumn}
                            className='w-full bg-[rgba(99,95,199,0.10)] text-primary font-bold rounded-2xl p-4 mb-4'
                        >+ Add New Column</button>
                        <button
                            className='w-full bg-primary text-white font-bold rounded-2xl p-4 mb-4'
                        >Save Changes</button>
                    </form>
                </Modal.Body>
            </div>
        </Modal>
    )

}

export default EditBoardModal