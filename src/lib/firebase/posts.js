import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "lib/firebase"
import { userData } from "hooks/useFirestore"
import { cleanUpTitle } from "lib/utils"

// for use in create post and update post. It will check if a post title already exists within users posts titles
export const checkIfUserHasPostWithSameTitle = async (author_id, title) => {
  try {
    const postsRef = collection(db, "posts")
    const postsQuery = query(postsRef, where("author_id", "==", author_id))
    const postsSnap = await getDocs(postsQuery)
    let postsList = []
    postsSnap.forEach((post) => {
      const lowercase_post_title = post
        .data()
        .content.title.toLowerCase()
        .trim()
      if (lowercase_post_title === title.toLowerCase().trim()) {
        postsList.push(post.data().content.title)
      }
    })

    if (postsList.length > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return error
  }
}

export const createPost = async (body, image, title, id, tags, uid) => {
  const { cleanedTitle, formattedSlug } = cleanUpTitle(title)

  const titleExists = await checkIfUserHasPostWithSameTitle(uid, cleanedTitle)

  if (titleExists) return { error: "A post with this title already exists" }

  try {
    await addDoc(collection(db, "posts"), {
      author: userData.username,
      author_id: userData.uid,
      comment_count: 0,
      content: {
        body: body,
        image: image,
        title: title,
      },
      date: new Date(),
      id: id,
      slug: formattedSlug,
      tags: tags,
    })

    return formattedSlug
  } catch (error) {
    return error
  }
}

export const updatePost = async ({
  author,
  author_id,
  post_ref,
  content,
  tags,
}) => {
  const { cleanedTitle, formattedSlug } = cleanUpTitle(content.title)

  const titleExists = await checkIfUserHasPostWithSameTitle(
    author_id,
    cleanedTitle
  )

  if (titleExists)
    return {
      error: "A post with this title already exists, please use another title",
    }

  try {
    const docRef = doc(db, "posts", post_ref)

    await updateDoc(docRef, {
      content: {
        body: content.body,
        title: content.title,
      },
      slug: formattedSlug,
      edited: new Date(),
      tags: tags,
    })
    return formattedSlug
  } catch (error) {
    return { error: error }
  }
}

export const deletePost = async (id) => {
  try {
    await deleteDoc(doc(db, "posts", id))
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
