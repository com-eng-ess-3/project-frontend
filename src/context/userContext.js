import { Box } from '@material-ui/core'
import Loading from 'components/common/Loading'
import React, { createContext, useEffect, useState } from 'react'
import { auth, getImageUrl } from 'utils/firebaseUtil'
import { getLikePostAndCommentList } from 'utils/actionUtil'

export const UserContext = createContext(null)

export const UserProvider = (props) => {
  const [user, setUser] = useState(null)
  const [authPending, setAuthPending] = useState(true)
  const [notificationList] = useState([])
  const [likeCommentId, setLikeCommentId] = useState([])
  const [likePostId, setLikePostId] = useState([])
  const [followingList, setFollowingList] = useState([])

  useEffect(() => {
    return auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth !== null) {
        let url = '',
          likePostId = [],
          likeCommentId = []
        try {
          url = await getImageUrl(userAuth.uid)
          const data = (await getLikePostAndCommentList(userAuth.uid)).data()
          likePostId = data.post
          likeCommentId = data.comment
        } catch {}
        setUser({
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          profileUrl: url,
        })
        setLikePostId(likePostId)
        setLikeCommentId(likeCommentId)
      } else {
        setUser(null)
      }
      setAuthPending(false)
    })
  }, [authPending])

  // Listen to new post
  useEffect(() => null, [user])

  // Listen to new follower
  useEffect(() => null, [user])

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
        notificationList,
        likePostId,
        likeCommentId,
        setLikePostId,
        setLikeCommentId,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
