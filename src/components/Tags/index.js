import Tag from "./Tag"

const Tags = ({ data }) => {
  return data.map((tag) => <Tag tag={tag} key={tag} />)
}

export default Tags
