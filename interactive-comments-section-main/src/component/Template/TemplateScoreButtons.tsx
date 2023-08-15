import IconPlus from '../../assets/icon-plus.svg'
import IconMinus from '../../assets/icon-minus.svg'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { globalContext } from '../../context/CommentContext'
import { TemplateScoreBtnProp } from '../../types/TTemplateTypes'

const TemplateScoreButtons: React.FC<TemplateScoreBtnProp> = ({ id, score }) => {
    const { screenWidth, currentUserData, upVote, downVote } = globalContext()

    return (

        <ButtonGroup
            aria-label='Button Score'
            vertical={screenWidth >= 1024 ? true : false}
            className={`${screenWidth >= 1024 ? 'd-inline-flex flex-column' : ''}`}
        >
            <Button
                variant={`${currentUserData.upVotedIds.some(upVotedId => upVotedId === id) ? 'success' : 'light'}`}
                onClick={() => upVote(id)}
            >
                <img src={IconPlus} alt='Plus icon for adding score' />
            </Button>

            <Button disabled={true} variant='light'>
                {
                    currentUserData.upVotedIds.find(upVotedId => upVotedId === id) ?
                        score + 1
                        :
                        currentUserData.downVotedIds.find(downVotedId => downVotedId === id) ?
                            score === 0 ? score : score - 1
                            : score
                }
            </Button>

            <Button
                disabled={score === 0 ? true : false}
                variant={`${currentUserData.downVotedIds.some(downVotedId => downVotedId === id) ? 'danger' : 'light'}`}
                onClick={() => downVote(id)}
            >
                <img src={IconMinus} alt='Dash icon for subtracting score' />
            </Button>
        </ButtonGroup>

    )
}

export default TemplateScoreButtons