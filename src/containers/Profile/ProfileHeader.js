import defaultAvatar from "assets/images/avatar_placeholder.png"

const ProfileHeader = ({ avatar, username, bio, profileBg, loading }) => {
  if (loading) return <p className="is-size-1">LOADING...</p>

  return (
    <section className="flex py-6 xl:py-10 px-6 xl:px-32 relative overflow-hidden mb-6">
      <div className="container mx-auto flex max-w-6xl z-50">
        <div className="mr-6 w-32 h-32 rounded-full overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={avatar || defaultAvatar}
            alt={`${username} profile avatar`}
          />
        </div>
        <div className="mt-4">
          <h1 className="text-white bg-gray-900 inline-block py-1 px-2 lg:text-xl">
            {username}
          </h1>
          {bio && (
            <>
              <br />
              <h2 className="text-white bg-gray-900 inline-block py-1 px-2 text-sm lg:text-md mt-2 max-w-md">
                {bio}
              </h2>
            </>
          )}
        </div>
      </div>

      <div className="bg-hero-pattern absolute top-0 left-0 right-0 bottom-0 z-10">
        {profileBg && (
          <img src={profileBg} alt={`${username}'s profile background'`} />
        )}
      </div>
    </section>
  )
}

export default ProfileHeader
