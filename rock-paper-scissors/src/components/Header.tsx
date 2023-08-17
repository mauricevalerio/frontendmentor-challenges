import { globalContext } from '../context/GameContext'

const Header: React.FC = () => {

    const { score, hasGameStarted, gameSetScore } = globalContext()

    return (
        <header className='header'>
            <div className='header__box rounded px-1 py-3 d-flex justify-content-between align-items-center'>
                <div>
                    <h3 className='lh-1 m-0'>ROCK</h3>
                    <h3 className='lh-1 m-0'>PAPER</h3>
                    <h3 className='lh-1 m-0'>SCISSORS</h3>
                </div>

                <div className='d-flex gap-1 text-center'>
                    <div className='bg-white p-1 lh-1 rounded'>
                        <span className='header__score--label text-uppercase'>Target Score</span>
                        <h1 className='header__score--data fw-bold mt-2 mb-0'>{!hasGameStarted ? '-' : gameSetScore}</h1>
                    </div>
                    <div className='bg-white p-1 lh-1 rounded'>
                        <span className='header__score--label text-uppercase'>Your Score</span>
                        <h1 className='header__score--data fw-bold mt-2 mb-0'>{!hasGameStarted ? '-' : score.yourScore}</h1>
                    </div>
                    <div className='bg-white p-1 lh-1 rounded'>
                        <span className='header__score--label text-uppercase'>Opponent Score</span>
                        <h1 className='header__score--data fw-bold mt-2 mb-0'>{!hasGameStarted ? '-' : score.computerScore}</h1>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header