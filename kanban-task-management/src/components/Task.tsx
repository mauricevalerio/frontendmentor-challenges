import { useState } from 'react'
import { TColumn, Ttask } from '../types/types'
import { countCompletedSubtasks } from '../utils'
import ViewTaskModal from './TaskModals/ViewTaskModal'
import { globalThemeContext } from '@/context/ThemeContext'
import { Draggable } from '@hello-pangea/dnd'

type TTaskProps = {
    task: Ttask
    column: TColumn
    index: number
}

const Task: React.FC<TTaskProps> = ({ task, column, index }) => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false)
    const toggleTaskModal = () => setIsTaskModalOpen(prevState => !prevState)
    const { theme } = globalThemeContext()

    return (
        <>
            <Draggable draggableId={task.id.toString()} index={index}>
                {provided =>
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={toggleTaskModal}
                        className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'} cursor-pointer rounded-lg p-4 mb-4 shadow-[0_4px_6px_0px_rgba(54,78,126,0.10)]`}>
                        <p className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-light'}`}>
                            {task.title}
                        </p>
                        <p className='text-sm text-secondary-light'>{countCompletedSubtasks(task.subtasks)}  of {task.subtasks.length} subtasks</p>
                    </div>
                }
            </Draggable>
            <ViewTaskModal
                isTaskModalOpen={isTaskModalOpen}
                toggleTaskModal={toggleTaskModal}
                task={task}
                column={column} />

        </>
    )
}

export default Task