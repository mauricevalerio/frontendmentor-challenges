import { useState, useEffect, useContext, createContext } from 'react'
import { GameContextProviderProp, GameContextType } from '../types/TContextTypes'
import { TChoices } from '../types/TContextTypes'
import { getComputerChoice } from '../utils.ts/utils'
import { isWinner } from '../utils.ts/utils'
import { Score } from '../types/TContextTypes'

const GameContext = createContext<GameContextType>({
    choice: '',
    selectedChoice: () => { },
    computerChoice: '',
    resultText: '',
    score: {
        yourScore: 0,
        computerScore: 0
    },
    handleResetGame: () => { },
    gameSetScore: 3,
    handleGameSetterChange: () => { },
    isGameOver: false,
    hasGameStarted: false,
    handleGameStarted: () => { }
})

export const globalContext = () => useContext(GameContext)

const GameContextProvider: React.FC<GameContextProviderProp> = ({ children }) => {
    const [choice, setChoices] = useState<TChoices>('')
    const [computerChoice, setComputerChoice] = useState<TChoices>('')
    const [resultText, setResultText] = useState<string>('')
    const [hasGameStarted, setHasGameStarted] = useState<boolean>(false)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [score, setScore] = useState<Score>({
        yourScore: 0,
        computerScore: 0
    })
    const [gameSetScore, setGameSetScore] = useState<number>(3)

    const selectedChoice = (choice: TChoices) => {
        setChoices(choice)
        let tempComputerChoice = getComputerChoice()

        setTimeout(() => {
            setComputerChoice(tempComputerChoice)

            switch (isWinner(choice, tempComputerChoice)) {
                case null:
                    setScore(prevScore => prevScore)
                    setResultText('Draw')
                    break;
                case true:
                    setScore(prevScore => ({ ...prevScore, yourScore: prevScore.yourScore + 1 }))
                    setResultText('You Win')
                    break;
                case false:
                    setScore(prevScore => ({ ...prevScore, computerScore: prevScore.computerScore + 1 }))
                    setResultText('You Lose')
                    break;
            }
            setTimeout(() => {
                setChoices('')
                setComputerChoice('')
                setResultText('')
            }, 2000)
        }, 2000)
    }

    const handleGameSetterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGameSetScore(parseInt(e.target.value))
    }

    const handleGameStarted = () => { setHasGameStarted(true) }

    const handleResetGame = () => {
        setChoices('')
        setComputerChoice('')
        setScore({
            yourScore: 0,
            computerScore: 0
        })
        setIsGameOver(false)
        setHasGameStarted(false)
        localStorage.clear()
    }

    useEffect(() => {
        if (score.yourScore === gameSetScore || score.computerScore === gameSetScore) {
            setTimeout(() => {
                setIsGameOver(true)
            }, 1500)
        }
    }, [score.yourScore, score.computerScore])

    return (
        <GameContext.Provider value={{
            choice,
            selectedChoice,
            computerChoice,
            resultText,
            score,
            handleResetGame,
            gameSetScore,
            handleGameSetterChange,
            isGameOver,
            hasGameStarted,
            handleGameStarted
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContextProvider