import { useState, useEffect, useRef } from "react"
import Tags from "components/Tags"
import { useNavigate } from "react-router-dom"
import useFirestore from "hooks/useFirestore"
import Button from "components/Layout/Button"
import useAuth from "hooks/useAuth"

const EditPost = ({ initialState, editMode, editing, setIsEditing }) => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { updatePost } = useFirestore()
  const [state, setState] = useState({ ...initialState })
  const [error, setError] = useState(null)
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current.focus()
  }, [])

  const handleSubmit = async () => {
    const response = await updatePost(state)

    if (response.error) {
      return setError(response.error)
    }

    navigate(`/user/${state.author}/posts/${response}`)
    setIsEditing(!editing)
  }

  const handleChange = (e) => {
    setState({
      ...state,
      content: {
        ...state.content,
        [e.target.name]: e.target.value,
      },
    })
  }

  return (
    <section className="px-6 flex flex-col">
      <div className="container mx-auto max-w-2xl text-center">
        <header className="mb-8 relative pt-10">
          {currentUser !== null && state.author_id === currentUser.uid && (
            <span
              onClick={editMode}
              className="text-red-500 cursor-pointer absolute right-0 top-0"
            >
              {editing ? "Cancel" : "Edit Post"}
            </span>
          )}
          <input
            type="text"
            name="title"
            className="border border-gray-200 rounded-xl px-6 py-2 w-full outline-white"
            onChange={handleChange}
            value={state.content.title}
            ref={titleRef}
          />
          {error && (
            <span className="text-red-500 text-xs pl-2 block mt-2 text-left">
              {error}
            </span>
          )}
          <div className="tags mt-8">
            <Tags data={state.tags} />
          </div>
        </header>
      </div>
      <div className="container mx-auto max-w-2xl">
        <textarea
          onChange={handleChange}
          name="body"
          value={state.content.body}
          className="border border-gray-200 rounded-xl w-full p-8 text-gray-700 mb-6 outline-white"
          rows="8"
        ></textarea>
        <Button click={handleSubmit}>Update Post</Button>
      </div>
    </section>
  )
}

export default EditPost
