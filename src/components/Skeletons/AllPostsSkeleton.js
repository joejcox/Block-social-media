import PostPreviewSkeleton from "components/Skeletons/PostPreviewSkeleton"

const AllPostsSkeleton = () => (
  <section className="section posts">
    <div className="container">
      <span className="title is-1 skeleton"></span>
      <div className="posts-list">
        <PostPreviewSkeleton num={3} />
      </div>
    </div>
  </section>
)

export default AllPostsSkeleton
