import { IconLogoMobile, IconAddTaskMobile, IconVerticalEllipsis } from '../icons'
import Dropdown from './Dropdown'
import BsDropdown from 'react-bootstrap/Dropdown'
import EditBoardModal from './BoardModals/EditBoardModal'
import { useAppSelector } from '@/app/hooks'
import { selectCurrentBoard } from '@/features/dataSlice'
import { globalEditModalContext } from '@/context/EditModalContext'
import { useState } from 'react'
import DeleteBoardModal from './BoardModals/DeleteBoardModal'
import AddTaskModal from './TaskModals/AddTaskModal'
import { globalThemeContext } from '@/context/ThemeContext'
import { IconLogoLight } from '@/icons'
import { IconLogoDark } from '@/icons'

const Header: React.FC = () => {
    const { themeValueBg, themeValueTextInput, theme } = globalThemeContext()
    const currentBoard = useAppSelector(selectCurrentBoard)
    const { isEditBoardModalOpen, toggleEditBoardModal } = globalEditModalContext()

    const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState<boolean>(false)
    const toggleDeleteBoardModal = (): void => { setIsDeleteBoardModalOpen(prevStatus => !prevStatus) }

    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false)
    const toggleAddTaskModal = (): void => { setIsAddTaskModalOpen(prevStatus => !prevStatus) }

    return (
        <>
            <header className={`sticky top-0 p-4 z-10 flex justify-between ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                <div className='flex gap-2 md:gap-x-24 items-center'>
                    <div className='md:hidden'><IconLogoMobile /></div>

                    <div className='md:hidden'><Dropdown /></div>

                    <div className='hidden md:inline-block md:p-4'>
                        {theme === 'dark' ? <IconLogoLight /> : <IconLogoDark />}
                    </div>

                    <h1 className={`hidden md:inline-block font-bold text-xl ${themeValueTextInput}`}>{currentBoard.name}</h1>
                </div>
                <div className='flex gap-4 items-center'>
                    <button
                        onClick={toggleAddTaskModal}
                        disabled={currentBoard.columns?.length === 0 ? true : false}
                        className='bg-primary py-2 px-4 rounded-full disabled:opacity-50 md:flex md:items-center md:gap-2'>
                        <IconAddTaskMobile />
                        <span className='hidden md:inline-block text-white font-bold'>Add New Task</span>
                    </button>

                    <BsDropdown>
                        <BsDropdown.Toggle className='bg-transparent border-none border-0 after:content-none'>
                            <IconVerticalEllipsis />
                        </BsDropdown.Toggle>

                        <BsDropdown.Menu className={`mt-4 ${themeValueBg}`}>
                            <BsDropdown.Item
                                as='button'
                                className='font-bold mb-2 text-secondary-light hover:bg-[transparent]'
                                onClick={toggleEditBoardModal}>Edit Board
                            </BsDropdown.Item>

                            <BsDropdown.Item
                                as='button'
                                className='text-destructive font-bold hover:bg-[transparent]'
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