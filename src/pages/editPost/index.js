import { Box } from '@material-ui/core'
import { NavBar, PostModify } from 'components'
import { UserContext } from 'context/userContext'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router'

function EditPost() {
  const id = useParams().id
  const history = useHistory()
  const userState = useContext(UserContext)

  if (!id) {
    history.push('/')
    return null
  }

  return (
    <Box height="100%" display="flex" justifyContent="center">
      <NavBar user={userState?.user} />
      <Box height="100%" width="100%">
        <PostModify mode="Edit" id={id} />
      </Box>
    </Box>
  )
}

export default EditPost
