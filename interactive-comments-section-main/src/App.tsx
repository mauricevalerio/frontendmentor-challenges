import CommentForm from './component/CommentForm'
import Template from './component/Template/Template'
import { CommentContext } from './context/CommentContext'
import { useContext } from 'react'

export default function App() {
  const { commentData, setCommentData } = useContext(CommentContext)

  const commentsElements = commentData.comments.map(comment =>
    <Template
      key={comment.id}
      data={comment}
      modifyItem={setCommentData}>
      {
        comment.replies.length > 0 ?
          comment.replies.map(reply => (
            <Template
              key={reply.id}
              data={reply}
              modifyItem={setCommentData} />))
          : null
      }
    </Template>
  )

  return (
    <div>
      <div className="container py-2 padding-container max-width">
        {commentsElements}
        <CommentForm />
      </div>
    </div>
  )
}