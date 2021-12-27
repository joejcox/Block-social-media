import { useState, useEffect } from "react"
import useFirestore from "hooks/useFirestore"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "lib/firebase"
import Comment from "./Comment"
import CommentsList from "./CommentsList"
import CommentForm from "./CommentForm"

const Comments = ({ author_id, post_id, post_author }) => {
  const { userData } = useFirestore()
  const [comments, setComments] = useState(null)

  useEffect(() => {
    const commentsRef = query(
      collection(db, "comments"),
      orderBy("date", "desc")
    )

    const unsubscribe = onSnapshot(
      commentsRef,
      (docs) => {
        let commentsArray = []

        docs.forEach((comment) => {
          const data = comment.data()
          if (data.parent_id === post_id) {
            commentsArray.push({
              ...data,
            })
          }
        })

        setComments(commentsArray)
      },
      (error) => {
        console.log(error)
      }
    )

    return () => unsubscribe()
  }, [post_id])

  return (
    <div className="px-6">
      {userData && (
        <CommentForm
          author_id={author_id}
          post_id={post_id}
          post_author={post_author}
          comment_count={comments ? comments.length : 0}
        />
      )}
      <CommentsList comments_count={comments ? comments.length : 0}>
        {comments &&
          comments.map((comment, index) => (
            <Comment comment={comment} key={`${comment.author}-${index}`} />
          ))}
      </CommentsList>
    </div>
  )
}

export default Comments
