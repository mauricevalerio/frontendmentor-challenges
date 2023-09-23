import { IconLogoMobile, IconAddTaskMobile, IconVerticalEllipsis } from '../icons'
import Dropdown from './Dropdown'
import BsDropdown from 'react-bootstrap/Dropdown'
import EditBoardModal from './BoardModals/EditBoardModal'
import { useAppSelector } from '@/app/hooks'
import { selectCurrentBoard } from '@/features/board/dataSlice'
import { globalEditModalContext } from '@/context/EditModalContext'
import { useState } from 'react'
import DeleteBoardModal from './BoardModals/DeleteBoardModal'
import AddTaskModal from './TaskModals/AddTaskModal'

const Header: React.FC = () => {
    const currentBoard = useAppSelector(selectCurrentBoard)
    const { isEditBoardModalOpen, toggleEditBoardModal } = globalEditModalContext()

    const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState<boolean>(false)
    const toggleDeleteBoardModal = (): void => { setIsDeleteBoardModalOpen(prevStatus => !prevStatus) }

    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false)
    const toggleAddTaskModal = (): void => { setIsAddTaskModalOpen(prevStatus => !prevStatus) }

    return (
        <>
            <header className='p-4 flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <IconLogoMobile />
                    <Dropdown />
                </div>
                <div className='flex gap-4 items-center'>
                    <button
                        onClick={toggleAddTaskModal}
                        disabled={currentBoard.columns?.length === 0 ? true : false}
                        className='bg-primary py-2 px-4 rounded-full disabled:opacity-50'><IconAddTaskMobile />
                    </button>

                    <BsDropdown>
                        <BsDropdown.Toggle className='bg-transparent border-none border-0 after:content-none'>
                            <IconVerticalEllipsis />
                        </BsDropdown.Toggle>

                        <BsDropdown.Menu className='mt-4'>
                            <BsDropdown.Item
                                as='button'
                                className='font-bold mb-2 text-secondary-light'
                                onClick={toggleEditBoardModal}>Edit Board
                            </BsDropdown.Item>

                            <BsDropdown.Item
                                as='button'
                                className='text-destructive font-bold'
                                onClick={toggleDeleteBoardModal}
                            >Delete Board</BsDropdown.Item>
                        </BsDropdown.Menu>
                    </BsDropdown>
                </div>
            </header>

            <EditBoardModal
                isEditBoardModalOpen={isEditBoardModalOpen}
                toggleEditBoardModal={toggleEditBoardModal}
            />

            <DeleteBoardModal
                isDeleteBoardModalOpen={isDeleteBoardModalOpen}
                toggleDeleteBoardModal={toggleDeleteBoardModal}
            />

            {currentBoard.columns.length !== 0 ?
                <AddTaskModal
                    isAddTaskModalOpen={isAddTaskModalOpen}
                    toggleAddTaskModal={toggleAddTaskModal}
                />
                : null
            }

        </>
    )
}

export default Header