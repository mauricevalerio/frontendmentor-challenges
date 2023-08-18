import { globalContext } from '../context/GameContext'

const Header: React.FC = () => {

    const { score, hasGameStarted, gameSetScore } = globalContext()

    return (
        <header className='header'>
            <div className='border border-light-secondary-subtle rounded px-2 py-3 d-flex justify-content-between align-items-center'>
                <div>
                    <h3 className='lh-1 m-0 text-uppercase'>Rock</h3>
                    <h3 className='lh-1 m-0 text-uppercase'>Paper</h3>
                    <h3 className='lh-1 m-0 text-uppercase'>Scissors</h3>
                </div>

                <div className='d-flex gap-1 flex-column text-center w-100'>
                    <h2 className='text-uppercase m-0 align-self-end'>Scores</h2>
                    <div className='d-flex justify-content-end gap-1 align-self-end w-100'>
                        <div className='header__score--box bg-white p-1 lh-1 rounded'>
                            <span className='header__score--label text-uppercase'>Target</span>
                            <h3 className='header__score--data fw-bold mt-2 mb-0'>{!hasGameStarted ? '-' : gameSetScore}</h3>
                        </div>
                        <div className='header__score--box bg-white p-1 lh-1 rounded'>
                            <span className='header__score--label text-uppercase'>You</span>
                            <h3 className='header__score--data fw-bold mt-2 mb-0'>{!hasGameStarted ? '-' : score.yourScore}</h3>
                        </div>
                        <div className='header__score--box bg-white p-1 lh-1 rounded'>
                            <span className='header__score--label text-uppercase'>Opponent</span>
                            <h3 className='header__score--data fw-bold mt-2 mb-0'>{!hasGameStarted ? '-' : score.computerScore}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header