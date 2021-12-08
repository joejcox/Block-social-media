import defaultAvatar from "assets/images/avatar_placeholder.png"

const ProfileHeader = ({ data, loading }) => {
  if (loading) return <p className="is-size-1">LOADING...</p>

  return (
    <section className="section profile-header">
      <div className="container">
        <div className="profile-image">
          <img
            src={data.avatar || defaultAvatar}
            alt={`${data.id} profile avatar`}
          />
        </div>
        <div className="profile-details">
          <h1 className="title is-3 has-backdrop capitalise">{data.id}</h1>
          {data.bio && (
            <>
              <br />
              <h2 className="subtitle is-6 has-backdrop">{data.bio}</h2>
            </>
          )}
        </div>
      </div>

      <div className="profile-background">
        {data.profileBg && (
          <img src={data.profileBg} alt={`${data.id}'s profile background'`} />
        )}
      </div>
    </section>
  )
}

export default ProfileHeader
