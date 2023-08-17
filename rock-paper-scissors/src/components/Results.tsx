import { globalContext } from '../context/GameContext'

const Results: React.FC = () => {

    const { isGameOver, resultText } = globalContext()

    return (
        <div className='position-relative'>
            {!isGameOver && <h1 className='animation__results text-uppercase m-0 start-50 translate-middle position-absolute'>{resultText}</h1>}
        </div>

    )
}

export default Results