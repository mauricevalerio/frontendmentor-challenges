import { EChoices } from '../enums/EChoices'

export type TChoices = EChoices.ROCK | EChoices.PAPER | EChoices.SCISSORS | ''

export type GameContextType = {
    choice: TChoices,
    selectedChoice: (choice: TChoices) => void,
    computerChoice: TChoices,
    resultText: string,
    score: Score,
    handleResetGame: () => void,
    gameSetScore: number
    handleGameSetterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    isGameOver: boolean,
    hasGameStarted: boolean,
    handleGameStarted: () => void
}

export type Score = {
    yourScore: number,
    computerScore: number
}

export type GameContextProviderProp = {
    children: React.ReactNode
}
