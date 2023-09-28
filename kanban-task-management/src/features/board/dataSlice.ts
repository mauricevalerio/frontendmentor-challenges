import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import data from '../../data.json'
import { TBoard, TInitialState, Ttask } from '../../types/types'
import { EStatus } from '../../types/enums'


const initialState: TInitialState = {
    boards: data,
    currentBoard: data[0],
    status: EStatus.IDLE,
    error: null
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
        }

    }
})



export const { setCurrentBoard, addBoard, editBoard, deleteBoard,
    addTask, editTask, deleteTask } = dataSlice.actions

export const selectBoardList = (state: RootState) => state.data.boards.map(board => ({ id: board.id, name: board.name, columns: board.columns }))

//for dropdown styling and selecting current board
export const selectCurrentBoard = (state: RootState) => state.data.currentBoard

export default dataSlice.reducer