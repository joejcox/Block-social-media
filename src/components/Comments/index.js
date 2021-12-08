import { useState, useEffect } from "react"
import { useForm, useFormState } from "react-hook-form"
import useAuth from "hooks/useAuth"
import useFirestore from "hooks/useFirestore"
import { v4 as uuidv4 } from "uuid"
import {
  getDocs,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore"
import { db } from "lib/firebase"
import defaultAvatar from "assets/images/avatar_placeholder.png"
import Comment from "./Comment"

const Comments = ({ collection_id, post_id, post_author, comment_count }) => {
  const { currentUser } = useAuth()
  const [userData, setuserData] = useState(null)
  const { addComment } = useFirestore()
  const [charCount, setCharCount] = useState(0)
  const [comments, setComments] = useState(null)
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const getUser = async () => {
      if (!currentUser) return null
      const querySnapshot = await getDocs(collection(db, "users"))
      querySnapshot.forEach(
        (doc) =>
          doc.data().uid === currentUser.uid &&
          setuserData({
            username: doc.id,
            avatar: doc.data().avatar,
          })
      )
    }

    getUser()
  }, [currentUser])

  useEffect(() => {
    const commentsRef = collection(db, "comments")
    const orderedComments = query(commentsRef, orderBy("date", "desc"))
    const unsubscribe = onSnapshot(
      orderedComments,
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

        setComments(commentsArray, collection_id, comment_count)
      },
      (error) => {
        console.log(error)
      }
    )

    return () => unsubscribe()
  }, [post_id, collection_id, comment_count])

  const onSubmit = async (data) => {
    const commentData = {
      author: userData.username,
      content: data.content,
      id: uuidv4(),
      parent_id: post_id,
      reply_to: post_author,
    }
    await addComment(commentData, collection_id, comment_count)
      .then(() => {
        setCharCount(0)
        resetField("content")
      })
      .catch((error) => console.log(error))
  }

  const { isSubmitting } = useFormState({ control })

  if (!userData) return null

  return (
    <>
      {currentUser && (
        <section className="comment-box" id="comments">
          <div className="container">
            <h3 className="title is-3">Add Comment</h3>
            <article className="media">
              <figure className="media-left comment-avatar">
                <p className="image is-64x64">
                  <img
                    src={userData.avatar || defaultAvatar}
                    alt={userData.username}
                  />
                </p>
              </figure>
              <form
                className="add-comment media-content"
                onSubmit={(e) => e.preventDefault()}
                autoComplete="off"
              >
                <div className="field">
                  <input
                    className="input rounded"
                    type="text"
                    {...register("content", {
                      required: {
                        value: true,
                        message: "Comment can not be blank",
                      },
                      maxLength: {
                        value: 2000,
                        message: "Comment must be less than 2000 characters",
                      },
                    })}
                    onChange={(e) => {
                      console.log("changed")
                      setCharCount(e.target.value.length)
                    }}
                  />
                  <div className="character-count">
                    <span
                      className={`is-size-7 ${
                        charCount > 1980 && "has-text-danger"
                      }`}
                    >
                      {charCount}/2000
                    </span>
                  </div>
                  {errors.content && (
                    <span className="is-block has-text-danger is-size-7">
                      {errors.content.message}
                    </span>
                  )}
                </div>
                <input
                  type="submit"
                  className="button is-info"
                  value={isSubmitting ? "Adding Comment..." : "Add Comment"}
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                />
              </form>
            </article>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container">
          <h4 className="title is-4">
            Comments ({comments && comments.length})
          </h4>
          <div className="comments-list">
            {comments ? (
              comments.map((comment) => (
                <Comment comment={comment} username={userData.username} />
              ))
            ) : (
              <h3 className="title is-4">No comments yet</h3>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Comments
