import { globalEditModalContext } from '@/context/EditModalContext'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectCurrentBoard, onDrag } from '@/features/dataSlice'
import Task from './Task'
import { globalThemeContext } from '@/context/ThemeContext'
import { globalDrawerTogglerContext } from '@/context/DrawerTogglerContext'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

const Columns: React.FC = () => {
    const { columns } = useAppSelector(selectCurrentBoard)
    const { toggleEditBoardModal } = globalEditModalContext()
    const { theme } = globalThemeContext()
    const { isDrawerOpen } = globalDrawerTogglerContext()
    const dispatch = useAppDispatch()

    const columnElements = columns.map(column => <Droppable key={column.id} droppableId={column.id.toString()}>
        {provided => <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='p-4'>
            <h2 className='text-sm font-bold tracking-[2.5px] uppercase mb-4 text-secondary-light'>{`${column.name} (${column.tasks.length})`}</h2>
            <div className='w-72'>
                {column.tasks.map((task, index) =>
                    <Task
                        key={task.id} task={task} column={column} index={index} />
                )}
            </div>
            {provided.placeholder}
        </div>

        }
    </Droppable>)

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result
        if (!destination)
            return

        if (destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return
        }

        dispatch(onDrag({ destination, source, draggableId }))
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            {columns.length > 0 ?
                <div className={`min-h-full md:absolute ${isDrawerOpen ? 'md:left-[300px]' : ''}  ${theme === 'dark' ? 'bg-very-dark-bg' : 'bg-light-bg'}`}>
                    <section className='flex'>
                        {columnElements}
                        <div
                            className='cursor-pointer p-4 rounded-2xl  min-h-screen'
                            onClick={toggleEditBoardModal}
                        >
                            <div
                                className={`min-w-max min-h-full rounded-2xl px-10 flex items-center font-bold text-lg text-secondary-light ${theme === 'dark' ? 'bg-gradient-dark' : 'bg-gradient-light'}`}
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
        </DragDropContext>
    )
}

export default Columns