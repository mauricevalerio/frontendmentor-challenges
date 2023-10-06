import { IconBoard } from '../icons'
import { TBoardProps } from '../types/types'
import BsDropdown from 'react-bootstrap/Dropdown'


const Board: React.FC<TBoardProps> = ({ board, onClickGetCurrentBoard, currentBoardId }) => {
    return (
        <BsDropdown.Item as='button' key={board.id}
            className={`p-0 text-secondary-light block relative hover:bg-[transparent] active:bg-[transparent] focus:bg-[transparent] ${board.id === currentBoardId ?
                'before:left-0 before:absolute before:bg-primary before:content-[""] before:w-full before:h-full before:rounded-r-2xl' : ''}`}
            onClick={() => onClickGetCurrentBoard(board.id)}>

            <p className={`md:text-base relative flex items-center gap-4 my-4 ms-4 me-10 text-lg font-bold z-10 ${board.id === currentBoardId ? 'text-white' : ''}`}>
                <IconBoard />
                {board.name}
            </p>
        </BsDropdown.Item>
    )
}

export default Board