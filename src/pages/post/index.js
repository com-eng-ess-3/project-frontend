import { Box } from '@material-ui/core'
import { NavBar, PostViewer } from 'components'
import { AuthContext } from 'context/userContext'
import React, { useContext } from 'react'
import { useParams } from 'react-router'

function ViewPostPage() {
  const id = useParams().id
  const userState = useContext(AuthContext)

  return (
    <Box display="flex" justifyContent="center">
      <NavBar user={userState?.user} />
      <Box height="100%" width="100%">
        <PostViewer mode="Edit" id={id} />
      </Box>
    </Box>
  )
}

export default ViewPostPage
