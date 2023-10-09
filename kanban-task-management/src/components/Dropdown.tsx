import { useState } from 'react'
import { IconChevronDown, IconBoard } from '../icons'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectBoardList, selectCurrentBoard, setCurrentBoard } from '../features/dataSlice'
import BoardNames from './BoardNames'
import ThemeToggler from './ThemeToggler'

import AddBoardModal from './BoardModals/AddBoardModal'
import BsDropdown from 'react-bootstrap/Dropdown'
import { globalThemeContext } from '@/context/ThemeContext'

const Dropdown: React.FC = () => {
    const boards = useAppSelector(selectBoardList)
    const currentBoard = useAppSelector(selectCurrentBoard)
    const dispatch = useAppDispatch()

    const { theme, themeValueTextInput, themeValueBg } = globalThemeContext()
    const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState<boolean>(false)

    const toggleAddBoardModal = (): void => { setIsAddBoardModalOpen(prevStatus => !prevStatus) }

    const onClickGetCurrentBoard = (id: number | string): void => {
        dispatch(setCurrentBoard(id))
    }

    const boardNames = boards.map(board => <BoardNames
        key={board.id}
        board={board}
        onClickGetCurrentBoard={onClickGetCurrentBoard}
        currentBoardId={currentBoard.id}
    />)

    return (
        <>
            <BsDropdown>
                <div className='md:hidden'>
                    <div className='dropdown-backdrop'></div>
                    <BsDropdown.Toggle
                        className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'} hover:bg-[transparent] flex items-center gap-x-2 p-0 w-full text-light border-none after:content-none`}>
                        <h1 className={`text-lg font-bold ${themeValueTextInput}`}>{currentBoard.name}</h1>
                        <div className='chevron'>
                            <IconChevronDown />
                        </div>
                    </BsDropdown.Toggle>
                </div>

                <BsDropdown.Menu show className={`md:transform-none md:mt-0 md:inline-block md:relative md:shadow-none md:p-0 shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)] py-4 pe-4 mt-8 border-none ${themeValueBg}`}>

                    <div className='md:flex md:flex-col md:justify-between md:h-full'>
                        <div>
                            <BsDropdown.ItemText>
                                <h1 className='text-secondary-light uppercase tracking-[2.5px] text-sm font-bold mx-4 mb-4'>All Boards ({boards.length})</h1>
                            </BsDropdown.ItemText>

                            {boardNames}

                            <BsDropdown.Item as='button'
                                onClick={toggleAddBoardModal}
                                className='p-0 hover:bg-[transparent] active:bg-[transparent] focus:bg-[transparent]'>
                                <p className='flex items-center gap-4 mt-4 mb-8 ms-4 me-10 text-lg font-bold text-primary'>
                                    <IconBoard />
                                    + Create New Board
                                </p>
                            </BsDropdown.Item>
                        </div>

                        <ThemeToggler />

                    </div>

                </BsDropdown.Menu>
            </BsDropdown >

            <AddBoardModal
                isAddBoardModalOpen={isAddBoardModalOpen}
                toggleAddBoardModal={toggleAddBoardModal} />
        </>
    )
}

export default Dropdown