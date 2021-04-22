import { Typography } from '@material-ui/core'
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
    return <Typography>Pending Auth</Typography>
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
