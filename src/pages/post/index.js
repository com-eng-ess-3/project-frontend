import { Box } from '@material-ui/core'
import { NavBar, PostViewer } from 'components'
import React from 'react'
import { useParams } from 'react-router'

function ViewPostPage() {
  const id = useParams().id

  return (
    <Box display="flex" justifyContent="center">
      <NavBar />
      <Box height="100%" width="100%">
        <PostViewer mode="Edit" id={id} />
      </Box>
    </Box>
  )
}

export default ViewPostPage
