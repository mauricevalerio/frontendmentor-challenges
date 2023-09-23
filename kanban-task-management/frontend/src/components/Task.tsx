import { useState } from 'react'
import { TColumn, Ttask } from '../types/types'
import { countCompletedSubtasks } from '../utils'
import ViewTaskModal from './TaskModals/ViewTaskModal'

type TTaskProps = {
    task: Ttask
    column: TColumn
}

const Task: React.FC<TTaskProps> = ({ task, column }) => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false)
    const toggleTaskModal = () => setIsTaskModalOpen(prevState => !prevState)

    return (
        <>
            <div
                onClick={toggleTaskModal}
                className='cursor-pointer rounded-lg p-4 mb-4 bg-white shadow-[0_4px_6px_0px_rgba(54,78,126,0.10)]'>
                <p className='font-bold mb-2 text-light'>
                    {task.title}
                </p>
                <p className='text-sm text-secondary-light'>{countCompletedSubtasks(task.subtasks)}  of {task.subtasks.length} subtasks</p>
            </div>

            <ViewTaskModal
                isTaskModalOpen={isTaskModalOpen}
                toggleTaskModal={toggleTaskModal}
                task={task}
                column={column} />
        </>
    )
}

export default Task