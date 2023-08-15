import { useState } from 'react'
import TemplateHeader from './TemplateHeader'
import TemplateContent from './TemplateContent'
import TemplateActionButtons from './TemplateActionButtons'
import TemplateScoreButtons from './TemplateScoreButtons'
import CommentForm from '../CommentForm'
import { Comment } from '../../types/TComments'
import EditForm from '../EditForm'
import { globalContext } from '../../context/CommentContext'

const Template: React.FC<Comment> = ({ id, content, createdAt, score, user, replies, replyingTo }) => {

    const { screenWidth } = globalContext()
    const [toggleReply, setToggleReply] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)
    const handleToggleEdit = () => { setToggleEdit(prevState => !prevState) }
    const handleToggleReply = () => { setToggleReply(prevState => !prevState) }

    return (
        <>
            <div className={`${screenWidth > 1024 ? 'grid-container' : ''}  bg-white mb-2 py-3 px-2 rounded`}>

                <div className={`header d-inline-flex align-items-center flex-wrap gap-3`}>
                    <TemplateHeader user={user} createdAt={createdAt} />
                </div>

                <div className='content'>
                    {toggleEdit ?
                        <EditForm
                            id={id}
                            replyingTo={replyingTo || user.username}
                            content={content}
                            handleToggleEdit={handleToggleEdit}
                        />
                        :
                        <TemplateContent content={content} replyingTo={replyingTo} />
                    }
                </div>

                <div className='score d-inline-block'>
                    <TemplateScoreButtons id={id} score={score} />
                </div>

                <div className='action d-inline-block ms-auto float-end'>
                    <TemplateActionButtons
                        id={id}
                        username={user.username}
                        handleToggleEdit={handleToggleEdit}
                        handleToggleReply={handleToggleReply}
                    />
                </div>

            </div>

            {toggleReply ?
                <CommentForm
                    id={id}
                    username={user.username}
                    toggleReply={toggleReply}
                    handleToggleReply={handleToggleReply}
                /> : null}

            {!(typeof replies === 'undefined') &&
                replies.length > 0 ?
                <div className='replies'>
                    {replies?.map(reply => <div key={reply.id} className='ms-4 mb-2'>
                        <Template {...reply} />
                    </div>)}
                </div>
                : null}

        </>
    )
}

export default Template