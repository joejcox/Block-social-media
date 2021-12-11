const CommentsList = ({ children, comments_count }) => {
  return (
    <section className="px-6 pb-10 flex">
      <div className="container max-w-4xl mx-auto">
        <h4 className="text-lg text-purple-700 mb-8">
          Comments ({comments_count})
        </h4>
        <div className="comments-list">
          {comments_count > 0 ? (
            children
          ) : (
            <h3 className="title is-4">No comments yet</h3>
          )}
        </div>
      </div>
    </section>
  )
}

export default CommentsList
