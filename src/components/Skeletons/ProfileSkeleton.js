import PostPreviewSkeleton from "./PostPreviewSkeleton"
import defaultAvatar from "assets/images/avatar_placeholder.png"

const ProfileSkeleton = () => {
  return (
    <>
      <section className="section profile-header skeleton">
        <div className="container">
          <div className="profile-image skeleton">
            <img src={defaultAvatar} alt={`default profile avatar`} />
          </div>
          <div className="profile-details skeleton">
            <span></span>
            <span></span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="posts-list">
            <PostPreviewSkeleton num={3} />
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfileSkeleton
