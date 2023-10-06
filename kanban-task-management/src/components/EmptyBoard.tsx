import AddBoardModal from './BoardModals/AddBoardModal'
import { useState } from 'react'

const EmptyBoard: React.FC = () => {
    const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState<boolean>(false)

    const toggleAddBoardModal = () => { setIsAddBoardModalOpen(prevStatus => !prevStatus) }

    return (
        <>
            <div className='h-screen flex flex-col items-center justify-center'>
                <h1 className='text-center mb-2 font-bold text-secondary-light'>There are no boards available. Create a new board to get started</h1>
                <button
                    onClick={toggleAddBoardModal}
                    className='bg-primary p-4 rounded-3xl text-white font-bold'>Create New Board</button>
            </div>

            <AddBoardModal
                isAddBoardModalOpen={isAddBoardModalOpen}
                toggleAddBoardModal={toggleAddBoardModal} />
        </>
    )
}

export default EmptyBoard