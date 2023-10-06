import { globalEditModalContext } from '@/context/EditModalContext'
import { useAppSelector } from '../app/hooks'
import { selectCurrentBoard } from '../features/board/dataSlice'
import Task from './Task'
import { globalThemeContext } from '@/context/ThemeContext'

const Columns: React.FC = () => {
    const { columns } = useAppSelector(selectCurrentBoard)
    const { toggleEditBoardModal } = globalEditModalContext()
    const { theme } = globalThemeContext()

    const columnElements = columns.map(column => <div key={column.id} className='p-4'>
        <h2 className='text-sm font-bold tracking-[2.5px] uppercase mb-4 text-secondary-light'>{`${column.name} (${column.tasks.length})`}</h2>
        <div className='w-72'>
            {column.tasks.map(task => <Task key={task.id} task={task} column={column} />)}
        </div>
    </div>)

    return (
        <>
            {columns.length > 0 ?
                <div className={`min-h-full md:absolute md:left-[300px] ${theme === 'dark' ? 'bg-very-dark-bg' : 'bg-light-bg'}`}>
                    <section className='flex'>
                        {columnElements}
                        <div
                            className='cursor-pointer p-4 rounded-2xl'
                            onClick={toggleEditBoardModal}
                        >
                            <div
                                className={`min-w-max h-full rounded-2xl px-10 flex items-center font-bold text-lg text-secondary-light ${theme === 'dark' ? 'bg-gradient-dark' : 'bg-gradient-light'}`}
                            >+ New Column</div>
                        </div>
                    </section>
                </div>
                : <div className='min-h-full flex-1 flex flex-col justify-center items-center text-secondary-light text-center text-lg'>
                    <h1 className='p-4 font-bold'>This board is empty. Create a new column to get started.</h1>
                    <button
                        onClick={toggleEditBoardModal}
                        className='font-semibold p-4 rounded-full bg-primary text-white'>+ Add New Column</button>
                </div>}
        </>
    )
}

export default Columns