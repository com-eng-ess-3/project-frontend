import { Box } from '@material-ui/core'
import { PostModify } from 'components'
import React from 'react'

function CreatePost() {
  return (
    <Box display="flex" justifyContent="center">
      <Box height="100%" width="100%">
        <PostModify mode="Create" />
      </Box>
    </Box>
  )
}

export default CreatePost
