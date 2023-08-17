import IconScissors from '../../assets/icon-scissors.svg'
import { globalContext } from '../../context/GameContext'
import { EChoices } from '../../enums/EChoices'

const Scissors: React.FC = () => {
    const { choice, selectedChoice } = globalContext()

    return (
        <button disabled={choice === '' ? false : true} className={`main__btn main__box--scissors ${choice === '' ? 'position-absolute' : ''}`} onClick={() => selectedChoice(EChoices.SCISSORS)}>
            <img src={IconScissors} alt="Icon for Scissors" className='game-icon' />
        </button>
    )
}

export default Scissors