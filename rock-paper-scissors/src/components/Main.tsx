import BgTriangle from '../assets/bg-triangle.svg'
import IconPaper from '../assets/icon-paper.svg'
import IconScissors from '../assets/icon-scissors.svg'
import IconRock from '../assets/icon-rock.svg'

const Main: React.FC = () => {
    return (
        <main className='main'>
            <img src={BgTriangle} alt="Triangle Background" className='main__triangle--icon' />

            <button className='main__box--paper'>
                <img src={IconPaper} alt="Icon for Paper" className='main__paper--icon' />
            </button>

            <button className='main__box--scissors'>
                <img src={IconScissors} alt="Icon for Scissors" className='main__scissors--icon' />
            </button>

            <button className='main__box--rock'>
                <img src={IconRock} alt="Icon for Rock" className='main__rock--icon' />
            </button>


        </main>
    )
}

export default Main