import IconRock from '../../assets/icon-rock.svg'
import { globalContext } from '../../context/GameContext'
import { EChoices } from '../../enums/EChoices'

const Rock: React.FC = () => {
    const { choice, selectedChoice } = globalContext()

    return (
        <button disabled={choice === '' ? false : true} className={`main__btn main__box--rock ${choice === '' ? 'position-absolute' : ''}`} onClick={() => selectedChoice(EChoices.ROCK)}>
            <img src={IconRock} alt="Icon for Rock" className='game-icon' />
        </button>
    )
}

export default Rock