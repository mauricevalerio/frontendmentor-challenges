import IconPaper from '../../assets/icon-paper.svg'
import { globalContext } from '../../context/GameContext'
import { EChoices } from '../../enums/EChoices'

const Paper: React.FC = () => {
    const { choice, selectedChoice } = globalContext()

    return (
        <button disabled={choice === '' ? false : true} className={`main__btn main__box--paper ${choice === '' ? 'position-absolute' : ''}`} onClick={() => selectedChoice(EChoices.PAPER)}>
            <img src={IconPaper} alt="Icon for Paper" className='game-icon' />
        </button>
    )
}

export default Paper