import { Box } from '@material-ui/core'
import { NavBar, PostModify } from 'components'
import { AuthContext } from 'context/userContext'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router'

function EditPost() {
  const id = useParams().id
  const history = useHistory()
  const userState = useContext(AuthContext)

  if (!id) {
    history.push('/')
    return null
  }

  return (
    <Box display="flex" justifyContent="center">
      <NavBar user={userState?.user} />
      <Box height="100%" width="100%">
        <PostModify mode="Edit" />
      </Box>
    </Box>
  )
}

export default EditPost
