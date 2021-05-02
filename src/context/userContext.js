import { Box } from '@material-ui/core'
import Loading from 'components/common/Loading'
import React, { createContext, useEffect, useState } from 'react'
import { auth, firestore, getImageUrl } from 'utils/firebaseUtil'
import { getLikePostAndCommentList } from 'utils/actionUtil'
import { isInNotification } from 'utils/getTime'

export const UserContext = createContext(null)

export const UserProvider = (props) => {
  const [user, setUser] = useState(null)
  const [authPending, setAuthPending] = useState(true)
  const [likeCommentId, setLikeCommentId] = useState([])
  const [likePostId, setLikePostId] = useState([])
  const [followingList, setFollowingList] = useState([])
  const [notificationList, setNotificationList] = useState([])
  const [isNewPost, setNewPost] = useState(false)

  useEffect(() => {
    return auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth !== null) {
        const data = (await getLikePostAndCommentList(userAuth.uid)).data()
        const followingData = (
          await firestore.collection('users').doc(userAuth.uid).get()
        ).data().following
        const url = await getImageUrl(userAuth.uid)
        const likePostId = data.post
        const likeCommentId = data.comment

        setUser({
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          profileUrl: url,
        })
        setLikePostId(likePostId)
        setLikeCommentId(likeCommentId)
        setFollowingList(followingData)
      } else {
        setUser(null)
        setLikePostId([])
        setLikeCommentId([])
        setFollowingList([])
      }
      setAuthPending(false)
    })
  }, [authPending])

  // Listen to new post
  useEffect(() => {
    if (user === null) {
      return
    }

    const unsubscribe = firestore
      .collection('posts')
      .where(
        'authorid',
        'in',
        followingList.length !== 0 ? followingList : ['a']
      )
      .orderBy('timeStamp', 'desc')
      .onSnapshot((docs) => {
        const filterDocs = docs.docs.filter((value) =>
          isInNotification(value.data().timeStamp)
        )
        if (!filterDocs.length) {
          setNewPost(true)
        }
        setNotificationList(
          filterDocs.map((value) => {
            const data = value.data()
            const postid = value.id

            const addNoti = {
              type: 'Create',
              topic: data.topic,
              displayname: data.displayname,
              postid,
              timeStamp: data.timeStamp,
            }

            return addNoti
          })
        )
      })
    return () => unsubscribe()
  }, [followingList, user])

  // Listen to new follower
  // useEffect(() => {
  //   if (user === null) {
  //     return
  //   }
  //   const unsubscribe = firestore
  //     .collection('follower')
  //     .doc(user.uid)
  //     .onSnapshot((doc) => {
  //       doc.data()
  //     })
  //   return () => unsubscribe()
  // }, [user])

  if (authPending) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100vh"
      >
        <Loading />
      </Box>
    )
  }

  return (
    <UserContext.Provider
      value={{
        user,
        likePostId,
        likeCommentId,
        isNewPost,
        setNewPost,
        notificationList,
        setLikePostId,
        setLikeCommentId,
        followingList,
        setFollowingList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
