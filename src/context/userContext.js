import { Box } from '@material-ui/core'
import Loading from 'components/common/Loading'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from 'utils/firebaseUtil'

export const UserContext = createContext(null)

export const UserProvider = (props) => {
  const [user, setUser] = useState(null)
  const [authPending, setAuthPending] = useState(true)
  const [notificationList] = useState([])

  useEffect(() => {
    return auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth !== null) {
        setUser({
          uid: userAuth.uid,
          displayName: userAuth.displayName,
        })
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
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
