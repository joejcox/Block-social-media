// import { useState, useEffect } from 'react'
// import { db } from 'lib/firebase'
// import { collection, getDocs, query, where } from 'firebase/firestore'

// const usePosts = (type, useQuery, useWhere, condition, match, limit ) => {
//     const [data, setData] = useState(type, useQuery, useWhere, condition, match, limit)
//     // const [data, setData] = useState({
//     //     type: "user",
//     //     query: {
//     //         useQuery: true,
//     //         where: "author",
//     //         condition: "==",
//     //         match: "user",
//     //         limit: true,
//     //     }
//     // })
//     // initialState should have a user property, type and query properties
//     // user gives the user data
//     // type gives whether it's "user" posts or "all" posts
//     // query is an object with { isQuery: boolean, limit: boolean }

//     useEffect(() => {
//         const getPosts = async () => {
//             if (!data.type || !data.query) return null

//             if (data.type === "user") {
//                 let postsSnap
//                 const postsRef = collection(db, "posts")
//                 data.query.isQuery && data.query.limit ?
//                     postsSnap = query(postsRef, where(data.query.where, data.query.condition, data.query.match))
//             }
//         }

//         getPosts()

//     }, [initialState])

//     // useEffect(() => {
//     //     if (initialState.type === "all")
//     // })

// }

// export default usePosts
