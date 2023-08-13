import {currentUser, comments} from "../data/data.json"
import data from "../data/data.json"
import React, { useState, useEffect, createContext } from "react"
import { nanoid } from "nanoid"

export const CommentContext = createContext()

export default function CommentContextProvider({children}) {

    const [commentData, setCommentData] = useState(
      JSON.parse(localStorage.getItem("commentData")) || data)

    console.log(currentUser)
    console.log(comments)
      
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const decrementScore = (id) => {
      setCommentData(prevItems => ({
        ...prevItems,
        currentUser: {
          ...prevItems.currentUser,
          votedCommentIds: prevItems.currentUser.votedCommentIds ? 
            prevItems.currentUser.votedCommentIds.find(commentId => commentId === id) ?
            prevItems.currentUser.votedCommentIds.filter(commentId => commentId !== id)
            : prevItems.currentUser.votedCommentIds
            : []
        },
        
      }))

      setCommentData(prevItems => ({
        ...prevItems,
        comments: prevItems.comments.find(comment => comment.id === id) ?
          prevItems.comments.map(comment => comment.id === id ? 
            { 
              ...comment, 
              score: isCommentUpvoted(id) ? comment.score - 1 : comment.score
            } 
            : 
            comment)
          :
          prevItems.comments.map(comment => ({
            ...comment,
            replies: comment.replies.map(reply => reply.id === id ? 
              {
                ...reply, 
                score: isCommentUpvoted(id) ? reply.score - 1 : reply.score
              } 
              :
              reply)
        }))
      }))

    }

    const isCommentUpvoted = (id) => {
      if (commentData.currentUser.hasOwnProperty("votedCommentIds") && commentData.currentUser.votedCommentIds.find(commentId => commentId === id)) {
        return true
      }
      return false 
    }
    
    const incrementScore = (id) => {
      setCommentData(prevItems => ({
        ...prevItems,
        currentUser: {
          ...prevItems.currentUser,
          votedCommentIds: prevItems.currentUser.votedCommentIds ? 
            !prevItems.currentUser.votedCommentIds.find(commentId => commentId === id) ?
            [...prevItems.currentUser.votedCommentIds, id] 
            : prevItems.currentUser.votedCommentIds
            : [id]
        },
        
      }))

      setCommentData(prevItems => ({
        ...prevItems,
        comments: prevItems.comments.find(comment => comment.id === id) ?
          prevItems.comments.map(comment => comment.id === id ? 
            { 
              ...comment, 
              score: !isCommentUpvoted(id) ? comment.score + 1 : comment.score
            } 
            : 
            comment)
          :
          prevItems.comments.map(comment => ({
            ...comment,
            replies: comment.replies.map(reply => reply.id === id ? 
              {
                ...reply, 
                score: !isCommentUpvoted(id) ? reply.score + 1 : reply.score
              } 
              :
              reply)
        }))
      }))
      

    }

    const handleDeleteComment = (id) => {
        setCommentData(prevItems => ({
            ...prevItems,
            comments: prevItems.comments.find(comment => comment.id === id) ?
                prevItems.comments.filter(comment => comment.id !== id)
                :
                prevItems.comments.map(comment => ({
                    ...comment,
                    replies: comment.replies.filter(reply => reply.id !== id)
                }))
        }))
      }

      const handleEditComment = (e, id, replyingTo, modifiedContent) => {
        e.preventDefault()

        //if modifiedContent contains the @handle, slice it
        //else return as is
        let slicedModifiedContent = modifiedContent.includes(replyingTo) ? modifiedContent.slice(replyingTo.length + 1) : modifiedContent
        setCommentData(prevItems => ({
          ...prevItems,
          comments: prevItems.comments.find(comment => comment.id === id) ?
            prevItems.comments.map(comment => (
                comment.id === id ?
                { ...comment, content: slicedModifiedContent }
                : comment
            ))
            :
            prevItems.comments.map(comment => ({
              ...comment,
              replies: comment.replies.map(reply => (reply.id === id ?
                { ...reply, content: slicedModifiedContent, }
                : reply
              ))
            }))
        }))
      }

      const handleReply = (e, id, replyingTo, replyContent) =>  {
        e.preventDefault()
        setCommentData(prevItems => ({
          ...prevItems,
          //if id found in comments array, add reply to the replies array under comment object
          //else map comments array
            //map replies array
              //if id is found, add reply to the replies array under comment object
              //else return the original replies array
          comments: prevItems.comments.find(comment => comment.id === id) ? 
            prevItems.comments.map(comment => comment.id === id ? 
                {
                  ...comment,
                  replies: [...comment.replies, {
                    id: nanoid(),
                    content: replyContent.includes(replyingTo) ? replyContent.slice(replyingTo.length + 1) : replyContent,
                    createdAt: (new Date()).toString(),
                    score: 0,
                    replyingTo,
                    user: {
                      image: {
                        png: prevItems.currentUser.image.png,
                        webp: prevItems.currentUser.image.webp
                      },
                      username: prevItems.currentUser.username
                    }  
                  }]
                }
                :comment
            )
            :
            prevItems.comments.map(comment => ({
              ...comment,
              replies: comment.replies.find(reply => reply.id === id) ?
                [...comment.replies,
                {
                    id: nanoid(),
                    content: replyContent.includes(replyingTo) ? replyContent.slice(replyingTo.length + 1) : replyContent,
                    createdAt: (new Date()).toString(),
                    score: 0,
                    replyingTo,
                    user: {
                      image: {
                        png: prevItems.currentUser.image.png,
                        webp: prevItems.currentUser.image.webp
                      },
                      username: prevItems.currentUser.username
                    }  
                }]
                : comment.replies
            }))
        }))
      }

      const handleAddComment = (e, userComment) => {
            e.preventDefault()
            setCommentData(prevData => ({
                ...prevData,
                comments: [...prevData.comments, {
                    id: nanoid(),
                    content: userComment,
                    createdAt: (new Date()).toString(),
                    score: 0,
                    user: {
                        image: {
                            png: prevData.currentUser.image.png,
                            webp: prevData.currentUser.image.webp
                        },
                        username: prevData.currentUser.username
                    },
                    replies: []
                }]
            }))
      }
      
      useEffect(() => {
        //runs everytime changes are made which are triggered by the functions above
        localStorage.setItem("commentData", JSON.stringify(commentData))
      }, [commentData])

      useEffect(() => {
        function listenResize() {
          setScreenWidth(window.innerWidth)
        }

        window.addEventListener("resize", listenResize)

        return () => {
          window.removeEventListener("resize", listenResize)
        }
      }, [screenWidth])
      
      return (
        <CommentContext.Provider value={
          {
            screenWidth,
            commentData,
            handleAddComment, 
            handleDeleteComment, 
            handleEditComment, 
            handleReply,
            incrementScore,
            decrementScore
          }}>
            {children}
        </CommentContext.Provider>
      )
}