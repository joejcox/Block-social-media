import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "lib/firebase"

export const addComment = async (commentData, currentCommentCount) => {
  try {
    await addDoc(collection(db, "comments"), {
      ...commentData,
      date: new Date(),
    })

    await updateCommentCount(commentData.parent_id, currentCommentCount)
  } catch (error) {
    console.log(`Error in addComment function: ${error}`)
  }
}

export const updateCommentCount = async (post_id, currentCommentCount) => {
  const count = currentCommentCount + 1

  try {
    const postRef = doc(db, "posts", post_id)
    const postSnap = await getDoc(postRef)

    if (postSnap.exists()) {
      updateDoc(postRef, {
        comment_count: count,
      })
    }
  } catch (error) {
    console.log(`Error in updateCommentCount function: ${error}`)
  }
}
