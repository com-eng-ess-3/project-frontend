import { Box } from '@material-ui/core'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from 'utils/firebaseUtil'

export const AuthContext = createContext(null)

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null)
  const [authPending, setAuthPending] = useState(true)

  useEffect(() => {
    return auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth)
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
      ></Box>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authPending,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
