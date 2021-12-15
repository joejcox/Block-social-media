// import { useState, useEffect } from "react"
// import { updateDoc, doc } from "firebase/firestore"
// import { db } from "lib/firebase"
// import { convertToSlug, replaceEmoji } from "lib/utils"

// const useEditor = (initialState) => {
//   const [editorIsActive, setEditorIsActive] = useState(false) // check if editor has been activated
//   const [editorContent, setEditorContent] = useState() // update the content in state

//   useEffect(() => {
//     setEditorContent(initialState)
//   }, [initialState])

//   if (!editorContent) return null

//   const openEditor = () => setEditorIsActive(true)

//   const closeEditor = () => setEditorIsActive(false)

//   const updateDocument = async () => {
//     console.log(editorContent)
//     try {
//       const docRef = doc(db, "posts", editorContent.post_ref)

//       const emojiFreeTitle = await replaceEmoji(editorContent.title)
//       const slug = await convertToSlug(emojiFreeTitle)

//       await updateDoc(docRef, {
//         content: {
//           body: editorContent.body,
//           title: editorContent.title,
//         },
//         slug: slug.trim(),
//         edited: new Date(),
//         tags: editorContent.tags,
//       })
//       //   pull content from state and function params
//       //   setNewSlug(slug)
//       return true
//     } catch (error) {
//       console.log(error)
//       return false
//     }
//   }

//   const handleChange = (e) => {
//     console.log(initialState)
//     setEditorContent({
//       ...editorContent,
//       [e.target.name]: e.target.value,
//     })
//   }

//   return {
//     editorIsActive,
//     openEditor,
//     closeEditor,
//     updateDocument,
//     editorContent,
//     handleChange,
//   }
// }

// export default useEditor
