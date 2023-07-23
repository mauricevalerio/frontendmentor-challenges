import { useState, useContext } from 'react'
import { CommentContext } from '../../context/CommentContext'
import TemplateHeader from './TemplateHeader'
import TemplateContent from './TemplateContent'
import TemplateActionButtons from './TemplateActionButtons'
import TemplateScoreButtons from './TemplateScoreButtons'
import AddCommentForm from '../CommentForm'

export default function Template({ data: { id, content, createdAt, score, user, replyingTo }, children }) {
    const { commentData: { currentUser }, screenWidth } = useContext(CommentContext)

    const [isReplyToggled, setIsReplyToggled] = useState(false)
    const [isEditToggled, setIsEditToggled] = useState(false)
    
    const isCurrentUser = () => currentUser.username === user.username
    
    const templateHeader = <div className="d-flex align-items-center gap-3">
        <TemplateHeader 
        user={user}
        createdAt={createdAt}
        isCurrentUser={isCurrentUser}
        />
        {
            screenWidth >= 768 ?
            <div className="ms-auto">
                <TemplateActionButtons 
                id={id}
                isCurrentUser={isCurrentUser}
                setIsReplyToggled={setIsReplyToggled}
                setIsEditToggled={setIsEditToggled}/>
            </div>
            : null
        }
    </div>

    return (
        <section>
            {/* Indents if its a reply to a comment */}
            {/* If edit is toggled then hide the current comment/reply */}
            {!isEditToggled &&
                
                <div className={`bg-white ${replyingTo ? "ms-4 mb-2" : ""}`}>
    
                    <div className={`mb-2 p-2 ${screenWidth >= 768 ? "d-flex gap-2" : ""}`}>
                        {screenWidth >= 768 ?
                            <div>
                                <TemplateScoreButtons id={id} score={score} />
                            </div>
                        : 
                            null}

                        <div className='flex-grow-1'>
                            {templateHeader}

                            <TemplateContent content={content} replyingTo={replyingTo} />
                        
                            {screenWidth <= 768 ?
                                <div className="d-flex justify-content-between align-items-center">
                                    <TemplateScoreButtons id={id} score={score} />

                                    <TemplateActionButtons 
                                    id={id}
                                    isCurrentUser={isCurrentUser}
                                    setIsReplyToggled={setIsReplyToggled}
                                    setIsEditToggled={setIsEditToggled}/>
                                </div>
                            : null}
                        </div>
                    </div> 
                </div>
            }

            {
            // each comment/reply handles its own reply toggle
            //indents when replyingTo is not undefined
                isReplyToggled && 
                <div className={`bg-white ${replyingTo ? "ms-4 mb-2" : ""}`}>
                <AddCommentForm 
                id={id}
                replyingTo={user.username}
                isReplyToggled={isReplyToggled}
                setIsReplyToggled={setIsReplyToggled}
                />
                </div> 
            }

            {
                isEditToggled &&
                <div className={`bg-white ${replyingTo ? "ms-4 mb-2" : ""}`}>
                        <div className={`mb-2 p-2 ${screenWidth >= 768 ? "d-flex gap-2" : ""}`}>
                        {screenWidth >= 768 ?
                            <div>
                                <TemplateScoreButtons id={id} score={score} />
                            </div>
                            : 
                            null
                        }

                        <div className="flex-grow-1">
                        {templateHeader}
                        
                        <AddCommentForm 
                        id={id}
                        replyingTo={replyingTo}
                        isEditToggled={isEditToggled}
                        setIsEditToggled={setIsEditToggled}/>
                        </div>
                    </div>
                </div> 
            }

            {children ?
                <div className="replies">
                    {children}
                </div>
                :
                null
            }
        
        </section>
    )
}