import Tag from "./Tag"

const Tags = ({ data }) => {
  if (!data) return null
  return data.map((tag) => <Tag tag={tag} key={tag} />)
}

export default Tags
