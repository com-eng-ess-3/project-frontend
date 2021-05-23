import { Box } from '@material-ui/core'
import { PostModify } from 'components'
import React from 'react'
import { useHistory, useParams } from 'react-router'

function EditPost() {
  const id = useParams().id
  const history = useHistory()

  if (!id) {
    history.push('/')
    return null
  }

  return (
    <Box height="100%" display="flex" justifyContent="center">
      <Box height="100%" width="100%">
        <PostModify mode="Edit" id={id} />
      </Box>
    </Box>
  )
}

export default EditPost
