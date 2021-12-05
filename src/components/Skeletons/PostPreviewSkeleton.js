const PostPreviewSkeleton = ({ num = 1 }) => {
  const structure = []

  for (let i = 1; i <= num; i++) {
    structure.push(
      <article className="post-preview" key={i}>
        <header className="post-header">
          <span className="title is-3 skeleton"></span>
          <div className="tags skeleton">
            <span className="tag"></span>
            <span className="tag"></span>
            <span className="tag"></span>
          </div>
        </header>
        <p className="post-excerpt skeleton">
          <span></span>
          <span></span>
        </p>
        <footer className="post-footer skeleton">
          <span></span>
        </footer>
      </article>
    )
  }

  return structure
}

export default PostPreviewSkeleton
