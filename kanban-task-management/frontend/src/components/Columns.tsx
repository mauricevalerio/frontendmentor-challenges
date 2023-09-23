import { globalEditModalContext } from '@/context/EditModalContext'
import { useAppSelector } from '../app/hooks'
import { selectCurrentBoard } from '../features/board/dataSlice'
import Task from './Task'

const Columns: React.FC = () => {
    const { columns } = useAppSelector(selectCurrentBoard)
    const { toggleEditBoardModal } = globalEditModalContext()

    const columnElements = columns.length > 0 ?
        columns.map(column => <div key={column.id} className='p-4'>
            <h2 className='text-sm font-bold tracking-[2.5px] uppercase mb-4 text-secondary-light'>{`${column.name} (${column.tasks.length})`}</h2>
            <div className='w-72'>
                {column.tasks.map(task => <Task key={task.id} task={task} column={column} />)}
            </div>
        </div>)
        :
        <div className='flex items-center flex-col text-secondary-light text-center text-lg justify-center'>
            <h1 className='p-4 font-bold'>This board is empty. Create a new column to get started.</h1>
            <button
                onClick={toggleEditBoardModal}
                className='font-semibold p-4 rounded-full bg-primary text-white'>+ Add New Column</button>
        </div>

    return (
        <section className='flex overflow-scroll bg-light-bg min-h-screen'>
            {columnElements}
        </section>
    )
}

export default Columns