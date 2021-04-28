import { Box, Typography } from '@material-ui/core'
import React, { createContext, useEffect, useState } from 'react'
import { auth, firestore } from 'utils/firebaseUtil'

export const UserContext = createContext(null)

export const UserProvider = (props) => {
  const [user, setUser] = useState(null)
  const [authPending, setAuthPending] = useState(true)
  const [notificationList, setNotificationList] = useState([])

  useEffect(() => {
    return auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth)
      if (!!userAuth) {
      }
      setAuthPending(false)
    })
  }, [authPending])

  if (authPending) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <Typography variant="h1">Pending</Typography>
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
