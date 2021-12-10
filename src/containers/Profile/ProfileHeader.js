import defaultAvatar from "assets/images/avatar_placeholder.png"

const ProfileHeader = ({ data, loading }) => {
  if (loading) return <p className="is-size-1">LOADING...</p>

  return (
    <section className="flex py-6 xl:py-10 px-6 xl:px-32 relative overflow-hidden mb-24">
      <div className="container mx-auto flex max-w-6xl">
        <div className="mr-6 w-32 h-32 rounded-full overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={data.avatar || defaultAvatar}
            alt={`${data.id} profile avatar`}
          />
        </div>
        <div className="mt-4">
          <h1 className="text-white bg-gray-900 inline-block capitalise py-1 px-2 lg:text-xl">
            {data.id}
          </h1>
          {data.bio && (
            <>
              <br />
              <h2 className="text-white bg-gray-900 inline-block py-1 px-2 text-sm lg:text-md mt-2 max-w-md">
                {data.bio}
              </h2>
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
