import { Box } from '@material-ui/core'
import { NavBar, PostModify } from 'components'
import { AuthContext } from 'context/userContext'
import React, { useContext } from 'react'

function CreatePost() {
  const userState = useContext(AuthContext)

  return (
    <Box display="flex" justifyContent="center">
      <NavBar user={userState?.user} />
      <Box height="100%" width="100%">
        <PostModify mode="Create" />
      </Box>
    </Box>
  )
}

export default CreatePost
