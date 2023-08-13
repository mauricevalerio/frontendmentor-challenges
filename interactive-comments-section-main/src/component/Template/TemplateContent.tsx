export default function TemplateContent({content, replyingTo}) {
    return (
        <p className="mt-4 gray-text">
            {replyingTo 
            && 
            <span
            className="fw-bold blue-text"
            >{`@${replyingTo}`}</span>} {content}
        </p>
    )
}