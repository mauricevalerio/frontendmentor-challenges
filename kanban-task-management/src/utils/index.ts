import { TColumn, TSubtask } from '../types/types'
import { nanoid } from 'nanoid'

export const countCompletedSubtasks = (subtasks: TSubtask[]): string => {

    const completedSubtasks = subtasks.filter(subtask => subtask.isCompleted).length
    return completedSubtasks.toString()
}

export const generateColumnsData = (): TColumn[] => [
    {
        id: nanoid(),
        name: 'Todo',
        tasks: [],
    },
    {
        id: nanoid(),
        name: 'Doing',
        tasks: [],
    }
]

export const generateSubtasksData = (): TSubtask[] => [
    {
        id: nanoid(),
        title: '',
        isCompleted: false,
    },
    {
        id: nanoid(),
        title: '',
        isCompleted: false,
    }
]