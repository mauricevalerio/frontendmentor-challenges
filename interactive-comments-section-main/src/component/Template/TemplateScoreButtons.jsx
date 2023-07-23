import IconMinus from '../../assets/icon-minus.svg'
import IconPlus from '../../assets/icon-plus.svg'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useContext } from 'react'
import { CommentContext } from '../../context/CommentContext'

export default function TemplateScoreButtons({id, score}) {
    //id used for score
    const { incrementScore, decrementScore, screenWidth } = useContext(CommentContext)
    
    return (
        
        <ButtonGroup 
        aria-label="Button Score"
        vertical={screenWidth >= 768 ? true : false}
        className={`${screenWidth >= 768 ? "d-flex flex-column" : "" }`}
        >
            <Button
            variant="light"
            onClick={() => incrementScore(id)}
            >
                <img src={IconPlus} alt="Plus icon for adding score"/>
            </Button>

            <Button 
            variant="light"
            >
                {score}
            </Button>
            
            <Button 
            variant="light"
            onClick={() => decrementScore(id)}
            >
                <img src={IconMinus} alt="Dash icon for subtracting score"/>
            </Button>
        </ButtonGroup>

    )
}