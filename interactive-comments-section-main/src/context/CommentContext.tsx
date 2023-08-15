import { currentUser, comments } from '../data/data.json'
import { useState, useEffect, createContext, useContext } from 'react'
import { nanoid } from 'nanoid'
import { ContextProviderProps, CommentContextDefaultType } from '../types/TCommentContext'
import { Comment } from '../types/TComments'
import { User } from '../types/TUser'

export const CommentContext = createContext<CommentContextDefaultType>({
  commentData: comments,
  currentUserData: { ...currentUser, upVotedIds: [], downVotedIds: [] },
  setCommentData: () => [],
  screenWidth: window.innerWidth,
  upVote: () => { },
  downVote: () => { },
  handleAddComment: () => { },
  handleDeleteComment: () => { },
  handleReply: () => { },
  handleEditComment: () => { }
})

export const globalContext = () => useContext(CommentContext)

const CommentContextProvider: React.FC<ContextProviderProps> = ({ children }) => {

  const [commentData, setCommentData] = useState<Comment[]>(
    JSON.parse(localStorage.getItem('commentData') || JSON.stringify(comments)))

  const [currentUserData, setCurrentUserData] = useState<User>(
    JSON.parse(localStorage.getItem('currentUser') || JSON.stringify({ ...currentUser, upVotedIds: [], downVotedIds: [] })))

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const upVote = (id: number | string) => {
    setCurrentUserData(prevUser => ({
      ...prevUser,
      upVotedIds: prevUser.upVotedIds.find(upVotedId => upVotedId === id) ?
        prevUser.upVotedIds.filter(upVotedId => upVotedId !== id)
        : [...prevUser.upVotedIds, id]
      ,
      downVotedIds: prevUser.downVotedIds.find(downVotedId => downVotedId === id) ?
        prevUser.downVotedIds.filter(downVotedId => downVotedId !== id)
        : prevUser.downVotedIds
    }))

  }

  const downVote = (id: number | string) => {
    setCurrentUserData(prevUser => ({
      ...prevUser,
      upVotedIds: prevUser.upVotedIds.find(upVotedId => upVotedId === id) ?
        prevUser.upVotedIds.filter(upVotedId => upVotedId !== id)
        : prevUser.upVotedIds,
      downVotedIds: prevUser.downVotedIds.find(downVotedId => downVotedId === id) ?
        prevUser.downVotedIds.filter(downVotedId => downVotedId !== id)
        : [...prevUser.downVotedIds, id]
    }))
  }

  const handleAddComment = (userComment: string) => {
    setCommentData(prevComments => (
      [...prevComments, {
        id: nanoid(),
        content: userComment,
        createdAt: (new Date()).toString(),
        score: 0,
        user: {
          image: {
            png: currentUserData.image.png,
            webp: currentUserData.image.webp
          },
          username: currentUserData.username
        },
        replies: []
      }]
    ))
  }

  const handleDeleteComment = (id: number | string) => {
    setCommentData(prevComments => (
      prevComments.find(comment => comment.id === id) ?
        prevComments.filter(comment => comment.id !== id)
        :
        prevComments.map(comment => ({
          ...comment,
          replies: comment.replies?.filter(reply => reply.id !== id)
        }))
    ))
  }

  const handleReply = (id: number | string | undefined, username: string | undefined, replyText: string) => {
    setCommentData(prevComments => (
      prevComments.find(comment => comment.id === id) ?
        prevComments.map(comment => comment.id === id ?
          {
            ...comment,
            replies: !(typeof comment.replies === 'undefined') ? [...comment.replies, {
              id: nanoid(),
              content: !(typeof username === 'undefined') ? replyText.slice(username?.length + 1) : replyText,
              createdAt: (new Date()).toString(),
              score: 0,
              replyingTo: username,
              user: {
                image: {
                  png: currentUserData.image.png,
                  webp: currentUserData.image.webp
                },
                username: currentUserData.username
              }
            }]
              :
              undefined
          }
          : comment
        )
        :
        prevComments.map(comment => ({
          ...comment,
          replies: comment.replies?.find(reply => reply.id === id) ?
            [...comment.replies,
            {
              id: nanoid(),
              content: !(typeof username === 'undefined') ? replyText.slice(username?.length + 1) : replyText,
              createdAt: (new Date()).toString(),
              score: 0,
              replyingTo: username,
              user: {
                image: {
                  png: currentUserData.image.png,
                  webp: currentUserData.image.webp
                },
                username: currentUserData.username
              }
            }]
            : comment.replies
        }))
    ))
  }

  const handleEditComment = (id: number | string, replyingTo: string, modifiedContent: string) => {

    let slicedModifiedContent = modifiedContent.slice(replyingTo.length + 1)
    setCommentData(prevComments => (
      prevComments.find(comment => comment.id === id) ?
        prevComments.map(comment => (
          comment.id === id ?
            { ...comment, content: slicedModifiedContent }
            : comment
        ))
        :
        prevComments.map(comment => ({
          ...comment,
          replies: comment.replies?.map(reply => (reply.id === id ?
            { ...reply, content: slicedModifiedContent, }
            : reply
          ))
        }))
    ))
  }


  useEffect(() => {
    //runs everytime changes are made which are triggered by the functions above
    localStorage.setItem('commentData', JSON.stringify(commentData))
    localStorage.setItem('currentUser', JSON.stringify(currentUserData))
  }, [commentData, currentUserData])

  useEffect(() => {
    const resize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', resize)

    return () => { window.removeEventListener('resize', resize) }
  }, [screenWidth])

  return (
    <CommentContext.Provider value={{
      commentData,
      setCommentData,
      currentUserData,
      screenWidth,
      upVote,
      downVote,
      handleAddComment,
      handleDeleteComment,
      handleReply,
      handleEditComment
    }}>
      {children}
    </CommentContext.Provider>
  )
}

export default CommentContextProvider