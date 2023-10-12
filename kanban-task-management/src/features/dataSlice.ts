import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import data from '@/data.json'
import { TBoard, TInitialState, Ttask } from '@/types/types'

const loadBoards = (): TBoard[] => {
    try {
        const serialState = localStorage.getItem('boards')
        if (serialState === null) {
            return data
        }
        return JSON.parse(serialState)
    } catch (err) {
        return data
    }
}

const loadCurrentBoard = (): TBoard => {
    try {
        const serialState = localStorage.getItem('currentBoard')
        if (serialState === null) {
            return data[0]
        }
        return JSON.parse(serialState)
    } catch (err) {
        return data[0]
    }
}

const initialState: TInitialState = {
    boards: loadBoards(),
    currentBoard: loadCurrentBoard()
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCurrentBoard(state, action: PayloadAction<number | string>) {
            state.currentBoard = state.boards.find(board => board.id === action.payload) || data[0]
        },
        addBoard(state, action: PayloadAction<TBoard>) {
            state.boards.unshift(action.payload)
            state.currentBoard = action.payload
        },
        editBoard(state, action: PayloadAction<TBoard>) {
            state.boards = state.boards.map(board => board.id === action.payload.id ? action.payload : board)
            state.currentBoard = action.payload
        },
        deleteBoard(state, action: PayloadAction<number | string>) {
            const deletedBoardIdx = state.boards.map(board => board.id).indexOf(action.payload)
            state.boards = state.boards.filter(board => board.id !== action.payload)

            //sets current board to the preceding board of the deleted board
            state.currentBoard = deletedBoardIdx - 1 <= 0 ? state.boards[0] : state.boards[deletedBoardIdx - 1]
        },
        addTask(state, action: PayloadAction<Ttask>) {
            state.currentBoard.columns = state.currentBoard.columns.map(column => column.id === action.payload.status ?
                { ...column, tasks: [...column.tasks, action.payload] }
                : column)

            state.boards = state.boards.map(board => board.id === state.currentBoard.id ?
                state.currentBoard : board)
        },
        editTask(state, action) {
            //for updating subtasks
            state.currentBoard.columns = state.currentBoard.columns.map(column => column.id === action.payload.column.id ?
                {
                    ...column,
                    tasks: column.tasks.map(task => task.id === action.payload.taskData.id ?
                        {
                            ...action.payload.taskData,
                            title: action.payload.taskData.title,
                            description: action.payload.taskData.description,
                            status: action.payload.taskData.status,
                            subtasks: action.payload.taskData.subtasks
                        }
                        : task
                    )
                }
                : column
            )

            //update state boards
            state.boards = state.boards.map(board => board.id === state.currentBoard.id ?
                { ...board, columns: state.currentBoard.columns }
                : board)

            //does not make any changes on the column data if old and new column ids are equal
            if (action.payload.column.id === action.payload.newColumnId) return

            //filters out the task data on the old column
            state.currentBoard.columns = state.currentBoard.columns.map(column => column.id === action.payload.column.id ?
                { ...column, tasks: column.tasks.filter(task => task.id !== action.payload.taskData.id) }
                : column
            )

            //adds the task data to the new column
            state.currentBoard.columns = state.currentBoard.columns.map(column => column.id === action.payload.newColumnId ?
                {
                    ...column,
                    tasks: [...column.tasks, {
                        ...action.payload.taskData,
                        status: column.name,
                    }]
                }
                :
                column
            )


            //update state.boards
            state.boards = state.boards.map(board => board.id === state.currentBoard.id ?
                { ...board, columns: state.currentBoard.columns }
                : board)
        },
        deleteTask(state, action) {
            state.currentBoard.columns = state.currentBoard.columns.map(column => column.id === action.payload.columnId ?
                {
                    ...column,
                    tasks: column.tasks.filter(task => task.id !== action.payload.taskData.id)
                }
                :
                column
            )
            state.boards = state.boards.map(board => board.id === state.currentBoard.id ?
                { ...board, columns: state.currentBoard.columns }
                : board)
        },
        onDrag(state, action) {

            //snapshot of old state of source column
            const tempCol = state.currentBoard.columns.find(column => column.id === action.payload.source.droppableId)

            //update source column
            state.currentBoard.columns = state.currentBoard.columns.map(column => column.id === action.payload.source.droppableId ?
                { ...column, tasks: column.tasks.filter(task => task.id !== action.payload.draggableId) }
                : column
            )

            //pulls the task data that is currently dragged
            let tempTask = tempCol?.tasks.find(task => task.id === action.payload.draggableId)


            //update destination column
            state.currentBoard.columns = state.currentBoard.columns.map(column => {
                if (column.id === action.payload.destination.droppableId) {
                    const newTasks = Array.from(column.tasks)

                    if (tempTask) {
                        newTasks.splice(action.payload.destination.index, 0, tempTask)
                    }

                    return { ...column, tasks: newTasks }
                }
                return column
            })

            state.boards = state.boards.map(board => board.id === state.currentBoard.id ?
                { ...board, columns: state.currentBoard.columns }
                : board)
        }
    }
})



export const { setCurrentBoard, addBoard, editBoard, deleteBoard,
    addTask, editTask, deleteTask, onDrag } = dataSlice.actions

export const selectBoardList = (state: RootState) => state.data.boards.map(board => ({ id: board.id, name: board.name, columns: board.columns }))

//for dropdown styling and selecting current board
export const selectCurrentBoard = (state: RootState) => state.data.currentBoard

export default dataSlice.reducer