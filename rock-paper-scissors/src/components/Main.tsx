import BgTriangle from '../assets/bg-triangle.svg'
import Rock from './buttons/Rock'
import Paper from './buttons/Paper'
import Scissors from './buttons/Scissors'
import TemplateContainer from './TemplateContainer'
import TemplateItemContainer from './TemplateItemContainer'
import { globalContext } from '../context/GameContext'
import { EChoices } from '../enums/EChoices'
import { TChoices } from '../types/TContextTypes'
import Placeholder from './Placeholder'
import { Button } from 'react-bootstrap'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'


const Main: React.FC = () => {

    const selections: number[] = [3, 4, 5, 6, 7, 8, 9, 10]

    const { width, height } = useWindowSize()
    const { choice,
        score,
        computerChoice,
        isGameOver,
        gameSetScore,
        handleGameSetterChange,
        hasGameStarted,
        handleGameStarted } = globalContext()

    const renderComponentChoice = (choiceParam: TChoices): JSX.Element | null => {
        return choiceParam === EChoices.PAPER ? <Paper /> :
            choiceParam === EChoices.ROCK ? <Rock /> :
                choiceParam === EChoices.SCISSORS ? <Scissors /> :
                    null
    }

    const displayChoice = renderComponentChoice(choice)
    const displayComputerChoice = renderComponentChoice(computerChoice)

    return (
        <>
            {!hasGameStarted ?
                <div className='m-auto text-center fs-5 w-50'>
                    <span className='fs-4'>Playing Up To{' '}</span>
                    <select
                        name='gameSetScore'
                        id='gameSetScore'
                        value={gameSetScore}
                        onChange={handleGameSetterChange}
                        className='p-1 rounded'
                    >
                        {
                            selections.map(num => <option key={num} value={num}>{num}</option>)
                        }
                    </select>
                    <Button className='mt-5 d-block p-2 w-50' onClick={handleGameStarted}>
                        Start
                    </Button>
                </div >
                :
                !isGameOver ?
                    <main key={choice} className='main mx-auto mt-auto position-relative'>
                        {choice !== '' ?
                            <TemplateContainer>
                                <TemplateItemContainer choice={choice}>
                                    {displayChoice}
                                </TemplateItemContainer>

                                <TemplateItemContainer computerChoice={computerChoice}>
                                    {displayComputerChoice === null ?
                                        <Placeholder />
                                        : displayComputerChoice}
                                </TemplateItemContainer>
                            </TemplateContainer>
                            :
                            <>
                                <img src={BgTriangle} alt="Triangle Background" className='main__triangle--icon' />
                                <Paper />
                                <Scissors />
                                <Rock />
                            </>
                        }

                    </main>
                    :
                    <>
                        <h1 className='text-center text-uppercase fs-1'>{score.yourScore === gameSetScore ? 'You won the game!' : 'You Lost 😔'}</h1>
                        {score.yourScore === gameSetScore && <Confetti width={width} height={height} />}
                    </>
            }
        </>
    )
}

export default Main