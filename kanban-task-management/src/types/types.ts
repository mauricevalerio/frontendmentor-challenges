//PROP TYPES
export type TBoardProps = {
    board: TBoard,
    onClickGetCurrentBoard: (id: number | string) => void,
    currentBoardId: string | number
}

//CONTEXT TYPES
export type ContextProviderProp = {
    children: React.ReactNode
}

export type EditModalContextValue = {
    isEditBoardModalOpen: boolean,
    toggleEditBoardModal: () => void
}

export type ThemeContextValue = {
    theme: string
    toggleTheme: () => void
    themeValueBg: string
    themeValueText: string
    themeValueTextInput: string
    themeValueBtnBg: string
}

//DATA AND INITIAL STATE ON REDUX TYPES
export type TSubtask = {
    id: number | string,
    title: string,
    isCompleted: boolean
}

export type Ttask = {
    id: number | string,
    title: string,
    description: string | null,
    status: string | number,
    subtasks: TSubtask[]
}

export type TColumn = {
    id: number | string,
    name: string,
    tasks: Ttask[]
}

export type TBoard = {
    id: number | string,
    name: string,
    columns: TColumn[],
}

export type TInitialState = {
    boards: TBoard[],
    currentBoard: TBoard
}
