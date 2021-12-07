// pull in url params since we always put just the username at the end of the URL
// check firestore that a collection exists with said username
// get matched user's data
// show default avatar image if avatar data is === ""
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { db } from "lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import UserPosts from "components/Posts/UserPosts"
import ProfileSkeleton from "components/Skeletons/ProfileSkeleton"
import ProfileHeader from "containers/Profile/ProfileHeader"
import SiteTitle from "components/SiteTitle"

const Profile = () => {
  const { user } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ username: null, data: null })

  useEffect(() => {
    const getUser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"))
      querySnapshot.forEach((doc) => {
        doc.id === user && setData({ username: doc.id, data: doc.data() })
      })

      setLoading(false)
    }

    getUser()
  }, [user])

  if (loading) {
    return <ProfileSkeleton />
  }

  if (!data.data) {
    return (
      <>
        <SiteTitle title="No user exists | Block." />
        <h1 className="title is-1">No user exists</h1>
      </>
    )
  }

  return (
    <div className="profile">
      <SiteTitle title={`${data.username} | Block.'`} />
      <ProfileHeader data={data} loading={loading} />
      <section className="section posts">
        <div className="container">
          <UserPosts author={data.username} />
        </div>
      </section>
    </div>
  )
}

export default Profile
