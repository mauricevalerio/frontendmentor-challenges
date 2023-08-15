import { TemplateContentProp } from '../../types/TTemplateTypes'

const TemplateContent: React.FC<TemplateContentProp> = ({ content, replyingTo }) => {
    return (
        <p className="mt-4 gray-text">
            {!(typeof replyingTo === 'undefined') &&
                <span className="fw-bold blue-text">
                    {`@${replyingTo}`}
                </span>
            }
            {' '}{content}
        </p>
    )
}

export default TemplateContent