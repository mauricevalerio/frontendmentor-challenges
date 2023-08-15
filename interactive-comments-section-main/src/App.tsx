import Template from './component/Template/Template'
import { globalContext } from './context/CommentContext'
import CommentForm from './component/CommentForm'

const App: React.FC = () => {
  const { commentData } = globalContext()

  const commentsElements = commentData.map(comment =>
    <Template
      key={comment.id}
      {...comment} />
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

export default App